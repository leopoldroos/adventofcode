import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { removeAllExcept } from "@/helpers/createRegularExpression";
// const fs = require("fs");

export const prepareData = (data) => {
  return data;
};

export const getFirstPosOfIssue = (complexString) => {
  let pos = 0;
  let count = 0;
  while (count < 5 && pos < complexString.length) {
    if (complexString[pos] === "[") {
      count++;
    } else if (complexString[pos] === "]") {
      count--;
    }
    // console.log({ pos, char: complexString[pos], count });
    pos++;
  }
  return count === 5 ? pos - 1 : undefined;
};

export const getFirstPosOfLargeValueIssue = (complexString) => {
  const largeValues = complexString.match(/\d+/g).filter((v) => v.length > 1);
  if (largeValues.length > 0) {
    // console.log("LArge values:", { complexString, value: largeValues[0] });
    return {
      pos: complexString.indexOf(largeValues[0]),
      value: parseInt(largeValues[0], 10),
      length: largeValues[0].length,
    };
  }
  return null;
};

export const getPartialComplexString = (complexString, startPos) => {
  const restOfComplexString = complexString.substr(startPos);
  // const closingPos = restOfComplexString.indexOf("]");
  let nrOfHakar = 1;
  let i = 1;
  while (nrOfHakar > 0 && i < restOfComplexString.length) {
    if (restOfComplexString[i] === "[") {
      nrOfHakar++;
    } else if (restOfComplexString[i] === "]") {
      nrOfHakar--;
    }
    i++;
  }
  const closingPos = i - 1;
  const endPos = startPos + closingPos;
  return {
    partialComplexString: complexString.substr(startPos, closingPos + 1),
    endPos,
  };
};

export const getPartialComplexPair = (complexPair, startPos) => {
  const { partialComplexString, endPos } = getPartialComplexString(
    complexPair,
    startPos,
  );
  return {
    partialComplextPair: partialComplexString
      .replace(removeAllExcept("0-9,"), "")
      .split(",")
      .map((v) => parseInt(v, 10)),
    endPos,
  };
};

export const addInLeftDirection = (complexString, value) => {
  const valuesToTheLeft = complexString.match(/\d+/g);
  if (valuesToTheLeft) {
    const nextValue = valuesToTheLeft.pop();
    const startPosValue = complexString.lastIndexOf(nextValue);
    const endPosValue = startPosValue + nextValue.toString().length;
    return `${complexString.substr(0, startPosValue)}${
      parseInt(nextValue, 10) + value
    }${complexString.substr(endPosValue)}`;
  }
  return complexString;
};

export const addInRightDirection = (complexString, value) => {
  const valuesToTheRight = complexString.match(/\d+/g);
  if (valuesToTheRight) {
    const nextValue = valuesToTheRight[0];
    const startPosValue = complexString.indexOf(nextValue);
    const endPosValue = startPosValue + nextValue.toString().length;
    return `${complexString.substr(0, startPosValue)}${
      parseInt(nextValue, 10) + value
    }${complexString.substr(endPosValue)}`;
  }
  return complexString;
};

export const buildUpAdditionString = (
  complexString,
  partialComplextPair,
  startPos,
  endPos,
) => {
  const leftPart = addInLeftDirection(
    complexString.substr(0, startPos),
    partialComplextPair[0],
  );
  const rightPart = addInRightDirection(
    complexString.substr(endPos + 1),
    partialComplextPair[1],
  );
  return `${leftPart}0${rightPart}`;
};

export const reduceHakar = (complexString, startPos) => {
  const { partialComplextPair, endPos } = getPartialComplexPair(
    complexString,
    startPos,
  );
  complexString = buildUpAdditionString(
    complexString,
    partialComplextPair,
    startPos,
    endPos,
  );

  return complexString;
};

export const reduceHakarUntilDone = (complexString) => {
  let firstPosOfIssue = getFirstPosOfIssue(complexString);
  while (firstPosOfIssue) {
    const { partialComplextPair, endPos } = getPartialComplexPair(
      complexString,
      firstPosOfIssue,
    );
    complexString = buildUpAdditionString(
      complexString,
      partialComplextPair,
      firstPosOfIssue,
      endPos,
    );

    firstPosOfIssue = getFirstPosOfIssue(complexString);
  }

  return complexString;
};

