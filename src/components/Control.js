import React, { useState, useEffect } from "react";
import DropDownForm from "./DropDownForm";
import MainPage from "./MainPage";

function Control() {
  // useState controls state
  const [formVisible, setFormVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);

  useEffect(() => {
    console.log("handleSaveFormValue, formValue in Control: ", formValue);
  }, []);

  // Functions
  const handleClick = () => {
    setFormVisible(!formVisible);
  };

  const handleSaveFormValue = (selectedValue) => {
    console.log("handleSaveFormValue", formValue);
    setFormValue(selectedValue);
  };

  let currentlyVisiblePage = null;
  let buttonText = null;

  // Conditionals to decide which components to render
  if (formVisible === true) {
    currentlyVisiblePage = <DropDownForm handleSaveFormValue={handleSaveFormValue} />;
    buttonText = "Back to Main Page";
  } else {
    currentlyVisiblePage = <MainPage formValue={formValue} />;
    buttonText = "Go to Forms";
  }

  // Rendering
  return (
    <>
      {currentlyVisiblePage}
      <button onClick={handleClick}>{buttonText}</button>
    </>
  );
}

export default Control;
