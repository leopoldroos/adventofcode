import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  return {
    crabs: data[0]
      .split(",")
      .map((t) => ({ position: parseInt(t, 10), fuel: 0 })),
  };
};

export const calculateFuel = ({ crab, toPsoition }) => {
  return {
    fuel: Math.abs(crab.position - toPsoition),
  };
};

export const calculateFuel2 = ({ crab, toPsoition }) => {
  let i = 0;
  let fuel = 0;
  const absToPsoition = Math.abs(crab.position - toPsoition);
  while (i < absToPsoition) {
    i++;
    fuel += i;
  }

  return {
    fuel,
  };
};

export const calculateSum = ({ crabs }) =>
  crabs.reduce((sum, crab) => sum + crab.position, 0);

export const calculateMeanPos = ({ crabs, endPosition }) => {
  let totalFuel = 0;
  let i = 0;
  while (i < crabs.length) {
    const crab = crabs[i];
    const { fuel } = calculateFuel({ crab, toPsoition: endPosition });
    totalFuel += fuel;
    i++;
  }
  return {
    totalFuel,
  };
};

export const calculateMeanPos2 = ({ crabs, endPosition }) => {
  let totalFuel = 0;
  let i = 0;
  while (i < crabs.length) {
    const crab = crabs[i];
    const { fuel } = calculateFuel2({ crab, toPsoition: endPosition });
    totalFuel += fuel;
    i++;
  }
  return {
    totalFuel,
  };
};

export const sortCrabsByPosition = ({ crabs }) => {
  crabs.sort((a, b) => {
    return a.position - b.position;
  });
};

export const validate = ({ crabs }) => {
  let minFuel = 0;
  let minFuelPos = 0;
  let i = 0;
  while (i < crabs.length) {
    const { totalFuel } = calculateMeanPos({ crabs, endPosition: i });
    console.log(totalFuel, minFuel);
    if (minFuel === 0 || totalFuel < minFuel) {
      minFuel = totalFuel;
      minFuelPos = i;
    }
    i++;
  }
  return {
    minFuel,
    minFuelPos,
  };
};

export const validate2 = ({ crabs }) => {
  let minFuel = 0;
  let minFuelPos = 0;
  let i = 0;
  while (i < crabs.length) {
    const { totalFuel } = calculateMeanPos2({ crabs, endPosition: i });
    console.log(totalFuel, minFuel);
    if (minFuel === 0 || totalFuel < minFuel) {
      minFuel = totalFuel;
      minFuelPos = i;
    }
    i++;
  }
  return {
    minFuel,
    minFuelPos,
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
