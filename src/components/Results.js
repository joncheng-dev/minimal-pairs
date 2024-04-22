import React from "react";

export default function Results(props) {
  const { results } = props;
  console.log("Results, results: ", results);
  return (
    <>
      <p>Results</p>
      <ul>
        {results.map((entry, index) => (
          <div key={index}>
            Index: {index}
            <ul>
              <li>{entry.firstWord}</li>
              {console.log("entry.firstWord: ", entry.firstWord)}
              <li>{entry.secondWord}</li>
              {console.log("entry.secondWord: ", entry.secondWord)}
            </ul>
          </div>
        ))}
      </ul>
    </>
  );
}
