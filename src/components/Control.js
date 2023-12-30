import React, { useState, useEffect } from "react";
import DropDownForm from "./Form";
import MainPage from "./MainPage";
import Form from "./Form";

function Control() {
  const arrayOfValues = ["--", "1", "2", "3"];
  // useState controls state
  // const [formVisible, setFormVisible] = useState(false);
  const [valueFromForm, setValueFromForm] = useState(null);
  const [valueFromForm2, setValueFromForm2] = useState(null);

  // Functions
  // const handleClick = () => {
  //   setFormVisible(!formVisible);
  // };

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
