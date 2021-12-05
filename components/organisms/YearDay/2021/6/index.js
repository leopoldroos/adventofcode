import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  let maxX = 0;
  let maxY = 0;
  const lines = data.map((line) => {
    const [from, to] = line.split(" -> ");
    const [x1, y1] = from.split(",").map((n) => parseInt(n, 10));
    const [x2, y2] = to.split(",").map((n) => parseInt(n, 10));

    maxX = Math.max(maxX, x1, x2);
    maxY = Math.max(maxY, y1, y2);
    return {
      from: { x: x1, y: y1 },
      to: { x: x2, y: y2 },
    };
  });

  return { lines, maxX, maxY };
};

export const validate = ({ lines, maxX, maxY }) => {
  let answer = 0;
  let map = [...new Array(maxY + 1)].map((ys) =>
    [...new Array(maxX + 1)].map((y) => 0),
  );
  const filteredLines = lines.filter(
    (line) => line.from.x === line.to.x || line.from.y === line.to.y,
  );
  filteredLines.forEach((line) => {
    if (line.from.x === line.to.x) {
      let xPos = line.from.x;
      let yDir = line.from.y < line.to.y ? 1 : -1;
      let length = yDir * (line.to.y - line.from.y) + 1;
      let i = 0;
      while (i < length) {
        let yPos = line.from.y + yDir * i;
        map[yPos][xPos] += 1;
        if (map[yPos][xPos] === 2) {
          answer++;
        }
        i++;
      }
    } else {
      let yPos = line.from.y;
      let xDir = line.from.x < line.to.x ? 1 : -1;
      let length = xDir * (line.to.x - line.from.x) + 1;
      let i = 0;
      while (i < length) {
        let xPos = line.from.x + xDir * i;
        map[yPos][xPos] += 1;
        if (map[yPos][xPos] === 2) {
          answer++;
        }
        i++;
      }
    }
  });

  return {
    answer,
    map,
    filteredLines,
  };
};

export const validate2 = ({ lines, maxX, maxY }) => {
  let answer = 0;
  let map = [...new Array(maxY + 1)].map((ys) =>
    [...new Array(maxX + 1)].map((y) => 0),
  );
  lines.forEach((line) => {
    if (line.from.x === line.to.x) {
      let xPos = line.from.x;
      let yDir = line.from.y < line.to.y ? 1 : -1;
      let length = yDir * (line.to.y - line.from.y) + 1;
      let i = 0;
      while (i < length) {
        let yPos = line.from.y + yDir * i;
        map[yPos][xPos] += 1;
        if (map[yPos][xPos] === 2) {
          answer++;
        }
        i++;
      }
    } else if (line.from.y === line.to.y) {
      let yPos = line.from.y;
      let xDir = line.from.x < line.to.x ? 1 : -1;
      let length = xDir * (line.to.x - line.from.x) + 1;
      let i = 0;
      while (i < length) {
        let xPos = line.from.x + xDir * i;
        map[yPos][xPos] += 1;
        if (map[yPos][xPos] === 2) {
          answer++;
        }
        i++;
      }
    } else {
      let xDir = line.from.x < line.to.x ? 1 : -1;
      let yDir = line.from.y < line.to.y ? 1 : -1;
      let length = xDir * (line.to.x - line.from.x) + 1;
      let i = 0;
      while (i < length) {
        let xPos = line.from.x + xDir * i;
        let yPos = line.from.y + yDir * i;
        map[yPos][xPos] += 1;
        if (map[yPos][xPos] === 2) {
          answer++;
        }
        i++;
      }
    }
  });
  console.log(map, lines);
  return {
    answer,
    map,
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
