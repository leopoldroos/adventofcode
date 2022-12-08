import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { getNewDirection } from "../../2020/12/12";


export const prepareData = (data) => {
  return data.map((row, i) => row.split("").map((c, j) => (
    {
      height: parseInt(c),
      visible: (i === 0 || i === data[0].length - 1 || j === 0 || j === data.length - 1) ? true : "unknown",
      distance: [],
    }
  )))
}

export function flip(data) {
  const flipped = [];
  data.forEach((row, i) => {
    row.forEach((item, j) => {
      if (flipped.length <= j) {
        flipped.push([])
      }
      flipped[j].push(item);
    })
  })
  return flipped;
}

export function countLowerTreesBack(subTrees) {
  const trees = [...subTrees];
  trees.reverse();
  const distance = trees.slice(1).findIndex(tree => tree.height >= trees[0].height)
  return distance === -1 ? trees.length - 1 : distance + 1;
}
function setVisible(trees, reverse) {
  trees = trees.map(treesRow => {
    let highest = 0;
    if (reverse) {
      treesRow.reverse();
    }
    return treesRow.map((tree, i) => {
      if (highest < tree.height) {
        // console.log("Set visible!", highest, tree.height)
        highest = tree.height;
        tree.visible = true;

        // Also, current tree can see to current "left" to the edge:
        // console.log("Max view:", tree.distance, i, tree.distance * (i + 1))
        // tree.distance = tree.distance * (i + 1);
      } else {
        // const distance = countLowerTreesBack(treesRow.slice(0, i + 1));
        // tree.distance = tree.distance * (distance + 1);
      }
      const distance = countLowerTreesBack(treesRow.slice(0, i + 1));
      // console.log(treesRow, i, tree, distance)
      tree.distance.push(distance);

      // console.log(tree)
      return tree;
    });
  });
  // console.log(trees)
  return trees;
}
export const validate = (data) => {
  let trees = prepareData(data);

  trees = setVisible(trees);

  // do both directions per array
  trees = setVisible(trees, true);

  // flip x - y dimension, and do sama again
  trees = flip(trees);

  trees = setVisible(trees);
  // do both directions per array
  trees = setVisible(trees, true);

  // Calculate visible:
  // console.log(trees)
  return trees.reduce((totalSum, treeRow) => {
    // console.log({ totalSum, treeRow })
    return totalSum + treeRow.reduce((sum, tree) => {
      // console.log(tree.visible, (tree.visible ? 1 : 0))
      return sum + (tree.visible !== "unknown" ? 1 : 0);
    }, 0);
  }, 0);
};

export const validate2 = (data) => {
  let trees = prepareData(data);

  trees = setVisible(trees);
  // console.log(trees.map(r => r.map(t => t.distance)))

  // do both directions per array
  trees = setVisible(trees, true);
  // console.log(trees.map(r => r.map(t => t.distance)))

  // flip x - y dimension, and do sama again
  trees = flip(trees);

  trees = setVisible(trees);
  // console.log(trees.map(r => r.map(t => t.distance)))

  // do both directions per array
  trees = setVisible(trees, true);

  // Calculate visible:
  // console.log(trees.map(r => r.map(t => t.distance)))
  return trees.reduce((totalMax, treeRow) => {
    const localMax = treeRow.reduce((max, tree) => {
      // console.log(tree.distance, tree)
      const distance = tree.distance.reduce((mult, d) => mult * d, 1);
      return distance > max ? distance : max;
    }, 0);
    // console.log({ localMax, treeRow })
    return localMax > totalMax ? localMax : totalMax;
  }, 0);
};


const Description = styled(Text)``;

const Day = () => {
  // const [inputData, setInputData] = useState(testData);
  const [resultOne, setResultOne] = useState(null);
  const [resultTwo, setResultTwo] = useState(null);

  const onRun = () => {
    // const preparedData = prepareData(inputData);
    // setResultOne(validate(preparedData))
    // let sums = validateTwo(preparedData)
    // setResultTwo(sums[0])
  };

  const taskDescription = `How many measurements are larger than the previous measurement?`;

  return (
    <div>
      {/* <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p> */}
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  );
};
export default Day;
