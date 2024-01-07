import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";

function Control() {
  const arrayOfValues = ["--", "B", "L", "R", "V"];
  const arrayOfNumPairChoices = ["--", "1", "2", "3", "4", "5"];
  // useState controls state
  // const [formVisible, setFormVisible] = useState(false);
  const [userQuery, setUserQuery] = useState(null);
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
  }

  async function queryFirebaseDocs() {
    if (userQuery !== null) {
      console.log("queryFirebaseDocs triggered, userQuery: ", userQuery);
      const docRef = doc(db, "consonant-pairs", userQuery);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data: ", docSnap.data());
        setResultsToUI(docSnap.data());
      } else {
        console.log("No such document!");
        const reversedQuery = userQuery.split("").reduce((accumulator, char) => char + accumulator, "");
        const docRef = doc(db, "consonant-pairs", reversedQuery);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data: ", docSnap.data());
          setResultsToUI(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    }
  }

  useEffect(() => {
    queryFirebaseDocs();
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
