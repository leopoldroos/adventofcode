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

export const validate = ({ allOutputValues }) => {
  const lengthsToCount = [2, 3, 4, 7];
  const answer = allOutputValues.reduce((sum, outputValues) => {
    // console.log(
    //   outputValues.filter((outputValue) =>
    //     lengthsToCount.includes(outputValue.length),
    //   ),
    // );
    return (
      sum +
      outputValues.filter((outputValue) =>
        lengthsToCount.includes(outputValue.length),
      ).length
    );
  }, 0);
  return { answer };
};

export const getUnmatchedString = (string1, string2) => {
  const string1letters = string1.split("");
  const string2Unique = string2
    .split("")
    .filter((l) => !string1letters.includes(l));

  const string2letters = string2.split("");
  const string1Unique = string1
    .split("")
    .filter((l) => !string2letters.includes(l));

  return string1Unique.concat(string2Unique).join("");
};

export const filterString = (stringToFilter, filter) => {
  const letters = filter.split("");
  return stringToFilter
    .split("")
    .filter((l) => !letters.includes(l))
    .join("");
};

export const getJoinedString = (string1, string2) => {
  const onlyUnique = (value, index, self) => self.indexOf(value) === index;
  const unique = string1.split("").concat(string2.split("")).filter(onlyUnique);

  return unique.join("");
};

export const decrypt = ({ inputValues, outputValues }) => {
  //  DDDD
  // E    A
  // E    A
  //  FFFF
  // G    B
  // G    B
  //  CCCC

  // unique: 1,4,7,8
  // 5s: 2, 3, 5
  // 6s: 0, 6, 9

  // "7"(DAB) - "1"(AB) => "D". done: "D", "G", "C", "F", "A", "B"

  // "1" har 2 tecken ! AB
  // "7" har 3 tecken ! AB D
  // "4" har 4 tecken ! AB  EF

  //               ->   AB DEF -> negated:  C   G

  // "2" har 5 tecken   A CD FG !
  // "3" har 5 tecken   ABCD F  ! 3 - 4 samt - D = C     3 - 7 - C = F
  // "5" har 5 tecken    BCDEF  !

  // "6" har 6 tecken    BCDEFG
  // "0" har 6 tecken   ABCDE G
  // "9" har 6 tecken   ABCDEF

  // "8" har 7 tecken ! ABCDEFG

  // 2 = "1", 3 = "7", 4 = "4", 7 = "8"
  const one = inputValues.filter((i) => i.length === 2).pop();
  const seven = inputValues.filter((i) => i.length === 3).pop();
  const four = inputValues.filter((i) => i.length === 4).pop();
  const eight = "abcdefg"; // inputValues.filter((i) => i.length === 7).pop();

  const DDD = getUnmatchedString(seven, one);

  const oneFour = getJoinedString(one, four);
  const oneFourSeven = getJoinedString(oneFour, seven);
  const negatedOneFourSeven = getUnmatchedString(oneFourSeven, eight);

  const twoThreeFiveValues = inputValues.filter((i) => i.length === 5);

  const twoIndex = twoThreeFiveValues
    .map((v) => filterString(negatedOneFourSeven, v))
    .indexOf("");
  const two = twoThreeFiveValues[twoIndex];
  const threeFiveValues = twoThreeFiveValues.filter((v, i) => i !== twoIndex);

  const GGG = filterString(
    two,
    getJoinedString(threeFiveValues[0], threeFiveValues[1]),
  );

  const threeFiveFiltered = threeFiveValues.map((v) => filterString(v, one));

  let three;
  let five;
  if (threeFiveFiltered[0].length < threeFiveFiltered[1].length) {
    three = threeFiveValues[0];
    five = threeFiveValues[1];
  } else {
    three = threeFiveValues[1];
    five = threeFiveValues[0];
  }

  const CCC = filterString(filterString(three, four), DDD);

  const FFF = filterString(filterString(three, seven), CCC);

  const AAA = filterString(two, CCC + DDD + FFF + GGG);

  const BBB = filterString(three, AAA + CCC + DDD + FFF);
  const EEE = filterString(five, BBB + CCC + DDD + FFF);

  // console.log(three, twoThreeFiveValues, threeFiveValues, {
  //   AAA,
  //   BBB,
  //   CCC,
  //   DDD,
  //   EEE,
  //   FFF,
  //   GGG,
  // });

  // "0" ABCDE G
  // "1" AB
  // "2" A CD FG
  // "3" ABCD F
  // "4" AB  EF
  // "5" BCDEF
  // "6"  BCDEFG
  // "7" AB D
  // "8" ABCDEFG
  // "9" ABCDEF
  let numbers = [
    AAA + BBB + CCC + DDD + EEE + GGG,
    AAA + BBB,
    AAA + CCC + DDD + FFF + GGG,
    AAA + BBB + CCC + DDD + FFF,
    AAA + BBB + EEE + FFF,
    BBB + CCC + DDD + EEE + FFF,
    BBB + CCC + DDD + EEE + FFF + GGG,
    AAA + BBB + DDD,
    AAA + BBB + CCC + DDD + EEE + FFF + GGG,
    AAA + BBB + CCC + DDD + EEE + FFF,
  ];
  numbers = numbers.map((v) => v.split("").sort().join(""));
  const resultIndexes = outputValues.map((v) =>
    numbers.indexOf(v.split("").sort().join("")),
  );

  const value = resultIndexes.reduce((value, i) => {
    return `${value}${i}`;
  }, "");

  return parseInt(value, 10);
};

export const validate2 = ({ values }) => {
  const answer = values.reduce((sum, val) => {
    return sum + decrypt(val);
  }, 0);
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
