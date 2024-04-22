import React from "react";
import Tree from "react-d3-tree";
import "../styles/tree-diagram.css";
import { useCenteredTree } from "./TreeHelper";

const containerStyles = {
  width: "100vw",
  height: "60vh",
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

function TreeDiagramExpt(props) {
  const { results, treeDiagramName } = props;
  const data = arrayToRows();

  function arrayToRows() {
    const newArray = [];
    results.forEach((entry) => {
      if (entry.firstWord) {
        newArray.push(entry.firstWord);
      }
      if (entry.secondWord) {
        newArray.push(entry.secondWord);
      }
    });
    // const flattenedArray = Object.values(results).flat();
    return drawBinaryTree(treeDiagramName, newArray);
  }

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
