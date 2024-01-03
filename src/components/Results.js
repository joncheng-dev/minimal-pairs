import React from "react";

function Results(props) {
  const { results } = props;
  return (
    <>
      <p>Results</p>
      <ul>
        {results.map((entry, index) => (
          <li key={index}>
            <p>Id: {entry[index].id}</p>
            <p>Pair: </p>
            <p>{entry[index].pair.join(", ")}</p>
            {/* <p>{entry[index].pair[0]}</p>
            <p>{entry[index].pair[1]}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Results;
