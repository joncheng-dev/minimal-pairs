import React from "react";

function Results(props) {
  const { results } = props;
  console.log("results inside Results.js: ", results);
  return (
    <>
      <p>Results</p>
      <ul>
        {Object.values(results).map((entry, index) => (
          <div key={entry.id}>
            <li>Id: {entry.id}</li>
            <li>{entry.pair[0]}</li>
            <li>{entry.pair[1]}</li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Results;

// {results.map((entry, index) => (
//   <div key={index}>
//     {Object.keys(entry).map((key) => (
//       <li key={key}>
//         <p>ID: {entry[key].id}</p>
//         <p>Pair: {entry[key].pair.join(", ")}</p>
//       </li>
//     ))}
//   </div>
// ))}
