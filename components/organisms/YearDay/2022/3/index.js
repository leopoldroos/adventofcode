import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { getIndexFromAlphaChar } from "@/helpers/alphanumToNumber";

export const prepareData = (data) => data.map((d) => parseInt(d, 10));

export const getUniqueItem = (line) => {
  const partsA = line.substring(0, line.length / 2).split("");
  const partsB = line.substring(line.length / 2).split("");
  const foundA = partsA.find(l => l = partsB.includes(l));
  if (foundA) {
    return foundA;
  }
  return partsB.find(l => l = partsA.includes(l));
}

export const getShareItems = (data) => {
  const uniqueChars = data.map(getUniqueItem);
  const sum = uniqueChars.reduce((sum, char) => (sum + getIndexFromAlphaChar(char) + 1), 0);
  return { line: uniqueChars.join(""), sum }
}

export const keepDuplicates = (lineA, lineB) => {
  const partsA = lineA.split("");
  const partsB = lineB.split("");
  const filteredA = partsA.filter(l => l = partsB.includes(l));
  const filteredB = partsB.filter(l => l = partsA.includes(l));
  return filteredA.join("") + filteredB.join("");
}

export const validate2 = (data) => {
  const groups = [];
  while (data.length > 0) {
    groups.push(data.splice(0, 3))
  }
  const keyLetters = groups.map(group => {
    const duplicates = keepDuplicates(group[0], group[1]);
    const keyLetterInGroup = keepDuplicates(group[2], duplicates);
    return keyLetterInGroup[0];
  })
  const sum = keyLetters.reduce((sum, char) => (sum + getIndexFromAlphaChar(char) + 1), 0);

  return { keyLetters: keyLetters.join(""), sum };
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
