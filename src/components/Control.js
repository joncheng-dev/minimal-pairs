import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";
import TreeDiagram from "./TreeDiagram";

function Control() {
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

  // WIP:
  // Allow user to choose "consonant-pairs" or "vowels-diphthongs"
  // Display up to 15 results.
  // Change UI form to show

  async function gatherAndFilterResults() {
    if (userQuery !== null) {
      console.log("queryFirebaseDocs triggered, userQuery: ", userQuery);
      const docRef = doc(db, "consonant-pairs", userQuery);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Before setting results to UI, randomly select and filter them.
        const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
        // console.log("arrayOfSelectedIds: ", arrayOfSelectedIds);
        // console.log("gatherAndFilterResults, docSnap.data(): ", docSnap.data());
        filterDocResults(docSnap.data(), arrayOfSelectedIds);
      } else {
        console.log("No such document. Reversing query!");
        const reversedQuery = userQuery.split("").reduce((accumulator, char) => char + accumulator, "");
        const docRef = doc(db, "consonant-pairs", reversedQuery);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
          // console.log("arrayOfSelectedIds: ", arrayOfSelectedIds);
          // console.log("gatherAndFilterResults, docSnap.data(): ", docSnap.data());
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
    console.log("randomPairsPicker: ", ans);
    // Save these into an array. Display to console.
    return ans;
  }

  // Now that we have an array of random Ids..
  // Use this to filter the document
  function filterDocResults(document, arrayOfSelectedIds) {
    const convertedArray = arrayOfSelectedIds.map(String);
    const docResultsToArray = Object.entries(document);
    console.log("docResultsToArray: ", docResultsToArray);
    const filteredResults = docResultsToArray.filter((entry) => convertedArray.includes(entry[0]));
    const convertedBackToObj = Object.fromEntries(filteredResults);
    setResultsToUI(convertedBackToObj);
  }

  useEffect(() => {
    gatherAndFilterResults();
    console.log("collectValuesFromForm, numPairsSelected", numPairsSelected);
  }, [userQuery, numPairsSelected]);
  // NOTE: Form submit only triggers gatherAndFilterResults() when userQuery or numPairsSelected have been altered.
  // Currently does not re-randomize results if submit clicked for a second consecutive time.

  let currentlyVisiblePage = null;
  let buttonText = null;

  // Conditionals to decide which components to render
  // if (formVisible === true) {
  //   currentlyVisiblePage = <Form dropDown1Options={arrayOfValues} collectValuesFromForm={collectValuesFromForm} />;
  //   buttonText = "Back to Main Page";
  // }
  // else {
  //   currentlyVisiblePage = <MainPage formValue={formValue} />;
  //   buttonText = "Go to Forms";
  // }

  // Rendering
  return (
    <>
      <h2>Tree Diagram</h2>
      {resultsToUI ? <TreeDiagram results={resultsToUI} treeDiagramName={treeDiagramName} /> : ""}
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
      {/* <p>First Value Selected:</p>
      {valueFromForm ? <p>{valueFromForm}</p> : <p>No 1st value selected</p>}
      <hr />
      <p>Second Value Selected:</p>
      {valueFromForm2 ? <p>{valueFromForm2}</p> : <p>No 2nd value selected</p>} */}
      {/* <button onClick={handleClick}>{buttonText}</button> */}
    </>
  );
}

export default Control;

// const handleClick = () => {
//   setFormVisible(!formVisible);
// };

// useEffect(() => {
//   const unSubscribe = onSnapshot(
//     collection(db, "consonant-pairs"),
//     (collectionSnapshot) => {
//       const results = [];
//       collectionSnapshot.forEach((doc) => {
//         results.push(
//           doc.data()
//           // id: entry.data().id,
//           // pairs: entry.data().pairs,
//         );
//       });
//       console.log("results: ", results);
//       setPairResults(results);
//     },
//     (error) => {
//       // do something with error
//       console.log("There was an error: ", error.message);
//     }
//   );

//   return () => unSubscribe();
// }, []);

// useEffect(() => {
//   const results = [];
//   const unSubscribe = onSnapshot(doc(db, "consonant-pairs", userQuery), (doc) => {
//     results.push(doc.data());
//   });
//   console.log("results: ", results);
//   setPairResults(results);
//   return () => unSubscribe();
// }, []);

// const documentExample = {
//   0: {
//     pair: ["biking", "Viking"],
//     id: "0",
//   },
//   1: {
//     pair: ["knobble", "novel"],
//     id: "1",
//   },
//   2: {
//     id: "2",
//     pair: ["bat", "vat"],
//   },
//   3: {
//     pair: ["back", "vac"],
//     id: "3",
//   },
//   4: {
//     pair: ["ballet", "valet"],
//     id: "4",
//   },
// };

// console.log("documentExample[0]: ", documentExample[0]);
// console.log("documentExample[0].id: ", documentExample[0].id);
// console.log("documentExample[0].pair: ", documentExample[0].pair);
// console.log("documentExample[0].pair[0]: ", documentExample[0].pair[0]);
// console.log("documentExample[0].pair[1]: ", documentExample[0].pair[1]);
