import React from "react";
import Tree from "react-d3-tree";
import "../styles/tree-diagram.css";
import { useCenteredTree } from "./TreeHelper";

const containerStyles = {
  width: "80vw",
  height: "50vh",
};

function TreeDiagram(props) {
  const { results, treeDiagramName } = props;
  const resultsToArray = Object.entries(results);
  console.log("TreeDiagram, resultsToArray: ", resultsToArray);
  const data = drawTree(resultsToArray);

  //#region Data Allocation
  function drawTree(dataToUse) {
    if (dataToUse.length === 1) {
      return {
        name: treeDiagramName,
        children: [{ name: dataToUse[0][1].pair[0] }, { name: dataToUse[0][1].pair[1] }],
      };
    } else if (dataToUse.length === 3) {
      return {
        name: treeDiagramName,
        children: [
          {
            name: dataToUse[0][1].pair[0],
            children: [{ name: dataToUse[1][1].pair[0] }, { name: dataToUse[1][1].pair[1] }],
          },
          {
            name: dataToUse[0][1].pair[1],
            children: [{ name: dataToUse[2][1].pair[0] }, { name: dataToUse[2][1].pair[1] }],
          },
        ],
      };
    } else if (dataToUse.length === 7) {
      return {
        name: treeDiagramName,
        children: [
          {
            name: dataToUse[0][1].pair[0],
            children: [
              {
                name: dataToUse[1][1].pair[0],
                children: [{ name: dataToUse[3][1].pair[0] }, { name: dataToUse[3][1].pair[1] }],
              },
              {
                name: dataToUse[1][1].pair[1],
                children: [{ name: dataToUse[4][1].pair[0] }, { name: dataToUse[4][1].pair[1] }],
              },
            ],
          },
          {
            name: dataToUse[0][1].pair[1],
            children: [
              {
                name: dataToUse[2][1].pair[0],
                children: [{ name: dataToUse[5][1].pair[0] }, { name: dataToUse[5][1].pair[1] }],
              },
              {
                name: dataToUse[2][1].pair[1],
                children: [{ name: dataToUse[6][1].pair[0] }, { name: dataToUse[6][1].pair[1] }],
              },
            ],
          },
        ],
      };
    } else if (dataToUse.length === 15) {
      return {
        name: treeDiagramName,
        children: [
          {
            name: dataToUse[0][1].pair[0],
            children: [
              {
                name: dataToUse[1][1].pair[0],
                children: [
                  {
                    name: dataToUse[3][1].pair[0],
                    children: [
                      {
                        name: dataToUse[7][1].pair[0],
                      },
                      { name: dataToUse[7][1].pair[1] },
                    ],
                  },
                  {
                    name: dataToUse[3][1].pair[1],
                    children: [
                      {
                        name: dataToUse[8][1].pair[0],
                      },
                      { name: dataToUse[8][1].pair[1] },
                    ],
                  },
                ],
              },
              {
                name: dataToUse[1][1].pair[1],
                children: [
                  {
                    name: dataToUse[4][1].pair[0],
                    children: [
                      {
                        name: dataToUse[9][1].pair[0],
                      },
                      { name: dataToUse[9][1].pair[1] },
                    ],
                  },
                  {
                    name: dataToUse[4][1].pair[1],
                    children: [
                      {
                        name: dataToUse[10][1].pair[0],
                      },
                      { name: dataToUse[10][1].pair[1] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: dataToUse[0][1].pair[1],
            children: [
              {
                name: dataToUse[2][1].pair[0],
                children: [
                  {
                    name: dataToUse[5][1].pair[0],
                    children: [
                      {
                        name: dataToUse[11][1].pair[0],
                      },
                      { name: dataToUse[11][1].pair[1] },
                    ],
                  },
                  {
                    name: dataToUse[5][1].pair[1],
                    children: [
                      {
                        name: dataToUse[12][1].pair[0],
                      },
                      { name: dataToUse[12][1].pair[1] },
                    ],
                  },
                ],
              },
              {
                name: dataToUse[2][1].pair[1],
                children: [
                  {
                    name: dataToUse[6][1].pair[0],
                    children: [
                      {
                        name: dataToUse[13][1].pair[0],
                      },
                      { name: dataToUse[13][1].pair[1] },
                    ],
                  },
                  {
                    name: dataToUse[6][1].pair[1],
                    children: [
                      {
                        name: dataToUse[14][1].pair[0],
                      },
                      { name: dataToUse[14][1].pair[1] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
    }
  }
  //#endregion Data Allocation

  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <rect width="20" height="20" x="-10" />
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
    </g>
  );

  // var svg = d3
  //   .select("div#container")
  //   .append("svg")
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .attr("viewBox", "0 0 300 300")
  //   .classed("svg-content", true);
  const [dimensions, translate, containerRef] = useCenteredTree();
  // let data = null;
  // if (resultsToArray.length === 1) {
  //   data = onePairToShow;
  // } else if (resultsToArray.length === 3) {
  //   data = threePairsToShow;
  // }
  // else if (resultsToArray.length === 7) {
  //   data = sevenPairsToShow;
  // }
  return (
    <>
      <div style={containerStyles} ref={containerRef} className="svg-container">
        <Tree
          data={data}
          dimensions={dimensions}
          translate={translate}
          orientation="vertical"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          renderCustomNodeElement={renderRectSvgNode}
          svgClassName="tree"
        />
      </div>
    </>
  );
}

export default TreeDiagram;

// <div id="container" className="svg-container">
//   <svg className="svg-content" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
//     {svg}
//   </svg>
// </div>;

// import React, { useRef, useEffect } from "react";
// import "../styles/tree-diagram.css";
// import * as d3 from "d3";

// const MyTreeComponent = () => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const data = {
//       name: "L vs R",
//       children: [
//         { name: "Node 1", children: [{ name: "Leaf 1" }, { name: "Leaf 2" }] },
//         { name: "Node 2", children: [{ name: "Leaf 3" }, { name: "Leaf 4" }] },
//       ],
//     };

//     const width = 500;
//     const height = 500;

//     const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
//     const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

//     const root = d3.hierarchy(data);

//     const treeLayout = d3.tree().nodeSize([width / 2, height / 2]);

//     const link = g
//       .selectAll(".link")
//       .data(treeLayout(root).links())
//       .enter()
//       .append("path")
//       .attr("class", "link")
//       .attr(
//         "d",
//         d3
//           .linkHorizontal()
//           .x((d) => d.y)
//           .y((d) => d.x)
//       );

//     const node = g
//       .selectAll(".node")
//       .data(root.descendants())
//       .enter()
//       .append("g")
//       .attr("class", (d) => "node" + (d.children ? " node--internal" : " node--leaf"))
//       .attr("transform", (d) => `translate(${d.y},${d.x})`);

//     node.append("circle").attr("r", 2.5);
//   }, []);

//   return <svg ref={svgRef} />;
// };

// export default MyTreeComponent;

// const sampleData = [
//   [
//     "0",
//     {
//       pair: ["biking", "Viking"],
//       id: "0",
//     },
//   ],
//   [
//     "2",
//     {
//       id: "2",
//       pair: ["bat", "vat"],
//     },
//   ],
//   [
//     "4",
//     {
//       pair: ["ballet", "valet"],
//       id: "4",
//     },
//   ],
// ];

// const testData2 = {
//   name: "L vs R",
//   children: [
//     {
//       name: "Node 1",
//       children: [
//         {
//           name: "Leaf 1",
//           children: [{ name: "N1L1 Child1" }, { name: "N1L1 Child2" }],
//         },
//         {
//           name: "Leaf 2",
//           children: [{ name: "N1L2 Child1" }, { name: "N1L2 Child2" }],
//         },
//       ],
//     },
//     {
//       name: "Node 2",
//       children: [
//         {
//           name: "Leaf 3",
//           children: [{ name: "N2L3 Child1" }, { name: "N2L3 Child2" }],
//         },
//         {
//           name: "Leaf 4",
//           children: [{ name: "N2L4 Child1" }, { name: "N2L4 Child2" }],
//         },
//       ],
//     },
//   ],
// };

// const sevenPairsToShow = {
//   name: "L vs R",
//   children: [
//     {
//       name: dataToDisplay[0][1].pair[0],
//       children: [
//         {
//           name: dataToDisplay[1][1].pair[0],
//           children: [{ name: dataToDisplay[3][1].pair[0] }, { name: dataToDisplay[3][1].pair[1] }],
//         },
//         {
//           name: dataToDisplay[1][1].pair[1],
//           children: [{ name: dataToDisplay[4][1].pair[0] }, { name: dataToDisplay[4][1].pair[1] }],
//         },
//       ],
//     },
//     {
//       name: dataToDisplay[0][1].pair[1],
//       children: [
//         {
//           name: dataToDisplay[2][1].pair[0],
//           children: [{ name: dataToDisplay[5][1].pair[0] }, { name: dataToDisplay[5][1].pair[1] }],
//         },
//         {
//           name: dataToDisplay[2][1].pair[1],
//           children: [{ name: dataToDisplay[6][1].pair[0] }, { name: dataToDisplay[6][1].pair[1] }],
//         },
//       ],
//     },
//   ],
// };

// const fifteenPairs = {
//   name: treeDiagramName,
//   children: [
//     {
//       name: dataToUse[0][1].pair[0],
//       children: [
//         {
//           name: dataToUse[1][1].pair[0],
//           children: [
//             {
//               name: dataToUse[3][1].pair[0],
//               children: [
//                 {
//                   name: dataToUse[7][1].pair[0],
//                 },
//                 { name: dataToUse[7][1].pair[1] },
//               ],
//             },
//             {
//               name: dataToUse[3][1].pair[1],
//               children: [
//                 {
//                   name: dataToUse[8][1].pair[0],
//                 },
//                 { name: dataToUse[8][1].pair[1] },
//               ],
//             },
//           ],
//         },
//         {
//           name: dataToUse[1][1].pair[1],
//           children: [
//             {
//               name: dataToUse[4][1].pair[0],
//               children: [
//                 {
//                   name: dataToUse[9][1].pair[0],
//                 },
//                 { name: dataToUse[9][1].pair[1] },
//               ],
//             },
//             {
//               name: dataToUse[4][1].pair[1],
//               children: [
//                 {
//                   name: dataToUse[10][1].pair[0],
//                 },
//                 { name: dataToUse[10][1].pair[1] },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: dataToUse[0][1].pair[1],
//       children: [
//         {
//           name: dataToUse[2][1].pair[0],
//           children: [
//             {
//               name: dataToUse[5][1].pair[0],
//               children: [
//                 {
//                   name: dataToUse[11][1].pair[0],
//                 },
//                 { name: dataToUse[11][1].pair[1] },
//               ],
//             },
//             {
//               name: dataToUse[5][1].pair[1],
//               children: [
//                 {
//                   name: dataToUse[12][1].pair[0],
//                 },
//                 { name: dataToUse[12][1].pair[1] },
//               ],
//             },
//           ],
//         },
//         {
//           name: dataToUse[2][1].pair[1],
//           children: [
//             {
//               name: dataToUse[6][1].pair[0],
//               children: [
//                 {
//                   name: dataToUse[13][1].pair[0],
//                 },
//                 { name: dataToUse[13][1].pair[1] },
//               ],
//             },
//             {
//               name: dataToUse[6][1].pair[1],
//               children: [
//                 {
//                   name: dataToUse[14][1].pair[0],
//                 },
//                 { name: dataToUse[14][1].pair[1] },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
