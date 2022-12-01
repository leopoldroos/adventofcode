import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import { toDecimal } from "@/helpers/converters";
export const prepareData = (data) => {
  const prepData = {
    algorithm: data[0],
    image: data.splice(2),
  };
  return prepData;
};

export const getPixelsForY = ({ yLine, x, padChar }) => {
  let pixels = "";
  if (x - 1 > -1) {
    pixels += yLine[x - 1];
  } else {
    pixels += padChar;
  }
  pixels += yLine[x];
  if (x + 1 < yLine.length) {
    pixels += yLine[x + 1];
  } else {
    pixels += padChar;
  }
  return pixels;
};

export const getSurroundingPixelsAsBinaryLine = ({ image, x, y, step }) => {
  let pixels = "";
  let yLine;
  if (y - 1 > -1) {
    yLine = image[y - 1];
    pixels += getPixelsForY({ yLine, x, padChar: step % 2 ? "#" : "." });
  } else {
    pixels += step % 2 ? "###" : "...";
  }
  yLine = image[y];
  pixels += getPixelsForY({ yLine, x, padChar: step % 2 ? "#" : "." });

  if (y + 1 < image.length) {
    yLine = image[y + 1];
    pixels += getPixelsForY({ yLine, x, padChar: step % 2 ? "#" : "." });
  } else {
    pixels += step % 2 ? "###" : "...";
  }

  return pixels.replace(/\./g, "0").replace(/\#/g, "1");
};

export const addSurroundingBorder = (image, width = 1) => {
  /*

  [. . .]. . . .
  [. . .]. . . .
  [. . #]# # . .
   . . # # # . .
   . . # # # . .
   . . . . . . .
   . . . . . . .


  # . . # .
  #[. . .].
  #[# . .]#
  .[. # .].
  . . # # #

  */
  let i = 0;
  while (i < width) {
    const initXLength = image[0].length;
    image.unshift([...new Array(initXLength)].map((p) => ".").join(""));
    image.push([...new Array(initXLength)].map((p) => ".").join(""));
    image = image.map((yLine) => "." + yLine + ".");
    i++;
  }
  // console.log(image);
  return image;
};

export const getDecFromBinary = (binary) => {
  return toDecimal(binary);
};

export const getEnhancedPixel = ({ algorithm, image, x, y, step }) => {
  const binaryLine = getSurroundingPixelsAsBinaryLine({ image, x, y, step });
  const pos = getDecFromBinary(binaryLine);
  // if (y === 1 && x === 1) {
  // if (pos === 511) {
  //   console.log({ step, pos, binaryLine }, algorithm[pos]);
  // }
  return algorithm[pos];
};

export const countChar = (char, arrayOfChars) => {
  let y = 0;
  let count = 0;
  while (y < arrayOfChars.length) {
    count += arrayOfChars[y].split("").filter((c) => c === char).length;
    y++;
  }
  return count;
};

export const validate = ({ algorithm, image: inputImage, nrOfSteps = 2 }) => {
  let step = 0;
  let image = inputImage;
  // console.log(image);
  image = addSurroundingBorder(image, 100);
  // return { answer: 123 };
  const yLength = image.length;
  const xLength = image[0].length;
  // console.log(image);
  while (step < nrOfSteps) {
    let enhancedImage = [...image];
    let y = 0;
    // console.log(enhancedImage);
    while (y < yLength) {
      let x = 0;
      let newLine = "";
      while (x < xLength) {
        const enhancedPixel = getEnhancedPixel({
          algorithm,
          image,
          x,
          y,
          step,
        });
        newLine += enhancedPixel;
        x++;
      }
      // if (y === 1) {
      //   console.log(image[1], { newLine, step }, step % 2);
      // }
      enhancedImage[y] = step % 2 ? "." + newLine + "." : "#" + newLine + "#";
      y++;
    }
    image = enhancedImage;
    // console.log("image rad0", image[0], { step, y, enhancedImage });
    // console.log(image[1]);
    // console.log(image[2]);

    // console.log(image[Math.ceil(image.length / 2)]);
    // console.log(image[Math.ceil(image.length / 2) + 1]);
    // console.log(image[Math.ceil(image.length / 2) + 2]);
    // console.log(image[Math.ceil(image.length / 2) + 3]);
    // console.log(image[Math.ceil(image.length / 2) + 4]);
    // console.log(image[Math.ceil(image.length / 2) + 5]);

    // console.log(image[image.length - 3]);
    // console.log(image[image.length - 2]);
    // console.log(image[image.length - 1]);
    step++;
  }
  // console.log(step);
  // image.pop()
  // image.pop()
  // console.log("Final:", image);
  return { answer: countChar("#", image), image };
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
