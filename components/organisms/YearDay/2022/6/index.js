import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  return data.map(row => row.split(",").map(range => range.split("-").map(v => parseInt(v))));
}

export const validate = (data) => {
  const startOfPacketLength = 4
  let startOfPacket = [data[0]];

  let i = 1;
  while (i < data.length && startOfPacket.length < startOfPacketLength && i < 10000) {
    // console.log(startOfPacket.join(""));

    const char = data[i];
    const existIndex = startOfPacket.indexOf(char);
    if (existIndex !== -1) {
      startOfPacket = startOfPacket.slice(existIndex + 1);//, startOfPacket.length - existIndex);
    }
    startOfPacket.push(char);
    i++;
  }
  return i;
};

export const validate2 = (data) => {
  const startOfPacketLength = 14
  let startOfPacket = [data[0]];

  let i = 1;
  while (i < data.length && startOfPacket.length < startOfPacketLength && i < 10000) {
    // console.log(startOfPacket.join(""));

    const char = data[i];
    const existIndex = startOfPacket.indexOf(char);
    if (existIndex !== -1) {
      startOfPacket = startOfPacket.slice(existIndex + 1);//, startOfPacket.length - existIndex);
    }
    startOfPacket.push(char);
    i++;
  }
  return i;
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
