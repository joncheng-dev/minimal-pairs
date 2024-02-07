import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";
import TreeDiagram from "./TreeDiagram";
import TreeDiagramExpt from "./TreeDiagramExpt";

export default function Control() {
  // TODO expand upon this array of characters to choose from.
  // 2. Expand upon list of values
  // const vowelCharList = ["A", "E", "I", "U", "\u026A"];
  // const arrayOfRowsToDisplay = ["1", "2", "3", "4"];
  // TODO refactor to allow any numbers of pairs up to 15 pairs maximum?
  // 1 row is 1 pair of words,
  // 2 rows is 3 pairs of words,
  // 3 rows is 7 pairs of words,
  // 4 rows is 15 pairs of words
  const [category, setCategory] = useState(null);
  const [userQuery, setUserQuery] = useState(null);
  const [treeDiagramName, setTreeDiagramName] = useState(null);
  const [numPairsInTree, setNumPairsInTree] = useState(null);
  const [resultsToUI, setResultsToUI] = useState(null);

  // Functions
  function concatenateUserInput(stringsArray) {
    const searchString = stringsArray.join("");
    console.log("Control, concatenateUserInput, searchString: ", searchString);
    setUserQuery(searchString);
  }

  function determineTreeDiagramName(values) {
    setTreeDiagramName(values[0] + " vs " + values[1]);
  }

  // Populate variable userQuery with user form results
  function collectValuesFromForm(queryCategory, values, numberOfRows) {
    setCategory(queryCategory);
    concatenateUserInput(values);
    determineTreeDiagramName(values);
    if (numberOfRows === "1") {
      setNumPairsInTree(1);
    } else if (numberOfRows === "2") {
      setNumPairsInTree(3);
    } else if (numberOfRows === "3") {
      setNumPairsInTree(7);
    } else if (numberOfRows === "4") {
      setNumPairsInTree(15);
    }
  }

  async function gatherAndFilterResults() {
    if (userQuery !== null) {
      // Add option of consonants or vowels
      console.log("Control, gatherAndFilterResults, category: ", category);
      console.log("Control, gatherAndFilterResults, userQuery: ", userQuery);
      const docRef = doc(db, category, userQuery);
      const docSnap = await getDoc(docRef);

      console.log("Control, gatherAndFilterResults, docSnap: ", docSnap);
      if (docSnap.exists()) {
        // Before setting results to UI, randomly select and filter them.
        const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsInTree);
        console.log("Control, gatherAndFilterResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
        filterDocResults(docSnap.data(), arrayOfSelectedIds);
      } else {
        const reversedQuery = userQuery.split("").reduce((accumulator, char) => char + accumulator, "");
        const docRef = doc(db, category, reversedQuery);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsInTree);
          filterDocResults(docSnap.data(), arrayOfSelectedIds);
        } else {
          console.log("No such document!");
        }
      }
    }
  }

  function randomPairPicker(numPairsAvailable, numPairsToSelect) {
    let randomlySelectedIds = new Set(),
      ans;
    while (randomlySelectedIds.size < numPairsToSelect) {
      randomlySelectedIds.add(Math.floor(Math.random() * numPairsAvailable));
    }
    ans = [...randomlySelectedIds];
    return ans;
  }

  // Use this to filter the document using randomized values
  function filterDocResults(document, arrayOfSelectedIds) {
    const convertedArray = arrayOfSelectedIds.map(String);
    const filteredResults = Object.fromEntries(Object.entries(document).filter(([key]) => convertedArray.includes(String(key))));
    console.log("Control, filterDocResults, filteredResults: ", filteredResults);
    setResultsToUI(filteredResults);
  }

  useEffect(() => {
    gatherAndFilterResults();
  }, [userQuery, numPairsInTree]);

  return (
    <>
      <h2>Tree Diagram</h2>
      {resultsToUI ? <TreeDiagramExpt userQuery={userQuery} results={resultsToUI} treeDiagramName={treeDiagramName} /> : ""}
      {resultsToUI ? <Results results={resultsToUI} /> : ""}
      <hr />
      {/* prettier-ignore */}
      <Form
        collectValuesFromForm={collectValuesFromForm}
        gatherAndFilterResults={gatherAndFilterResults}
      />
      <hr />
    </>
  );
}

// <Form
//   dropDown1Options={queryCategory === "consonant-pairs-expt" ? consonantCharList : vowelCharList}
//   numPairsOptions={arrayOfRowsToDisplay}
//   collectValuesFromForm={collectValuesFromForm}
//   gatherAndFilterResults={gatherAndFilterResults}
// />;
