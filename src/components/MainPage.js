import React from "react";

function MainPage(props) {
  return (
    <>
      <h2>Main Page</h2>
      <p>{props.formValue}</p>
    </>
  );
}

export default MainPage;
