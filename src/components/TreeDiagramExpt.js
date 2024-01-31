import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import "../styles/tree-diagram.css";
import { useCenteredTree } from "./TreeHelper";

const containerStyles = {
  width: "50vw",
  height: "50vh",
};

const drawTree = (title, childrenWords) => {
  const node = {
    name: title,
    children: [],
  };
  for (let i = 0; i < childrenWords.length; i += 2) {
    node.children.push({ name: childrenWords[i] }, { name: childrenWords[i + 1] });
  }

  return node;
};

const drawBinaryTree = (title, childrenWords) => {
  const node = {
    name: title,
    children: [],
  };

  const buildBinaryTree = (parentNode, index) => {
    if (index < childrenWords.length) {
      const leftChild = { name: childrenWords[index], children: [] };
      const rightChild = { name: childrenWords[index + 1], children: [] };

      parentNode.children.push(leftChild, rightChild);

      buildBinaryTree(leftChild, 2 * index + 2); // Left child
      buildBinaryTree(rightChild, 2 * index + 4); // Right child
    }
  };

  buildBinaryTree(node, 0); // Start building from the root

  return node;
};

const drawTop = (title, wordOne, wordTwo) => {
  return {
    name: title,
    children: [{ name: wordOne }, { name: wordTwo }],
  };
};

const drawTopWhenSecondRowPresent = (title, wordOne, wordTwo, children) => {
  console.log("TreeDiagramExpt, drawTopWhenSecondRowPresent, children[0]: ", children[0]);
  console.log("TreeDiagramExpt, drawTopWhenSecondRowPresent, children[1]: ", children[1]);
  // prettier-ignore
  return {
    name: title,
    children: [{ name: wordOne, children: children[0] }, { name: wordTwo, children: children[1] }],
  };
};

// const drawSecondRow = (firstWord, secondWord) => {
//   return {
//     children: [{ name: firstWord }, { name: secondWord }],
//   };
// };
const sampleData = ["light", "right", "collect", "correct", "airless", "heiress", "clamour", "crammer"];
// const sampleData = [
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
//   "13",
//   "14",
//   "15",
//   "16",
//   "17",
//   "18",
//   "19",
//   "20",
//   "21",
//   "22",
//   "23",
//   "24",
//   "25",
//   "26",
//   "27",
//   "28",
//   "29",
//   "30",
// ];
const data = drawBinaryTree("Root", sampleData);

const drawSecondRow = (firstWord, secondWord) => {
  return [{ name: firstWord }, { name: secondWord }];
};

function TreeDiagramExpt(props) {
  const { results, treeDiagramName, userQuery } = props;
  console.log("TreeDiagramExpt, results: ", results);
  const [rowOne, setRowOne] = useState([]);
  const [rowTwo, setRowTwo] = useState([]);
  const [children, setChildren] = useState([]);
  // const [data, setData] = useState({});

  useEffect(() => {
    arrayToRows();
  }, []);

  useEffect(() => {
    // setData(drawTop(treeDiagramName, rowOne[0], rowOne[1]));
    setChildren([drawSecondRow(rowTwo[0], rowTwo[1]), drawSecondRow(rowTwo[2], rowTwo[3])]);
  }, [rowOne]);

  // useEffect(() => {
  //   console.log("TreeDiagramExpt, children: ", children);
  //   setData(drawTopWhenSecondRowPresent(treeDiagramName, rowOne[0], rowOne[1], children));
  // }, [children]);

  useEffect(() => {
    // console.log("TreeDiagramExpt, children2: ", children2);
    console.log("TreeDiagramExpt, data: ", data);
  }, [data]);

  function arrayToRows() {
    if (Object.keys(results).length === 1) {
      console.log("TreeDiagramExpt, results, length: ", Object.keys(results).length);
      const flattenedArray = Object.values(results).flat();
      console.log("TreeDiagramExpt, arrayToRows, flattenedArray: ", flattenedArray);
      setRowOne(flattenedArray.slice(0, 2));
    }
    if (Object.keys(results).length === 3) {
      const flattenedArray = Object.values(results).flat();
      console.log("TreeDiagramExpt, results, length 3: ", Object.keys(results).length);
      setRowOne(flattenedArray.slice(0, 2));
      console.log("TreeDiagramExpt, arrayToRows, flattenedArray: ", flattenedArray);
      console.log("flattenedArray.slice(2,5), aka rowTwo: ", flattenedArray.slice(2, 6));
      setRowTwo(flattenedArray.slice(2, 6));
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
