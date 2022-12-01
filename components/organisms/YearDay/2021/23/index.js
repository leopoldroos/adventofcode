import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
// const fs = require("fs");

export const prepareData = (data) => {
  const prepData = data.map((row) => {
    const [mode, coordinates] = row.split(" ");
    const [xSpan, ySpan, zSpan] = coordinates
      .split(",")
      .map((s) => s.split("=")[1])
      .map((s) => s.split("..").map((v) => parseInt(v, 10)));

    return {
      mode,
      xSpan,
      ySpan,
      zSpan,
      isSmall:
        xSpan[0] >= -50 &&
        xSpan[1] <= 50 &&
        ySpan[0] >= -50 &&
        ySpan[1] <= 50 &&
        zSpan[0] >= -50 &&
        zSpan[1] <= 50,
      isContaining: (x, y, z) =>
        xSpan[0] <= x &&
        xSpan[1] >= x &&
        ySpan[0] <= y &&
        ySpan[1] >= y &&
        zSpan[0] <= z &&
        zSpan[1] >= z,
    };
  });
  return prepData;
};

const newBulb = (x, y, z) => {
  return {
    isPos: (a, b, c) => a === x && b === y && c === z,
  };
};

const applyActionCubeOnBulbs = (
  extendSameBulbs,
  switchDifferentBulbs,
  actionCube,
) => {
  const additionalBulbs = [];

  let x = actionCube.xSpan[0];
  while (x <= actionCube.xSpan[1]) {
    let y = actionCube.ySpan[0];
    while (y <= actionCube.ySpan[1]) {
      let z = actionCube.zSpan[0];
      while (z <= actionCube.zSpan[1]) {
        if (!extendSameBulbs.find((bulb) => bulb.isPos(x, y, z))) {
          additionalBulbs.push(newBulb(x, y, z));
        }
        const existingIndex = switchDifferentBulbs.findIndex((bulb) =>
          bulb.isPos(x, y, z),
        );
        if (existingIndex !== -1) {
          switchDifferentBulbs.splice(existingIndex, 1);
        }

        z++;
      }
      y++;
    }
    x++;
  }
  extendSameBulbs = extendSameBulbs.concat(additionalBulbs);
  return [extendSameBulbs, switchDifferentBulbs];
};

export const applyActionCube = (allCubesState, actionCube) => {
  if (actionCube.mode === "on") {
    const [extendedBulbs, switchedBulbs] = applyActionCubeOnBulbs(
      allCubesState.onBulbs,
      allCubesState.offBulbs,
      actionCube,
    );
    allCubesState.onBulbs = extendedBulbs;
    allCubesState.offBulbs = switchedBulbs;
  } else {
    const [extendedBulbs, switchedBulbs] = applyActionCubeOnBulbs(
      allCubesState.offBulbs,
      allCubesState.onBulbs,
      actionCube,
    );
    allCubesState.offBulbs = extendedBulbs;
    allCubesState.onBulbs = switchedBulbs;
  }
  return allCubesState;
};

export const validate = (prepData) => {
  const cubes = prepData.filter(({ isSmall }) => isSmall);
  let allCubesState = {
    onBulbs: [],
    offBulbs: [],
  };
  let i = 0;
  console.log(cubes.length);
  while (i < cubes.length) {
    allCubesState = applyActionCube(allCubesState, cubes[i]);
    i++;
  }
  console.log(allCubesState);
  return { answer: allCubesState.onBulbs.length };
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
