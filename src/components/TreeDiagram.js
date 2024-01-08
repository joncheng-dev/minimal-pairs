import React from "react";
import Tree from "react-d3-tree";
import "../styles/tree-diagram.css";
import { useCenteredTree } from "./TreeHelper";

const containerStyles = {
  width: "70vw",
  height: "50vh",
};

function TreeDiagram() {
  const testData = {
    name: "L vs R",
    children: [
      { name: "Node 1", children: [{ name: "Leaf 1" }, { name: "Leaf 2" }] },
      { name: "Node 2", children: [{ name: "Leaf 3" }, { name: "Leaf 4" }] },
    ],
  };

  // var svg = d3
  //   .select("div#container")
  //   .append("svg")
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .attr("viewBox", "0 0 300 300")
  //   .classed("svg-content", true);
  const [dimensions, translate, containerRef] = useCenteredTree();
  return (
    <>
      <div style={containerStyles} ref={containerRef} className="svg-container">
        <Tree
          data={testData}
          dimensions={dimensions}
          translate={translate}
          orientation="vertical"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
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
