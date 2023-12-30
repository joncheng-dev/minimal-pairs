import React from "react";

function Results(props) {
  const { results } = props;
  console.log("Object.keys(results): ", Object.keys(results));
  return (
    <>
      <p>id: {results.id}</p>
      <ul>
        {results.pairs.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </>
  );
}

export default Results;
