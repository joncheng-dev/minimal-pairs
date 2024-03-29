import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
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
  // const [category, setCategory] = useState(null);
  // const [userQuery, setUserQuery] = useState(null);
  // const [numPairsInTree, setNumPairsInTree] = useState(null);
  const [treeDiagramName, setTreeDiagramName] = useState(null);
  const [resultsToUI, setResultsToUI] = useState(null);
  const [notEnoughPairsMessage, setNotEnoughPairsMessage] = useState(null);
  const initialRender = useRef(true);

  // Functions
  function getNumPairsInTree(numRowsToShow) {
    switch (numRowsToShow) {
      case "1":
        return 1;
      case "2":
        return 3;
      case "3":
        return 7;
      case "4":
        return 15;
      default:
        return 0;
    }
  }

  function numPairsToRows(numPairs) {
    switch (numPairs) {
      case 1:
        return 1;
      case 3:
        return 2;
      case 7:
        return 3;
      case 15:
        return 4;
      default:
        return 0;
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
    const convertedArray = arrayOfSelectedIds?.map(String);
    const filteredResults = Object.fromEntries(Object.entries(document).filter(([key]) => convertedArray.includes(String(key))));
    console.log("Control, filterDocResults, filteredResults: ", filteredResults);
    setResultsToUI(filteredResults);
  }

  async function gatherAndFilterResults(category, query, numPairs) {
    if (category && query) {
      const queryOne = query[0] + query[1];
      const queryTwo = query[1] + query[0];
      const possibleQueries = [queryOne, queryTwo];

      for (const currentQuery of possibleQueries) {
        const docRef = doc(db, category, currentQuery);
        const docSnap = await getDoc(docRef);

        console.log("Control, gatherAndFilterResults, docSnap._key.path.segments: ", docSnap._key.path.segments);
        if (docSnap.exists()) {
          let arrayOfSelectedIds;
          const dataKeys = Object.keys(docSnap.data());
          if (dataKeys.length === 1 && docSnap.data()[0][0] === "") {
            setNotEnoughPairsMessage("No pairs available for the selected query.");
            return;
          }
          if (numPairs >= dataKeys.length) {
            arrayOfSelectedIds = randomPairPicker(dataKeys.length, dataKeys.length);
            setNotEnoughPairsMessage(
              `You've selected ${numPairsToRows(numPairs)} rows (i.e. ${numPairs} pairs) to show, but there are only ${
                dataKeys.length
              } pairs available.`
            );
          } else {
            // Before setting results to UI, randomly select and filter them.
            arrayOfSelectedIds = randomPairPicker(dataKeys.length, numPairs);
          }
          console.log("Control, gatherAndFilterResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
          filterDocResults(docSnap.data(), arrayOfSelectedIds);
          return; // Stop searching after finding a match
        }
      }
      console.log("No such document!");
    }
  }

  function onFormSubmission(collectedValues) {
    console.log("Control, onFormSubmission, collectedValues.charCategory: ", collectedValues.charCategory);
    console.log("Control, onFormSubmission, collectedValues.selectedChars: ", collectedValues.selectedChars);
    console.log("Control, onFormSubmission, collectedValues.selectedChars[0]: ", collectedValues.selectedChars[0]);
    console.log("Control, onFormSubmission, collectedValues.selectedChars[1]: ", collectedValues.selectedChars[1]);

    // Take the data from the user -- category, query, number pairs
    // Trigger a database query
    // Random pair picker
    // Gather and Filter Results

    setTreeDiagramName(collectedValues.selectedChars[0] + " vs " + collectedValues.selectedChars[1]);

    gatherAndFilterResults(collectedValues.charCategory, collectedValues.selectedChars, getNumPairsInTree(collectedValues.numRowsToShow));
  }

  return (
    <>
      <h2>Tree Diagram</h2>
      {resultsToUI ? <TreeDiagramExpt results={resultsToUI} treeDiagramName={treeDiagramName} /> : ""}
      {notEnoughPairsMessage && <h3>{notEnoughPairsMessage}</h3>}
      {resultsToUI ? <Results results={resultsToUI} /> : ""}
      <hr />
      {/* prettier-ignore */}
      <Form
        onFormSubmission={onFormSubmission}
        // collectValuesFromForm={collectValuesFromForm}
      />
      <hr />
    </>
  );
}
