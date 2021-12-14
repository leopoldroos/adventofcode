import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
// const fs = require("fs");

export const prepareData = (data) => {
  let prepData = {
    folds: [],
    pos: [],
    x: [],
    y: [],
  };
  data.forEach((row) => {
    if (row.includes("=")) {
      const parts = row.split("=");
      prepData.folds.push({
        direction: parts[0].split(" ").pop(),
        value: parseInt(parts[1], 10),
      });
    } else if (row.length > 0) {
      const [x, y] = row.split(",").map((v) => parseInt(v, 10));
      prepData.x.push(x);
      prepData.y.push(y);
      prepData.pos.push([x, y]);
    }
  });
  const maxX = Math.max(...prepData.x);
  const maxY = Math.max(...prepData.y);
  prepData.map = [...new Array(maxY)].map((y) => [...new Array(maxX)]);
  return prepData;
};

export const sortXYPair = (map, sortBy) =>
  map.sort((a, b) => (sortBy === "x" ? a[0] - b[0] : a[1] - b[1]));

export const foldY = (pairs, foldAt) => {
  pairs = sortXYPair(pairs, "y");
  const foldIndex = pairs.findIndex((p) => p[1] > foldAt);

  let newMap = pairs.slice(0, foldIndex);
  // console.log({ foldIndex }, newMap.slice(newMap.length - 3));
  // console.log(pairs.slice(foldIndex - 3, foldIndex + 3));
  let i = foldIndex;
  while (i < pairs.length) {
    const pair = [pairs[i][0], foldAt - Math.abs(foldAt - pairs[i][1])];
    const foundPair = newMap.find((p) => p[0] === pair[0] && p[1] === pair[1]);
    if (!foundPair) {
      // console.log("ADD Y:", i, pairs[i], "->", pair);
      newMap.push(pair);
    } else {
      // console.log("THIS EXISTS! Y:", pair, { i });
    }
    i++;
  }
  return newMap;
};

export const printLine = (values) => {
  let i = 0;
  const maxValue = values[values.length - 1];
  let line = `
`;
  while (i <= maxValue) {
    line += values.includes(i) ? "#" : ".";
    i++;
  }
  return line;
};

export const logAnswer = (pairs) => {
  pairs = sortXYPair(pairs, "y");

  let xValues = [];
  let output = "";
  let yMap = {};
  pairs.forEach((p) => {
    if (yMap[p[1]] === undefined) {
      yMap[p[1]] = [];
    }
    yMap[p[1]].push(p[0]);
  });
  let yValues = Object.keys(yMap).map((v) => parseInt(v, 10));
  yValues.sort((a, b) => a - b);

  const yMax = yValues[yValues.length - 1];
  let y = 0;

  while (y <= yMax) {
    if (yValues.includes(y)) {
      xValues = yMap[y];
      xValues.sort((a, b) => a - b);
      console.log({ xValues });
      output += printLine(xValues);
    } else {
      output += `\n
`;
    }
    y++;
  }

  console.log(output);
  // fs.writeFile("./output.txt", pairs, () => {});
};

export const foldX = (pairs, foldAt) => {
  pairs = sortXYPair(pairs, "x");
  const foldIndex = pairs.findIndex((p) => p[0] > foldAt);

  let newMap = pairs.slice(0, foldIndex);
  // console.log({ foldIndex }, newMap.slice(newMap.length - 3));

  // console.log(pairs.slice(foldIndex - 3, foldIndex + 3));
  let i = foldIndex;
  while (i < pairs.length) {
    const pair = [foldAt - Math.abs(foldAt - pairs[i][0]), pairs[i][1]];
    const foundPair = newMap.find((p) => p[0] === pair[0] && p[1] === pair[1]);
    if (!foundPair) {
      newMap.push(pair);
    }
    i++;
  }
  return newMap;
};

export const validate = (data) => {
  const { pos: pairs, folds } = data;
  let newPairs = pairs;
  let i = 0;
  while (i < folds.length) {
    if (folds[i].direction === "x") {
      newPairs = foldX(newPairs, folds[i].value);
    } else {
      newPairs = foldY(newPairs, folds[i].value);
    }
    i++;
  }
  return { answer: newPairs }; // => BLKJRBAG
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
