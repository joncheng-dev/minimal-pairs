import React from "react";

function Results(props) {
  const { results } = props;
  console.log("results inside Results.js: ", results);
  return (
    <>
      <p>Results</p>
      <ul>
        {results.map((entry, index) => (
          <li key={index}>
            {Object.keys(entry).map((key) => (
              <div key={key}>
                <p>ID: {entry[key].id}</p>
                <p>Pair: {entry[key].pair.join(", ")}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Results;
