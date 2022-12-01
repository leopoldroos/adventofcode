import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
// const fs = require("fs");

export const prepareData = (data) => {
  const [xStr, yStr] = data[0].substr(13).split(", ");
  const [xMin, xMax] = xStr
    .split("=")[1]
    .split("..")
    .map((s) => parseInt(s, 10));
  const [yMin, yMax] = yStr
    .split("=")[1]
    .split("..")
    .map((s) => parseInt(s, 10));
  return { xMin, xMax, yMin, yMax };
};

export const updatePosition = ({ pos, velo }) => {
  const newPosX = pos[0] + velo[0];
  const newPosY = pos[1] + velo[1];
  const newVeloX = Math.max(0, velo[0] - 1);
  const newVeloY = velo[1] - 1;
  return { pos: [newPosX, newPosY], velo: [newVeloX, newVeloY] };
};

export const calculateTrajectory = ({ pos, velo, targetMap }) => {
  const { xMin, xMax, yMin, yMax } = targetMap;
  let currentPos = pos;
  let currentVelo = velo;
  let nrOfSteps = 0;
  let targetReached = false;
  let highest = currentPos[1];
  while (currentPos[0] < xMax && currentPos[1] > yMin && !targetReached) {
    const result = updatePosition({ pos: currentPos, velo: currentVelo });
    currentPos = result.pos;
    currentVelo = result.velo;
    highest = Math.max(highest, currentPos[1]);
    if (
      currentPos[0] >= xMin &&
      currentPos[0] <= xMax &&
      currentPos[1] >= yMin &&
      currentPos[1] <= yMax
    ) {
      // Target reached!
      targetReached = true;
    }
    nrOfSteps++;
  }
  return { targetReached, highest, nrOfSteps };
};

export const validate = (targetMap) => {
  let highestOfAll = 0;
  let initialSteps = 0;
  const maxStartVeloX = targetMap.xMax; // min = 1
  const minStartVeloY = targetMap.yMin;
  const maxStartVeloY = targetMap.xMax - targetMap.yMax; // ? + yMax = xMax
  let veloY = minStartVeloY;
  while (veloY <= maxStartVeloY) {
    let veloX = 1;
    while (veloX <= maxStartVeloX) {
      const { targetReached, highest } = calculateTrajectory({
        pos: [0, 0],
        velo: [veloX, veloY],
        targetMap,
      });
      if (targetReached) {
        highestOfAll = Math.max(highestOfAll, highest);
        initialSteps++;
      }
      veloX++;
    }
    veloY++;
  }

  return { answer: highestOfAll, initialSteps };
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
