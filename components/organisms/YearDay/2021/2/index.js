import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import InputArea from "@/components/atoms/InputArea";
import styled from "styled-components";

export const prepareData = (data) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  data.forEach((row) => {
    const [direction, amount] = row.split(" ");
    switch (direction) {
      case "forward":
        horizontal += parseInt(amount);
        break;
      case "down":
        depth += parseInt(amount);
        break;
      case "up":
        depth -= parseInt(amount);
        break;
      case "aim":
        aim -= parseInt(amount);
        break;
    }
  });
  return { horizontal, depth, aim };
};

export const validate = ({ horizontal, depth }) => {
  return horizontal * depth;
};

export const prepareData2 = (data) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  data.forEach((row) => {
    const [direction, amount] = row.split(" ");
    switch (direction) {
      case "forward":
        horizontal += parseInt(amount);
        depth += aim * parseInt(amount);
        break;
      case "down":
        aim += parseInt(amount);
        break;
      case "up":
        aim -= parseInt(amount);
        break;
    }
  });
  return { horizontal, depth };
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

  const taskDescription = `What do you get if you multiply your final horizontal position by your final depth?`;

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
