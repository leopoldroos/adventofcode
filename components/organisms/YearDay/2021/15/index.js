import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
// const fs = require("fs");

export const prepareData = (data) => {
  const map = data.map((row) => row.split("").map((v) => parseInt(v, 10)));
  const yLength = map.length;
  const xLength = map[0].length;
  return { map, yLength, xLength };
};

export const validate = ({ yLength, xLength, map }) => {
  let initPath = {
    sum: map[0][0],
    pathToThisPos: ["0,0"],
    wallsToSkip: [],
  };
  const isOk = ({ x, y }) => {
    if (x >= xLength || x < 0 || y >= yLength || y < 0) {
      return;
    }
    // map[y][x]++;
    return [x, y];
  };

  const getNear = ([x, y]) => {
    let near = [];
    isOk({ x: x + 1, y }) && near.push([x + 1, y]);
    isOk({ x: x - 1, y }) && near.push([x - 1, y]);
    isOk({ x, y: y + 1 }) && near.push([x, y + 1]);
    isOk({ x, y: y - 1 }) && near.push([x, y - 1]);
    // isOk({ x: x + 1, y: y + 1 }) && near.push([x + 1, y + 1]);
    // isOk({ x: x + 1, y: y - 1 }) && near.push([x + 1, y - 1]);
    // isOk({ x: x - 1, y: y + 1 }) && near.push([x - 1, y + 1]);
    // isOk({ x: x - 1, y: y - 1 }) && near.push([x - 1, y - 1]);
    return near;
  };

  const getLowestNears = ({ x, y, skipPathToThisPos, RECURSIVE }) => {
    const nearPairs = getNear([x, y]).filter(
      (p) => !skipPathToThisPos.find((skip) => skip === `${p[0]},${p[1]}`),
    );
    const nearValues = nearPairs.map(([x, y]) => map[y][x]);
    let nearValuesSorted = [...nearValues];
    nearValuesSorted.sort((a, b) => a - b);
    let lowestValue = nearValuesSorted[0];

    const pairsWithLowestValue = nearPairs.filter(
      ([x, y]) => map[y][x] === lowestValue,
    );
    const newSkips = nearPairs
      .filter(([x, y]) => map[y][x] !== lowestValue)
      .map((p) => `${p[0]},${p[1]}`);
    console.log({
      RECURSIVE,
      x,
      y,
      nearPairs,
      nearValues,
      pairsWithLowestValue,
      newSkips,
      lowestValue,
      skipPathToThisPos,
    });
    return [pairsWithLowestValue, newSkips];
  };

  const recursiveFunction = ({
    sum,
    pathToThisPos,
    wallsToSkip,
    RECURSIVE,
  }) => {
    const [x, y] = pathToThisPos[pathToThisPos.length - 1]
      .split(",")
      .map((v) => parseInt(v, 10));
    const [pairsWithLowestValue, newSkips] = getLowestNears({
      x,
      y,
      skipPathToThisPos: [...pathToThisPos, ...wallsToSkip],
      RECURSIVE,
    });
    const lowestValue =
      map[pairsWithLowestValue[0][1]][pairsWithLowestValue[0][0]];
    const newSum = sum + lowestValue;
    const newWallsToSkip = [...wallsToSkip, ...newSkips];
    if (pairsWithLowestValue.length > 1) {
      const paths = pairsWithLowestValue.map((p) => {
        const newPathToThisPos = [...pathToThisPos, `${p[0]},${p[1]}`];
        return recursiveFunction({
          sum: newSum,
          pathToThisPos: newPathToThisPos,
          wallsToSkip: newWallsToSkip,
          RECURSIVE: true,
        });
      });
      const pathWithLowestValue = paths.sort((a, b) => b.sum - a.sum).pop();
      console.log("MULTIPLE MINS -> RECURSIVE RESULT:", {
        pathWithLowestValue,
      });
      return pathWithLowestValue;
    } else {
      const p = pairsWithLowestValue[0];
      const lowestValueOfPaths = {
        sum: newSum,
        pathToThisPos: [...pathToThisPos, `${p[0]},${p[1]}`],
        wallsToSkip: newWallsToSkip,
      };
      console.log("ONLY ONE MIN:", lowestValueOfPaths);
      return lowestValueOfPaths;
    }
  };

  let path = initPath;
  let i = 0;
  while (path.y !== yLength - 1 && path.x !== xLength - 1 && path.sum < 50) {
    // const [ x, y ] = pathToThisPos[pathToThisPos.length -1];
    const nextPath = recursiveFunction(path);
    path = { ...nextPath };
    console.log("WHILE DONE:", { i, nextPath });
    i++;
  }

  console.log("FINAL:", path);
  return { answer: path.sum };
};

export const validate2 = (lines) => {
  return { answer };
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