export const reduceLargeValue = (complexString, pos, length, value) => {
  const leftValue = Math.floor(value / 2);
  const rightValue = Math.ceil(value / 2);
  const newPairString = `[${leftValue},${rightValue}]`;
  complexString = `${complexString.substr(
    0,
    pos,
  )}${newPairString}${complexString.substr(pos + length)}`;

  return complexString;
};

export const reduceLargeValuesUntilDone = (complexString) => {
  let {
    pos: firstPosOfIssue,
    length: lengthOfIssue,
    value: valueOfIssue,
  } = getFirstPosOfLargeValueIssue(complexString) || {};
  while (firstPosOfIssue > -1) {
    const leftValue = Math.floor(valueOfIssue / 2);
    const rightValue = Math.ceil(valueOfIssue / 2);
    const newPairString = `[${leftValue},${rightValue}]`;
    complexString = `${complexString.substr(
      0,
      firstPosOfIssue,
    )}${newPairString}${complexString.substr(firstPosOfIssue + lengthOfIssue)}`;

    const { pos, length, value } =
      getFirstPosOfLargeValueIssue(complexString) || {};
    firstPosOfIssue = pos;
    lengthOfIssue = length;
    valueOfIssue = value;
  }

  return complexString;
};

export const reduceUntilDone = (complexString) => {
  let done = false;
  while (!done) {
    let firstPosOfHakIssue = getFirstPosOfIssue(complexString);

    let {
      pos: firstPosOfLargeValueIssue,
      length: lengthOfIssue,
      value: valueOfIssue,
    } = getFirstPosOfLargeValueIssue(complexString) || {};
    if (firstPosOfHakIssue) {
      complexString = reduceHakarUntilDone(complexString);
    } else if (firstPosOfLargeValueIssue) {
      complexString = reduceLargeValue(
        complexString,
        firstPosOfLargeValueIssue,
        lengthOfIssue,
        valueOfIssue,
      );
    } else {
      done = true;
    }
  }

  return complexString;
};

export const combineComplexStrings = (str1, str2) => {
  return `[${str1},${str2}]`;
};

export const combineAndReduceComplexStrings = (str1, str2) => {
  return reduceUntilDone(combineComplexStrings(str1, str2));
};

export const calculateMagnitude = (complexString) => {
  let done = false;
  while (!done) {
    let pos = complexString.match(/\[\d+,\d+\]/g);
    let i = 0;
    if (!pos) {
      done = true;
    } else {
      while (i < pos.length) {
        const pair = pos[i];
        const [leftValue, rightValue] = pair
          .replace(removeAllExcept("0-9,"), "")
          .split(",")
          .map((v) => parseInt(v, 10));
        const newValue = leftValue * 3 + 2 * rightValue;
        // console.log({ pair, newValue, complexString });

        const pairStartPos = complexString.indexOf(pair);
        const pairEndPos = pairStartPos + pair.length;
        complexString = `${complexString.substr(
          0,
          pairStartPos,
        )}${newValue}${complexString.substr(pairEndPos)}`;
        i++;
      }
    }
  }
  // console.log({ magnitude: parseInt(complexString, 10) });
  return parseInt(complexString, 10);
};

export const validate = (strings) => {
  let complexString = strings[0];
  let i = 1;
  while (i < strings.length) {
    complexString = combineAndReduceComplexStrings(complexString, strings[i]);
    i++;
  }
  return { complexString, answer: calculateMagnitude(complexString) };
};

export const validate2 = (strings) => {
  let complexString = strings[0];
  let highestMagnitude = 0;
  let maxPair;
  let i = 0;
  while (i < strings.length) {
    let j = 0;
    while (j < strings.length) {
      if (i !== j) {
        let complexString = combineAndReduceComplexStrings(
          strings[i],
          strings[j],
        );
        let magnitude = calculateMagnitude(complexString);
        if (magnitude > highestMagnitude) {
          maxPair = [strings[i], strings[j]];
          highestMagnitude = magnitude;

          // console.log({ maxPair, highestMagnitude });
        }

        complexString = combineAndReduceComplexStrings(strings[j], strings[i]);
        magnitude = calculateMagnitude(complexString);
        if (magnitude > highestMagnitude) {
          maxPair = [strings[j], strings[i]];
          highestMagnitude = magnitude;

          // console.log({ maxPair, highestMagnitude });
        }
      }
      j++;
    }
    i++;
  }
  return { maxPair, answer: highestMagnitude };
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
