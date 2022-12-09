import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";


export const prepareData = (data) => {
  return data.map((row, i) => row.split("").map((c, j) => (
    {
      height: parseInt(c),
      visible: (i === 0 || i === data[0].length - 1 || j === 0 || j === data.length - 1) ? true : "unknown",
      distance: [],
    }
  )))
}

function moveHead(direction, head, steps = 1) {
  switch (direction) {
    case "R":
      head.x += steps;
      break;
    case "L":
      head.x -= steps;
      break;
    case "U":
      head.y += steps;
      break;
    case "D":
      head.y -= steps;
      break;
  }
}

function moveTail(head, tail) {
  const xDistance = head.x - tail.x;
  const xDirection = xDistance < 0 ? -1 : 1;
  const yDistance = head.y - tail.y;
  const yDirection = yDistance < 0 ? -1 : 1;


  if ((Math.abs(xDistance) > 1 && Math.abs(yDistance))
    || (Math.abs(yDistance) > 1 && Math.abs(xDistance))) {
    tail.x += xDirection * 1;
    tail.y += yDirection * 1;
  } else if (Math.abs(xDistance) > 1) {
    tail.x += xDirection * 1;
  } else if (Math.abs(yDistance) > 1) {
    tail.y += yDirection * 1;
  }
  const pos = `${tail.x}_${tail.y}`;
  if (!tail.trace.includes(pos)) {
    tail.trace.push(pos);
  }
  // console.log("head:", head, "tail:", tail, { xDistance, yDistance })
}

export const validate = (data) => {
  let i = 0;
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0, trace: [] };
  while (i < data.length) {
    const [direction, steps] = data[i].split(" ");
    let j = 0;
    while (j < steps) {
      moveHead(direction, head);
      moveTail(head, tail);
      j++;
    }
    i++;
  }
  return tail.trace.length;
};

export const validate2 = (data) => {
  const head = { x: 0, y: 0 };
  const tails = [];
  const nrOfTails = 9;
  let i = 0;
  while (i < nrOfTails) {
    tails.push({ x: 0, y: 0, trace: [] });
    i++;
  }


  i = 0;
  while (i < data.length) {
    const [direction, steps] = data[i].split(" ");
    let j = 0;

    while (j < steps) {
      moveHead(direction, head);
      let k = 1;
      moveTail(head, tails[0]);
      while (k < tails.length) {
        moveTail(tails[k - 1], tails[k]);
        k++;
      }
      j++;
    }
    i++;
  }
  return tails[nrOfTails - 1].trace.length;
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
