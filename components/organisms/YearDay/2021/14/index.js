import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  const prepData = { input: data[0] };
  const map = {};
  data.splice(2, data.length - 1).forEach((row) => {
    const parts = row.split(" -> ");
    map[parts[0]] = parts[1];
  });
  prepData.map = map;
  return prepData;
};

export const calculatePolymerStep = ({ input, map }) => {
  let polymer = "";
  let i = 0;
  while (i < input.length - 1) {
    const firstLetter = input[i];
    const secondLetter = input[i + 1];
    polymer = `${polymer}${i === 0 ? firstLetter : ""}${
      map[`${firstLetter}${secondLetter}`]
    }${secondLetter}`;

    i++;
  }
  // console.log(polymer);
  return polymer;
};

export const validate = ({ input, map }) => {
  let i = 0;
  let polymer = input;
  while (i < 10) {
    polymer = calculatePolymerStep({ input: polymer, map });
    i++;
  }
  const letters = {};
  polymer.split("").forEach((letter) => {
    if (!letters[letter]) {
      letters[letter] = 0;
    }
    letters[letter]++;
  });
  let values = Object.keys(letters).map((l) => ({
    letter: l,
    count: letters[l],
  }));
  values.sort((a, b) => a.count - b.count);
  return { answer: values[values.length - 1].count - values[0].count };
};

export const validate2 = ({ input, map }) => {
  let i = 0;
  let polymer = input;
  while (i < 40) {
    polymer = calculatePolymerStep({ input: polymer, map });
    i++;
  }
  const letters = {};
  polymer.split("").forEach((letter) => {
    if (!letters[letter]) {
      letters[letter] = 0;
    }
    letters[letter]++;
  });
  let values = Object.keys(letters).map((l) => ({
    letter: l,
    count: letters[l],
  }));
  values.sort((a, b) => a.count - b.count);
  return { answer: values[values.length - 1].count - values[0].count };
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
