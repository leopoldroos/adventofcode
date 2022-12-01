import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
// const fs = require("fs");

export const prepareData = (data) => {
  const prepData = {
    actionsLists: [],
  };
  let actionsList;
  let i = 0;
  while (i < data.length) {
    const row = data[i];
    if (row === "inp w") {
      if (i !== 0) {
        prepData.actionsLists.push(actionsList);
      }
      actionsList = [];
    } else {
      actionsList.push(row);
    }
    i++;
  }
  prepData.actionsLists.push(actionsList);
  return prepData;
};
export const inpAction = (input, a) => {
  a = input;
  return a;
};

export const addAction = (a, b) => {
  a += b;
  return a;
};

export const mulAction = (a, b) => {
  a = a * b;
  return a;
};

export const divAction = (a, b) => {
  a = b === 0 ? a : Math.floor(a / b);
  return a;
};

export const modAction = (a, b) => {
  a = a < 0 || b <= 0 ? a : a % b;
  return a;
};

export const eqlAction = (a, b) => {
  a = a === b ? 1 : 0;
  return a;
};

export const replacementAlu = (num) => {
  let x = 0;
  let y = 0;
  let z = 0;
  let w = 0;

  // wxyz
  w = inpAction(num, w); // 1 => 0001 , 2 => 0010, 4 => 0100 etc
  z = addAction(z, w);
  z = modAction(z, 2);

  w = divAction(w, 2);
  y = addAction(y, w);
  y = modAction(y, 2);

  w = divAction(w, 2);
  x = addAction(x, w);
  x = modAction(x, 2);

  w = divAction(w, 2);
  w = modAction(w, 2);
  const byte = `${w}${x}${y}${z}`;
  return byte;
};

const actions = {
  add: addAction,
  mul: mulAction,
  div: divAction,
  mod: modAction,
  eql: eqlAction,
};

export const runActionsList = (input, actionsList) => {
  let wxyz = {
    w: input,
    x: 0,
    y: 0,
    z: 0,
  };

  let i = 0;
  // console.log("Start test: w = " + wxyz.w, { actionsList });
  while (i < actionsList.length) {
    const row = actionsList[i];
    const [action, a, b] = row.split(" ");
    wxyz[a] = actions[action](
      wxyz[a],
      ["w", "x", "y", "z"].includes(b) ? wxyz[b] : parseInt(b, 10),
    );
    i++;
  }
  console.log(wxyz);
  return wxyz;
};

export const validate = (actionsLists) => {
  let validModelNumber = [...new Array(actionsLists.length)];

  let i = 0;
  while (i < actionsLists.length) {
    console.log("NEW NUMBER:----------");
    let numberDone = false;
    let j = 9;
    while (j > 0 && !numberDone) {
      const { z } = runActionsList(j, actionsLists[i]);
      if (z === 0) {
        validModelNumber[i] = j;
        numberDone = true;
      } else {
        validModelNumber[i] = ".";
      }
      j--;
    }
    i++;
  }

  console.log({ validModelNumber });
  return { answer: validModelNumber.join("") };
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
