import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";
import TreeDiagram from "./TreeDiagram";
import TreeDiagramExpt from "./TreeDiagramExpt";
import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import LeftNav from "./LeftNav";

export default function Control() {
  const [notification, setNotificationOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "No results for this combination of phonemes.",
    color: "#ff0f0f",
  });
  // TODO refactor to allow any numbers of pairs up to 15 pairs maximum?
  // 1 row is 1 pair of words,
  // 2 rows is 3 pairs of words,
  // 3 rows is 7 pairs of words,
  // 4 rows is 15 pairs of words
  const [loading, setLoading] = useState(false);
  const [treeDiagramName, setTreeDiagramName] = useState(null);
  const [treeData, setTreeData] = useState(null);
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
    console.log("filterDocResults, document: ", document);
    console.log("filterDocResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
    // const filteredResults = Object.fromEntries(Object.entries(document).filter(([key]) => convertedArray.includes(String(key))));
    const filteredResults = arrayOfSelectedIds.map((index) => document.pairs[index]);
    console.log("Control, filterDocResults, filteredResults: ", filteredResults);
    setTreeData(filteredResults);
    setResultsToUI(filteredResults);
  }

  // useEffect(() => {
  //   const tempDbQuery = async () => {
  //     const docRef = doc(db, "vowels", "eu");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("eu: ", docSnap.data());
  //       const dataKeys = docSnap.data();
  //       // console.log(dataKeys.pairs.length); // This is the number of pairs in a document.
  //       // Let's try console logging the pair at this doc, at index 1.
  //       console.log("eu, pair at Index 1, dataKeys.pairs[1]: ", dataKeys.pairs[1]);
  //       console.log("eu, pair at Index 1, firstWord, dataKeys.pairs[1].firstWord: ", dataKeys.pairs[1].firstWord);
  //       console.log("eu, pair at Index 1, secondWord, dataKeys.pairs[1].secondWord: ", dataKeys.pairs[1].secondWord);
  //       gatherAndFilterResults("vowels", "eu", 3);
  //     }
  //   };
  //   tempDbQuery();
  // }, []);

  // useEffect(() => {
  //   const tempDbQuery = async () => {
  //     const docRef = doc(db, "vowel-diphthong-pairs-expt", "IU");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("IU: ", docSnap.data());
  //       const dataKeys = Object.keys(docSnap.data());
  //       console.log(dataKeys.length);
  //     }
  //   };
  //   tempDbQuery();
  // }, []);
  //

  async function gatherAndFilterResults(category, query, numPairs) {
    setLoading(true);
    if (category && query) {
      const queryOne = query[0] + query[1];
      const queryTwo = query[1] + query[0];
      const possibleQueries = [queryOne, queryTwo];

      for (const currentQuery of possibleQueries) {
        const docRef = doc(db, category, currentQuery);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let arrayOfSelectedIds;
          const dataKeys = docSnap.data();
          if (dataKeys.pairs.length === 0) {
            setNotEnoughPairsMessage(`You've selected ${query[0]} and ${query[1]}, but there are no results to display.`);
            setLoading(false);
            return;
          }
          if (numPairs >= dataKeys.pairs.length) {
            arrayOfSelectedIds = randomPairPicker(dataKeys.pairs.length, dataKeys.pairs.length);
            setNotEnoughPairsMessage(
              `You've selected ${numPairsToRows(numPairs)} rows (i.e. ${numPairs} pairs) to show, but there are only ${
                dataKeys.pairs.length
              } pairs available.`
            );
          } else {
            setNotEnoughPairsMessage(null);
            // Before setting results to UI, randomly select and filter them.
            arrayOfSelectedIds = randomPairPicker(dataKeys.pairs.length, numPairs);
          }
          // console.log("Control, gatherAndFilterResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
          filterDocResults(docSnap.data(), arrayOfSelectedIds);
          setLoading(false);
          return; // Stop searching after finding a match
        }
      }
      console.log("No such document!");
      setNotificationOpen({ ...notification, open: true, message: "No results for this combination of phonemes.", color: "#ff0f0f" });
      setLoading(false);
    }
  }

  const clearTreeDrawing = () => {
    setTreeData(null); // Reset tree data to null
  };

  function onFormSubmission(collectedValues) {
    clearTreeDrawing();

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

  const handleCloseSnackbar = () => {
    setNotificationOpen({ ...notification, open: false });
  };

  return (
    <div style={{display: "flex"}}>
      {notification.open && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContent message={notification.message} sx={{ bgcolor: notification.color }} />
        </Snackbar>
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 5 }}>
        <LeftNav onFormSubmission={onFormSubmission} />
        {/* <h2 style={{ marginLeft: "10px" }}>Minimal Pairs</h2> */}
      </div>
      {loading ? (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <LinearProgress />
        </div>
      ) : // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      //   <CircularProgress style={{ marginTop: "-15vh" }} />
      // </div>
      treeData ? (
        <TreeDiagramExpt treeData={treeData} treeDiagramName={treeDiagramName} />
      ) : null}
      {notEnoughPairsMessage && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>{notEnoughPairsMessage}</h3>
        </div>
      )}
      {/* {resultsToUI ? <Results results={resultsToUI} /> : ""} */}
      {/* <Form onFormSubmission={onFormSubmission} /> */}
    </div>
  );
}
