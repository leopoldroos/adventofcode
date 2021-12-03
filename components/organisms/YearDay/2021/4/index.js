import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  const gammaRateLength = data[0].length;
  let flippedArray = [...new Array(gammaRateLength)].map((x) => []);

  data.forEach((row) => {
    let i = 0;
    while (i < gammaRateLength) {
      flippedArray[i].push(parseInt(row[i], 10));
      i++;
    }
  });

  return { flippedArray };
};

const getMostCommonBit = (bits) =>
  bits.reduce((a, b) => a + b, 0) / bits.length < 0.5 ? 0 : 1;

export const validate = ({ flippedArray }) => {
  const mostCommonBits = flippedArray.map(getMostCommonBit);
  const gammaBinary = mostCommonBits.join("");
  const gammaDecimal = convertToDecimal(gammaBinary);

  const epsilonBinary = mostCommonBits.map((b) => (b === 1 ? 0 : 1)).join("");
  const epsilonDecimal = convertToDecimal(epsilonBinary);

  return {
    mostCommonBits,
    gammaBinary,
    gammaDecimal,
    epsilonBinary,
    epsilonDecimal,
    answer: epsilonDecimal * gammaDecimal,
  };
};

export const validate2 = (initData) => {
  let oxygenBinary;
  let data = [...initData];
  let i = 0;
  let endLoop = false;

  while (!endLoop && i < data[0].length) {
    const { flippedArray } = prepareData(data);
    const bits = flippedArray[i];
    const mostCommonBit = getMostCommonBit(bits);
    data = data.filter((d) => parseInt(d[i], 10) === mostCommonBit);
    if (data.length === 1) {
      oxygenBinary = data[0];
      endLoop = true;
    }
    i++;
  }

  let coBinary;
  data = [...initData];
  i = 0;
  endLoop = false;

  while (!endLoop && i < data[0].length) {
    const { flippedArray } = prepareData(data);
    const bits = flippedArray[i];
    const leastCommonBit = getMostCommonBit(bits) == 1 ? 0 : 1;
    data = data.filter((d) => parseInt(d[i], 10) === leastCommonBit);
    if (data.length === 1) {
      coBinary = data[0];
      endLoop = true;
    }
    i++;
  }

  const oxygenDecimal = convertToDecimal(oxygenBinary);
  const coDecimal = convertToDecimal(coBinary);
  return {
    oxygenBinary,
    oxygenDecimal,
    coBinary,
    coDecimal,
    answer: oxygenDecimal * coDecimal,
  };
};

const Description = styled(Text)``;

const Day = () => {
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
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  );
};
export default Day;
