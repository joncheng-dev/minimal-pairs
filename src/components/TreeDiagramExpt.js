import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import "../styles/tree-diagram.css";
import { useCenteredTree } from "./TreeHelper";

const containerStyles = {
  width: "50vw",
  height: "50vh",
};

const drawTree = (title) => {
  return {
    name: title,
    children: [{ name: "firstWord" }, { name: "secondWord" }],
  };
};

function TreeDiagramExpt(props) {
  const { results, treeDiagramName, userQuery } = props;

  const resultsToArray = Object.entries(results);
  console.log("TreeDiagramExpt, resultsToArray: ", resultsToArray);
  const data = drawTree(treeDiagramName);
  const [rowOne, setRowOne] = useState([]);
  const [rowTwo, setRowTwo] = useState([]);

  // useEffect(() => {
  //   arrayToRows();
  // }, []);

  // function arrayToRows(resultsToArray) {
  //   if (resultsToArray.length === 2) {
  //     setRowOne(resultsToArray);
  //   }
  // }

  //#endregion Data Allocation

  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <rect width="20" height="20" x="-10" />
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
    </g>
  );

  const [dimensions, translate, containerRef] = useCenteredTree();

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

export default TreeDiagramExpt;
