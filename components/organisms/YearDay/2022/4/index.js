import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { getIndexFromAlphaChar } from "@/helpers/alphanumToNumber";

export const prepareData = (data) => {
  return data.map(row => row.split(",").map(range => range.split("-").map(v => parseInt(v))));
}
export const isFullyOverLapped = (rangeA, rangeB) => {
  if (rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[1]) {
    return true
  }
  if (rangeB[0] <= rangeA[0] && rangeB[1] >= rangeA[1]) {
    return true
  }
  return false;
}

export const isPartiallyOrFullyOverLapped = (rangeA, rangeB) => {
  if (rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[0]) {
    return true
  }
  if (rangeA[0] <= rangeB[1] && rangeA[1] >= rangeB[1]) {
    return true
  }

  if (rangeB[0] <= rangeA[0] && rangeB[1] >= rangeA[0]) {
    return true
  }
  if (rangeB[0] <= rangeA[1] && rangeB[1] >= rangeA[1]) {
    return true
  }
  return false;
}

export const validate = (data) => {
  const prepData = prepareData(data);
  const overlapping = prepData.filter((ranges) => isFullyOverLapped(ranges[0], ranges[1]))
  return overlapping?.length;
};
export const validate2 = (data) => {
  const prepData = prepareData(data);
  const overlapping = prepData.filter((ranges) => isPartiallyOrFullyOverLapped(ranges[0], ranges[1]))
  return overlapping?.length;
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
