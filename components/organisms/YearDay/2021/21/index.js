import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { toDecimal } from "@/helpers/converters";

export const getDecFromBinary = (binary) => {
  return toDecimal(binary);
};

export const validate = ({ startPlayer1, startPlayer2 }) => {
  const player1 = {
    throw: 0,
    score: 0,
    pos: startPlayer1,
  };
  const player2 = {
    throw: 0,
    score: 0,
    pos: startPlayer2,
  };
  const throwDice = (nrOfThrows) => {
    return nrOfThrows + 1;
  };
  let turn = 0;
  let nrOfThrows = 0;
  const nrOfThrowsPerPlayer = 3;
  let done = false;
  while (!done) {
    let player1Turn = 0;
    while (!done && player1Turn < nrOfThrowsPerPlayer) {
      const steps = throwDice(nrOfThrows);
      player1.pos = ((player1.pos + steps - 1) % 10) + 1;
      player1.throw++;
      player1Turn++;
      nrOfThrows++;
    }
    player1.score += player1.pos;
    if (player1.score >= 1000) {
      done = true;
    }

    if (!done) {
      let player2Turn = 0;
      while (!done && player2Turn < nrOfThrowsPerPlayer) {
        const steps = throwDice(nrOfThrows);
        player2.pos = ((player2.pos + steps - 1) % 10) + 1;
        player2.throw++;
        player2Turn++;
        nrOfThrows++;
      }
      player2.score += player2.pos;
      if (player2.score >= 1000) {
        done = true;
      }
    }

    turn++;
    // console.log(player1, player2);
  }
  console.log(player1, player2, { nrOfThrows, turn });
  return { answer: nrOfThrows * Math.min(player1.score, player2.score) };
};

const updatePlayer = (player, steps) => {
  return player;
};

const dimensionDice = () => {
  // 3^3 -> 27 outcomes per player and turn

  // #1:
  // [1,2,3]

  // #2:
  // [2,3,4]
  // [3,3,4]
  // [4,3,4]

  // [2,4,4]
  // [3,4,4]
  // [4,4,4]

  // [2,5,4]
  // [3,5,4]
  // [4,5,4]

  // [2,3,5]
  // [3,3,5]
  // [4,3,5]

  // [2,4,5]
  // [3,4,5]
  // [4,4,5]

  // [2,5,5]
  // [3,5,5]
  // [4,5,5]

  // [2,3,6]
  // [3,3,6]
  // [4,3,6]

  // [2,4,6]
  // [3,4,6]
  // [4,4,6]

  // [2,5,6]
  // [3,5,6]
  // [4,5,6]
  return [1, 2, 3];
};

export const validate2 = ({ startPlayer1, startPlayer2 }) => {
  const player1 = {
    throw: 0,
    score: 0,
    pos: startPlayer1,
  };
  const player2 = {
    throw: 0,
    score: 0,
    pos: startPlayer2,
  };
  const throwDice = (nrOfThrows) => {
    return nrOfThrows + 1;
  };
  let turn = 0;
  let nrOfThrows = 0;
  const nrOfThrowsPerPlayer = 3;
  let done = false;
  while (!done) {
    let player1Turn = 0;
    while (!done && player1Turn < nrOfThrowsPerPlayer) {
      const steps = throwDice(nrOfThrows);
      player1.pos = ((player1.pos + steps - 1) % 10) + 1;
      player1.throw++;
      player1Turn++;
      nrOfThrows++;
    }
    player1.score += player1.pos;
    if (player1.score >= 21) {
      done = true;
    }

    if (!done) {
      let player2Turn = 0;
      while (!done && player2Turn < nrOfThrowsPerPlayer) {
        const steps = throwDice(nrOfThrows);
        player2.pos = ((player2.pos + steps - 1) % 10) + 1;
        player2.throw++;
        player2Turn++;
        nrOfThrows++;
      }
      player2.score += player2.pos;
      if (player2.score >= 21) {
        done = true;
      }
    }

    turn++;
    // console.log(player1, player2);
  }
  console.log(player1, player2, { nrOfThrows, turn });
  return { answer: nrOfThrows * Math.min(player1.score, player2.score) };
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
