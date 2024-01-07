import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";

function Control() {
  const arrayOfValues = ["B", "L", "R", "V"];
  const arrayOfNumPairChoices = ["1", "2", "3", "4", "5"];
  // useState controls state
  // const [formVisible, setFormVisible] = useState(false);
  const [userQuery, setUserQuery] = useState(null);
  const [numPairsSelected, setNumPairsSelected] = useState(null);
  const [resultsToUI, setResultsToUI] = useState(null);

  // Functions
  function concatenateUserInput(valueFromForm, valueFromForm2) {
    const query = valueFromForm.concat(valueFromForm2);
    console.log("concatenateUserInput: ", query);
    setUserQuery(query);
  }

  // Populate variable userQuery with user form results
  function collectValuesFromForm(firstValue, secondValue, numberOfPairs) {
    concatenateUserInput(firstValue, secondValue);
    setNumPairsSelected(numberOfPairs);
  }

  // WIP: Allow user to choose "consonant-pairs" or "vowels-diphthongs"

  async function gatherAndFilterResults() {
    if (userQuery !== null) {
      console.log("queryFirebaseDocs triggered, userQuery: ", userQuery);
      const docRef = doc(db, "consonant-pairs", userQuery);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Before setting results to UI, randomly select and filter them.
        const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
        console.log("arrayOfSelectedIds: ", arrayOfSelectedIds);
        console.log("gatherAndFilterResults, docSnap.data(): ", docSnap.data());
        filterDocResults(docSnap.data(), arrayOfSelectedIds);
      } else {
        console.log("No such document. Reversing query!");
        const reversedQuery = userQuery.split("").reduce((accumulator, char) => char + accumulator, "");
        const docRef = doc(db, "consonant-pairs", reversedQuery);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const arrayOfSelectedIds = randomPairPicker(Object.keys(docSnap.data()).length, numPairsSelected);
          console.log("arrayOfSelectedIds: ", arrayOfSelectedIds);
          console.log("gatherAndFilterResults, docSnap.data(): ", docSnap.data());
          filterDocResults(docSnap.data(), arrayOfSelectedIds);
        } else {
          console.log("No such document!");
        }
      }
    }
  }

  // number of pairs in that document. Let's say there are 100. -- Number of Fields in a Document
  // Randomly select X number of Ids, where X is "numberOfPairs" chosen by user.
  // send to the Results page these pairs.

  // WIP: Randomly choose pairs
  // Consider the queried document, i.e.LR, take the number of pairs
  // Object.keys(docSnap.data()).length);
  // Randomly select a quantity of pairs, chosen by user -- "numberOfPairs"
  // Send these pairs to the results

  function randomPairPicker(numPairsAvailable, numPairsToSelect) {
    // Pass in numbers of pairs wanted (numPairsToSelect).
    // Pass in numbers of pairs available in that document (numPairsAvailable)
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
    console.log("filterDocResults, document: ", document);
    const convertedArray = arrayOfSelectedIds.map(String);
    console.log("filterDocResults, convertedArray: ", convertedArray);
    const docResultsToArray = Object.entries(document);
    console.log("filterDocResults, docResultsToArray: ", docResultsToArray);
    const filteredResults = docResultsToArray.filter((entry) => convertedArray.includes(entry["0"]));
    console.log("filterDocResults, filteredResults: ", filteredResults);
    const convertedBackToObj = Object.fromEntries(filteredResults);
    console.log("filterDocResults, convertedBackToObj: ", convertedBackToObj);
    setResultsToUI(convertedBackToObj);
  }

  useEffect(() => {
    gatherAndFilterResults();
  }, [userQuery]);

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
      {resultsToUI ? <Results results={resultsToUI} /> : ""}
      <hr />
      {currentlyVisiblePage}
      <Form dropDown1Options={arrayOfValues} numPairsOptions={arrayOfNumPairChoices} collectValuesFromForm={collectValuesFromForm} />
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
