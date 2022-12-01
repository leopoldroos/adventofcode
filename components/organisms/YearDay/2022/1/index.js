import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => data.map((d) => parseInt(d, 10));

const splitToGroups = (data) => {
  const groups = [];
  let groupIndex = 0;
  data.forEach((d => {
    if ((groups.length - 1) < groupIndex) {
      groups.push(0);
    }

    if (d > 0) {
      groups[groupIndex] += d;
    } else {
      groupIndex++;
    }

  }));
  return groups;
}

export const validate = (data) => {
  const groups = splitToGroups(data);
  const sortedGroups = groups.sort((a, b) => b - a);
  return sortedGroups[0];
};

export const validate2 = (data) => {
  const groups = splitToGroups(data);
  const sortedGroups = groups.sort((a, b) => b - a);
  return sortedGroups[0] + sortedGroups[1] + sortedGroups[2]
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
