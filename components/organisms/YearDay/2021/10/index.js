import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  const values = data.map((row) => {
    const [inputValues, outputValues] = row
      .split(" | ")
      .map((s) => s.split(" "));
    return { inputValues, outputValues };
  });
  return {
    values,
    allOutputValues: values.map(({ outputValues }) => outputValues),
  };
};

export const getCorruptChar = (line) => {
  const letters = line.split("");
  let corrupt = false;
  let i = 0;
  const startSegments = ["(", "[", "{", "<"];
  const endSegments = [")", "]", "}", ">"];
  let previousLetters = [];
  while (!corrupt && i < line.length) {
    const letter = line[i];
    let previousLetter = previousLetters[previousLetters.length - 1];

    const letterInStartIndex = startSegments.indexOf(letter);
    const letterInEndIndex = endSegments.indexOf(letter);
    const previousLetterInStartIndex = startSegments.indexOf(previousLetter);
    const previousLetterInEndIndex = endSegments.indexOf(previousLetter);
    // Corrupt:
    // (], <}
    // Ok:
    // >(, {(
    // [<>({}){}[([])<>]]

    // current is end:
    if (letterInEndIndex !== -1) {
      if (letterInEndIndex !== previousLetterInStartIndex) {
        corrupt = letter;
      } else {
        previousLetters.pop();
      }
    }
    // previous is end, current is end:
    // else if (previousLetterInEndIndex !== -1 && letterInEndIndex !== -1) {
    //   if (letterInEndIndex !== previousLetterInStartIndex) {
    //     corrupt = true;
    //   } else {
    //     previousLetters.pop();
    //   }
    // }
    else {
      previousLetters.push(letter);
    }

    i++;
  }
  return corrupt;
};

export const getClosingChars = (line) => {
  const letters = line.split("");
  let i = 0;
  const startSegments = ["(", "[", "{", "<"];
  const endSegments = [")", "]", "}", ">"];
  let previousLetters = [];
  while (i < line.length) {
    const letter = line[i];
    let previousLetter = previousLetters[previousLetters.length - 1];

    const letterInStartIndex = startSegments.indexOf(letter);
    const letterInEndIndex = endSegments.indexOf(letter);
    const previousLetterInStartIndex = startSegments.indexOf(previousLetter);
    const previousLetterInEndIndex = endSegments.indexOf(previousLetter);
    // current is end:
    if (letterInEndIndex !== -1) {
      previousLetters.pop();
    } else {
      previousLetters.push(letter);
    }

    i++;
  }
  return previousLetters
    .reverse()
    .map((l) => endSegments[startSegments.indexOf(l)])
    .join("");
};

export const validate = (lines) => {
  const scores = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  const answer = lines.reduce((sum, line) => {
    const invalidChar = getCorruptChar(line);
    if (!invalidChar) {
      return sum;
    }
    return sum + scores[invalidChar];
  }, 0);
  return { answer };
};

export const getScore = (closingChars) => {
  const scores = { ")": 1, "]": 2, "}": 3, ">": 4 };
  return closingChars.split("").reduce((sum, char) => {
    return sum * 5 + scores[char];
  }, 0);
};

export const validate2 = (lines) => {
  const incomplete = lines.filter((l) => !getCorruptChar(l));
  const scores = incomplete.map((line) => getScore(getClosingChars(line)));
  scores.sort((a, b) => a - b);
  const answer = scores[(scores.length - 1) / 2]; // scores.length%2 ? scores[(scores.length-1)/2] :
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
