import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => data.map((d) => parseInt(d, 10));

const getScore = (elf, my) => {
  const scorePerWhat = {
    A: 1, // "rock"
    B: 2, // "paper"
    C: 3, // "scissor"
    X: 1,// "rock"
    Y: 2,// "paper"
    Z: 3,// "scissor"
  }
  const names = {
    A: "rock",
    B: "paper",
    C: "scissor",
    X: "rock",
    Y: "paper",
    Z: "scissor"
  }
  const scorePerState = {
    win: 6,
    draw: 3,
    lost: 0,
  }
  let state = "win";
  if (scorePerWhat[elf] === scorePerWhat[my]) {
    state = "draw";
  } else if ((elf === "A" && my === "Z") || (elf === "B" && my === "X") || (elf === "C" && my === "Y")) {
    state = "lost";
  }
  const stateScore = scorePerState[state];
  return stateScore ? (scorePerWhat[my] + scorePerState[state]) : scorePerWhat[my];
}

const getScore2 = (elf, my) => {
  const names = {
    A: "rock",
    B: "paper",
    C: "scissor",
  }
  const states = {
    X: "lost",
    Y: "draw",
    Z: "win"
  }
  const namesToScore = {
    "rock": 1,
    "paper": 2,
    "scissor": 3,
  }
  const scorePerState = {
    win: 6,
    draw: 3,
    lost: 0,
  }
  const elfSelected = names[elf];
  const forcedState = states[my];

  let mySelected = elfSelected;
  if (forcedState === "lost") {
    switch (elfSelected) {
      case "rock":
        mySelected = "scissor";
        break;
      case "paper":
        mySelected = "rock";
        break;
      case "scissor":
        mySelected = "paper";
        break;
    }
  } else if (forcedState === "win") {
    switch (elfSelected) {
      case "rock":
        mySelected = "paper";
        break;
      case "paper":
        mySelected = "scissor";
        break;
      case "scissor":
        mySelected = "rock";
        break;
    }
  }
  const stateScore = scorePerState[forcedState];
  return stateScore + namesToScore[mySelected];
}

export const validate = (data) => {
  const score = data.reduce((result, turn) => {
    const [elf, my] = turn.split(" ");
    const turnScore = getScore(elf, my);
    return result + turnScore;
  }, 0);
  return score;
};

export const validate2 = (data) => {
  const score = data.reduce((result, turn) => {
    const [elf, my] = turn.split(" ");
    const turnScore = getScore2(elf, my);
    return result + turnScore;
  }, 0);
  return score;
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
