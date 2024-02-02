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
  // WIP:
  // Allow user to choose "consonant-pairs" or "vowels-diphthongs"
  // Display up to 15 results.
  // Change UI form to show

  // TODO expand upon this array of characters to choose from.
  // First, need to add some values to database
  const arrayOfValues = ["B", "L", "R", "V"];
  // 1 row is 1 pair, 2 rows is 3 pairs, 3 rows is 7 pairs, 4 rows is 15 pairs
  const arrayOfRowsToDisplay = ["1", "2", "3", "4"];
  // useState controls state
  // const [formVisible, setFormVisible] = useState(false);
  const [userQuery, setUserQuery] = useState(null);
  const [numPairsSelected, setNumPairsSelected] = useState(null);
  const [treeDiagramName, setTreeDiagramName] = useState(null);
  const [resultsToUI, setResultsToUI] = useState(null);

  // Functions
  function concatenateUserInput(valueFromForm, valueFromForm2) {
    const query = valueFromForm.concat(valueFromForm2);
    setUserQuery(query);
  }

  function determineTreeDiagramName(valueFromForm, valueFromForm2) {
    setTreeDiagramName(valueFromForm + " vs " + valueFromForm2);
  }

  // Populate variable userQuery with user form results
  function collectValuesFromForm(firstValue, secondValue, numberOfRows) {
    concatenateUserInput(firstValue, secondValue);
    determineTreeDiagramName(firstValue, secondValue);
    if (numberOfRows === "1") {
      setNumPairsSelected(1);
    } else if (numberOfRows === "2") {
      setNumPairsSelected(3);
    } else if (numberOfRows === "3") {
      setNumPairsSelected(7);
    } else if (numberOfRows === "4") {
      setNumPairsSelected(15);
    }
  }

  async function gatherAndFilterResults() {
    if (userQuery !== null) {
      const docRef = doc(db, "consonant-pairs-expt", userQuery);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Before setting results to UI, randomly select and filter them.
        const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
        filterDocResults(docSnap.data(), arrayOfSelectedIds);
      } else {
        const reversedQuery = userQuery.split("").reduce((accumulator, char) => char + accumulator, "");
        const docRef = doc(db, "consonant-pairs-expt", reversedQuery);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
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

  // Now that we have an array of random Ids..
  // Use this to filter the document
  function filterDocResults(document, arrayOfSelectedIds) {
    const convertedArray = arrayOfSelectedIds.map(String);
    const filteredResults = Object.fromEntries(Object.entries(document).filter(([key]) => convertedArray.includes(String(key))));
    setResultsToUI(filteredResults);
  }

  useEffect(() => {
    gatherAndFilterResults();
  }, [userQuery, numPairsSelected]);

  let currentlyVisiblePage = null;

  return (
    <>
      <h2>Tree Diagram</h2>
      {resultsToUI ? <TreeDiagramExpt userQuery={userQuery} results={resultsToUI} treeDiagramName={treeDiagramName} /> : ""}
      {resultsToUI ? <Results results={resultsToUI} /> : ""}
      <hr />
      {currentlyVisiblePage}
      {/* prettier-ignore */}
      <Form
        dropDown1Options={arrayOfValues}
        numPairsOptions={arrayOfRowsToDisplay}
        collectValuesFromForm={collectValuesFromForm}
        gatherAndFilterResults={gatherAndFilterResults}
      />
      <hr />
    </>
  );
}
