import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  return data.map(row => row.split(",").map(range => range.split("-").map(v => parseInt(v))));
}

export const executeMoveAction = (state, amount, from, to) => {
  let i = 0;
  while (i < amount && i < 1000) {
    const crate = state[from].pop();
    state[to].push(crate);
    i++;
  }
  return state;
}

export const executeV2MoveAction = (state, amount, from, to) => {
  const crates = state[from].splice(state[from].length - amount);
  state[to] = state[to].concat(crates);
  return state;
}

export const validate = (data) => {
  let state = data[0];
  let i = 1;
  while (i < data.length && i < 10000) {
    const [_move, amount, _from, from, _to, to] = data[i];
    state = executeMoveAction(state, amount, from - 1, to - 1);
    i++;
  }
  return state.map(stack => stack.pop()).join("");
};

export const validate2 = (data) => {
  let state = data[0];
  let i = 1;
  while (i < data.length && i < 10000) {
    const [_move, amount, _from, from, _to, to] = data[i];
    state = executeV2MoveAction(state, amount, from - 1, to - 1);
    i++;
  }
  return state.map(stack => stack.pop()).join("");
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
