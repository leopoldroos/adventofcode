import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { getNewDirection } from "../../2020/12/12";

const getParentDir = (tree, dirTrace) => {
  let parentDir = tree;
  let i = 0;
  // console.log("dirTrace:", dirTrace);
  // console.log("tree:", tree);
  while (i < dirTrace.length - 1) {
    parentDir = parentDir[dirTrace[i]];
    // console.log("for folder:", dirTrace[i], " -> parentDir:", parentDir);
    i++;
  }
  // console.log("Parent dir = ", dirTrace[i], parentDir);
  return parentDir;
}

export const prepareData = (data) => {
  const tree = { size: 0 };
  let currentDir = tree;
  const dirTrace = [];
  let answerA = 0;
  data.map(row => {
    const parts = row.split(" ");

    if (parts[0] === "$") {
      // New command:
      if (parts[1] === "cd") {
        if (parts[2] === "..") {
          answerA += currentDir.size < 100000 ? currentDir.size : 0;

          const childSize = currentDir.size;
          currentDir = getParentDir(tree, dirTrace);
          currentDir.size += childSize;
          dirTrace.pop();
        } else {
          const dirName = parts[2];
          if (!currentDir[dirName]) {
            currentDir[dirName] = { files: [], size: 0 };
          }
          currentDir = currentDir[dirName];
          dirTrace.push(dirName);
        }
      }
    } else {
      if (parts[0] == "dir") {
        currentDir[parts[1]];
      } else {
        currentDir.files.push(parts[1]);
        currentDir.size += parseInt(parts[0]);
      }
    }
  });
  const childSize = currentDir.size;
  currentDir = getParentDir(tree, dirTrace);
  currentDir.size += childSize;
  dirTrace.pop();

  // console.log(currentDir)
  answerA += currentDir.size < 100000 ? currentDir.size : 0;

  // console.log(tree["/"])

  // console.log({ answerA })
  return { tree, answerA };
}

export const validate = (data) => {
  return data;
};

function getDeletables(data, deletables) {
  const keys = Object.keys(data);
  return keys.filter(k => k !== "files").map(key => {
    if (key === "size") {
      return deletables.push(data.size);
    } else {
      return getDeletables(data[key], deletables)
    }
  })
}

export const validate2 = (data) => {
  const freeSpace = 70000000 - data["/"].size;
  const deleteAtLeast = 30000000 - freeSpace;
  console.log({ freeSpace, deleteAtLeast })

  let deletables = [];
  getDeletables(data, deletables);
  deletables = deletables.sort((a, b) => a - b).filter(size => size > deleteAtLeast);;
  console.log({ deletables })
  return deletables[0]
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
