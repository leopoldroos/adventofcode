import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  const numbers = data[0].split(",").map((t) => parseInt(t, 10));
  const fishes = numbers.map((t, i) => ({
    timer: t,
    number: i,
    isParent: false,
  }));

  return {
    numbers,
    fishes,
  };
};

export const addFishDay = ({ fish }) => {
  let newFish = null;
  if (fish.timer === 0) {
    newFish = { timer: 8, isParent: false };
    fish.timer = 6; // fish.isParent ? 6 : 8;
    fish.isParent = true;
  } else {
    fish.timer -= 1;
  }
  return { fish, newFish };
};

export const validate = ({ fishes, days }) => {
  let i = 0;
  while (i < days) {
    let newFishes = [];
    fishes = fishes.map((fish) => {
      const { fish: updatedFish, newFish } = addFishDay({ fish });
      if (newFish) {
        newFish.number = fishes.length + newFishes.length;
        newFishes.push(newFish);
      }
      return updatedFish;
    });
    if (newFishes.length > 0) {
      fishes = fishes.concat(newFishes);
    }
    i++;
  }

  return {
    fishes,
  };
};

export const validate2 = ({ numbers }) => {
  let fishes = [];

  numbers.forEach((num) => {
    fishes.push({
      total: 1,
      counter: num,
    });
  });
  let i = 0;
  while (i < 256) {
    fishes = fishes.map((fish) => {
      fish.counter -= 1;
      return fish;
    });

    let pushMoreFishes = fishes.filter((fish) => fish.counter < 0);
    fishes = fishes.filter((fish) => fish.counter >= 0);

    if (pushMoreFishes.length) {
      let index = fishes.findIndex((obj) => obj.counter === 6);

      pushMoreFishes.forEach((parentFish) => {
        if (index > -1) {
          fishes[index].total += parentFish.total;
        } else {
          fishes.push({
            counter: 6,
            total: parentFish.total,
          });
        }

        fishes.push({
          counter: 8,
          total: parentFish.total,
        });
      });
    }
    i++;
  }

  let total = fishes.reduce((sum, fish) => sum + fish.total, 0);
  return {
    answer: total,
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
