import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";

function Control() {
  const arrayOfValues = ["--", "1", "2", "3"];
  // useState controls state
  // const [formVisible, setFormVisible] = useState(false);
  const [valueFromForm, setValueFromForm] = useState(null);
  const [valueFromForm2, setValueFromForm2] = useState(null);
  const [pairResults, setPairResults] = useState(null);

  // Functions
  // const handleClick = () => {
  //   setFormVisible(!formVisible);
  // };

  useEffect(() => {
    console.log("pairResults updated: ", pairResults);
    console.log("pairResults is of type: ", typeof pairResults);
    console.log("Object.keys(pairResults): ", Object.keys(pairResults));
  }, [pairResults]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "consonant-pairs"),
      (collectionSnapshot) => {
        const results = [];
        collectionSnapshot.forEach((doc) => {
          results.push({
            id: doc.data().id,
            pairs: doc.data().pairs,
          });
        });
        setPairResults(results);
      },
      (error) => {
        // do something with error
        console.log("There was an error: ", error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  function collectValuesFromForm(firstValue, secondValue) {
    setValueFromForm(firstValue);
    setValueFromForm2(secondValue);
  }

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
      <Results results={pairResults} />
      {currentlyVisiblePage}
      <Form dropDown1Options={arrayOfValues} collectValuesFromForm={collectValuesFromForm} />
      <hr />
      <p>First Value Selected:</p>
      {valueFromForm ? <p>{valueFromForm}</p> : <p>No 1st value selected</p>}
      <hr />
      <p>Second Value Selected:</p>
      {valueFromForm2 ? <p>{valueFromForm2}</p> : <p>No 2nd value selected</p>}
      {/* <button onClick={handleClick}>{buttonText}</button> */}
    </>
  );
}

export default Control;
