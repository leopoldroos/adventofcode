import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import InputArea from "@/components/atoms/InputArea";
import styled from "styled-components";

export const prepareData = (data) => data.map((d) => parseInt(d, 10));

export const validate = (data) => {
  let increased = 0;
  let prevDepth = 10000;
  data.map((depth) => {
    if (depth > prevDepth) {
      increased++;
    }
    prevDepth = depth;
  });
  return increased;
};

export const validate2 = (data) => {
  const slidingWindow = [];

  for (let i = 0; i < data.length - 2; i++) {
    const a = data[i];
    const b = i + 1 < data.length ? data[i + 1] : 0;
    const c = i + 2 < data.length ? data[i + 2] : 0;
    slidingWindow.push(a + b + c);
  }
  return validate(slidingWindow);
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
