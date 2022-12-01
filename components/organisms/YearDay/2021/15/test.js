const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  validate2,
  sortXYPair,
  foldY,
  foldX,
  logAnswer,
  printLine,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 15", () => {
  it("validate prepareData", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // expect(prepData.folds.length).toEqual(2);
    // expect(prepData.folds[0].value).toEqual(7);
    // expect(prepData.folds[0].direction).toEqual("y");
    // expect(prepData.folds[1].value).toEqual(5);
    // expect(prepData.folds[1].direction).toEqual("x");
    // expect(prepData.map.length).toEqual(14);
    // expect(prepData.map[0].length).toEqual(10);
  });

  it("validate sortXYPair", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // const pairs = [...prepData.pos];
    // sortXYPair(pairs, 0); // 0 = "x"
    // expect(pairs[0][0]).toEqual(0);
    // expect(pairs[17][0]).toEqual(10);
    // sortXYPair(pairs, 1); // 1 = "y"
    // expect(pairs[0][1]).toEqual(0);
    // expect(pairs[17][1]).toEqual(14);
  });
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const prepData = prepareData(fileData);
    const { answer } = validate(prepData);
    expect(answer).toEqual(40);
  });

  it("validate myData", () => {
    // const fileData = loadData("myData.txt");
    // const prepData = prepareData(fileData);
    // const pairs = [...prepData.pos];
    // const newPairs = foldX(pairs, 655);
    // expect(newPairs.length).toEqual(755);
  });
  // Step 2:
  // it("validate testData", () => {
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const prepData = prepareData(fileData);
  //   const { answer } = validate(prepData);
  //   logAnswer(answer);
  //   expect(1).toEqual(1); // Consol.logs "BLKJRBAG"
  // });
});
