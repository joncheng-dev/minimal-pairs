import React from "react";

function Results(props) {
  const { results } = props;
  return (
    <>
      <p>Results</p>
      {Object.values(results).map((entry, index) => (
        <div key={index}>
          <ul>
            <li>Id: {Object.keys(results)[index]}</li>
            <ul>
              <li>{entry[0]}</li>
              <li>{entry[1]}</li>
            </ul>
          </ul>
        </div>
      ))}
    </>
  );
}

export default Results;

// Previous version of Results.js

// import React from "react";

// function Results(props) {
//   const { results } = props;
//   // console.log("results inside Results.js: ", results);
//   return (
//     <>
//       <p>Results</p>
//       {Object.values(results).map((entry, index) => (
//         <div key={entry.id}>
//           <ul>
//             <li>Id: {entry.id}</li>
//             <ul>
//               <li>{entry.pair[0]}</li>
//               <li>{entry.pair[1]}</li>
//             </ul>
//           </ul>
//         </div>
//       ))}
//     </>
//   );
// }

// export default Results;
