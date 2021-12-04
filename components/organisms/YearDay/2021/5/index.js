import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  const numbers = data
    .shift()
    .split(",")
    .map((n) => parseInt(n, 10));
  const boards = [];
  let i = -1;

  data.forEach((line) => {
    if (line.length === 0) {
      boards.push({ rows: [], rowsMatch: [], foundNumbers: [], boardSum: 0 });
      i++;
    } else {
      const row = line
        .split(" ")
        .filter((n) => n !== "")
        .map((n) => parseInt(n, 10));

      boards[i].boardSum += row.reduce((a, b) => a + b, 0);
      boards[i].rows.push(row);
      boards[i].rowsMatch.push([]);

      if (!boards[i].columns) {
        boards[i].columns = [...new Array(row.length)].map(() => []);
        boards[i].columnsMatch = [...new Array(row.length)].map(() => []);
      }
      row.forEach((r, columnIndex) => {
        boards[i].columns[columnIndex].push(r);
      });
    }
  });

  return { numbers, boards };
};

export const validate = ({ numbers, boards }) => {
  let answer;
  let bingo;
  while (!bingo && numbers.length > 0) {
    let number = numbers.shift();
    boards.some((board, boardIndex) => {
      let found = false;
      let i = 0;
      const { rows, rowsMatch, columnsMatch } = board;
      while (!found && i < rows.length) {
        const foundRowIndex = rows[i].indexOf(number);
        if (foundRowIndex !== -1) {
          board.foundNumbers.push(number);
          rowsMatch[i].push(number);
          if (rowsMatch[i].length === rows[i].length) {
            bingo = rowsMatch[i];
          }
          columnsMatch[foundRowIndex].push(number);
          if (columnsMatch[foundRowIndex].length === rows[i].length) {
            bingo = columnsMatch[foundRowIndex];
          }
          if (bingo) {
            answer =
              (board.boardSum - board.foundNumbers.reduce((a, b) => a + b, 0)) *
              number;

            console.log(board, { answer, boardIndex });
          }
          found = true;
        } else {
          i++;
        }
      }
      return !!bingo;
    });
  }

  return {
    boards,
    bingo,
    answer,
  };
};

export const validate2 = ({ numbers, boards }) => {
  let answer;
  let endLoop = false;
  let boardsLeft = boards;
  while (!endLoop && numbers.length > 0) {
    console.log({ endLoop });

    let number = numbers.shift();
    boardsLeft.forEach((board, boardIndex) => {
      let bingo = null;
      let found = false;
      let i = 0;
      const { rows, rowsMatch, columnsMatch } = board;
      while (!found && i < rows.length) {
        const foundRowIndex = rows[i].indexOf(number);
        if (foundRowIndex !== -1) {
          board.foundNumbers.push(number);
          rowsMatch[i].push(number);
          if (rowsMatch[i].length === rows[i].length) {
            bingo = rowsMatch[i];
          }
          columnsMatch[foundRowIndex].push(number);
          if (columnsMatch[foundRowIndex].length === rows[i].length) {
            bingo = columnsMatch[foundRowIndex];
          }
          if (bingo) {
            board.answer =
              (board.boardSum - board.foundNumbers.reduce((a, b) => a + b, 0)) *
              number;
            // console.log(board, { boardIndex });
          }
          found = true;
        } else {
          i++;
        }
      }
    });
    if (boardsLeft.length === 1 && boardsLeft[0].answer) {
      const board = boardsLeft[0];
      endLoop = true;
      answer = board.answer;
    }
    boardsLeft = [...boardsLeft.filter((b) => !b.answer)];
  }

  return {
    boards: boardsLeft,
    answer,
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
