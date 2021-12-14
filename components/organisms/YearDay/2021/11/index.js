import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  const map = data.map((row) => row.split("").map((v) => parseInt(v, 10)));
  return map;
};

export const printMap = (map) => {
  let y = 0;
  let output = "";
  while (y < map.length) {
    let x = 0;
    let line = `
`;
    while (x < map[y].length) {
      line += map[y][x]; //  > 9 ? 0 : map[y][x];
      x++;
    }
    output += line;
    y++;
  }
  console.log(output);
};

export const validate = (map, nrOfSteps) => {
  let nrOfFlashes = 0;

  printMap(map);

  const addIfOk = ({ x, y }) => {
    if (x > 9 || x < 0 || y > 9 || y < 0) {
      return;
    }
    map[y][x]++;
    return map[y][x] === 10;
  };

  const addToNear = ([x, y]) => {
    // console.log({ x, y });
    let newNines = [];
    addIfOk({ x: x + 1, y }) && newNines.push([x + 1, y]);
    addIfOk({ x: x - 1, y }) && newNines.push([x - 1, y]);
    addIfOk({ x, y: y + 1 }) && newNines.push([x, y + 1]);
    addIfOk({ x, y: y - 1 }) && newNines.push([x, y - 1]);
    addIfOk({ x: x + 1, y: y + 1 }) && newNines.push([x + 1, y + 1]);
    addIfOk({ x: x + 1, y: y - 1 }) && newNines.push([x + 1, y - 1]);
    addIfOk({ x: x - 1, y: y + 1 }) && newNines.push([x - 1, y + 1]);
    addIfOk({ x: x - 1, y: y - 1 }) && newNines.push([x - 1, y - 1]);
    return newNines;
  };

  const increaseAllForGivenPairs = (pairsToIncrease) => {
    let newNines = [];
    let i = 0;
    while (i < pairsToIncrease.length) {
      const [x, y] = pairsToIncrease[i];
      map[y][x]++;
      if (map[y][x] === 10) {
        newNines.push([x, y]);
      }
      i++;
    }
    return newNines;
  };

  const resetAllForGivenPairs = (pairsToReset) => {
    let i = 0;
    while (i < pairsToReset.length) {
      const [x, y] = pairsToReset[i];
      map[y][x] = 0;
      i++;
    }
  };

  const allPairs = [...new Array(100)].map((p, index) => [
    index % 10,
    Math.floor(index / 10) % 10,
  ]);

  let step = 0;
  while (step < nrOfSteps) {
    let fixThese = increaseAllForGivenPairs(allPairs);
    let resetThese = [...fixThese];
    // console.log("A:", { fixThese });
    while (fixThese.length > 0) {
      let pair = fixThese.pop();
      nrOfFlashes++;

      let additionalNewNines = addToNear(pair);
      resetThese = resetThese.concat(additionalNewNines);
      // console.log({ additionalNewNines, i });
      fixThese = fixThese.concat(additionalNewNines);
      // console.log("B:", { fixThese });
    }
    resetAllForGivenPairs(resetThese);
    // printMap(map);
    step++;
  }
  printMap(map);

  return { answer: nrOfFlashes };
};

export const validate2 = (map) => {
  const addIfOk = ({ x, y }) => {
    if (x > 9 || x < 0 || y > 9 || y < 0) {
      return;
    }
    map[y][x]++;
    return map[y][x] === 10;
  };

  const addToNear = ([x, y]) => {
    // console.log({ x, y });
    let newNines = [];
    addIfOk({ x: x + 1, y }) && newNines.push([x + 1, y]);
    addIfOk({ x: x - 1, y }) && newNines.push([x - 1, y]);
    addIfOk({ x, y: y + 1 }) && newNines.push([x, y + 1]);
    addIfOk({ x, y: y - 1 }) && newNines.push([x, y - 1]);
    addIfOk({ x: x + 1, y: y + 1 }) && newNines.push([x + 1, y + 1]);
    addIfOk({ x: x + 1, y: y - 1 }) && newNines.push([x + 1, y - 1]);
    addIfOk({ x: x - 1, y: y + 1 }) && newNines.push([x - 1, y + 1]);
    addIfOk({ x: x - 1, y: y - 1 }) && newNines.push([x - 1, y - 1]);
    return newNines;
  };

  const increaseAllForGivenPairs = (pairsToIncrease) => {
    let newNines = [];
    let i = 0;
    while (i < pairsToIncrease.length) {
      const [x, y] = pairsToIncrease[i];
      map[y][x]++;
      if (map[y][x] === 10) {
        newNines.push([x, y]);
      }
      i++;
    }
    return newNines;
  };

  const resetAllForGivenPairs = (pairsToReset) => {
    let i = 0;
    while (i < pairsToReset.length) {
      const [x, y] = pairsToReset[i];
      map[y][x] = 0;
      i++;
    }
  };

  const allPairs = [...new Array(100)].map((p, index) => [
    index % 10,
    Math.floor(index / 10) % 10,
  ]);

  let megaFlash = false;
  let step = 0;
  let nrOfFlashes;
  while (!megaFlash && step < 20000) {
    let fixThese = increaseAllForGivenPairs(allPairs);
    let resetThese = [...fixThese];
    // console.log("A:", { fixThese });
    while (fixThese.length > 0) {
      let pair = fixThese.pop();

      let additionalNewNines = addToNear(pair);
      resetThese = resetThese.concat(additionalNewNines);
      // console.log({ additionalNewNines, i });
      fixThese = fixThese.concat(additionalNewNines);
      // console.log("B:", { fixThese });
    }
    resetAllForGivenPairs(resetThese);
    // printMap(map);

    let j = 0;
    let countZeros = 0;
    while (j < allPairs.length) {
      const [x, y] = allPairs[j];
      countZeros += map[y][x] === 0 ? 1 : 0;
      j++;
    }

    if (countZeros === 100) {
      megaFlash = true;
    }
    step++;
  }
  printMap(map);

  return { answer: step };
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
