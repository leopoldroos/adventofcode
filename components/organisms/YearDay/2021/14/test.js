const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  validate2,
  calculatePolymerStep,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 11", () => {
  // it("validate calculatePolymerStep", () => {
  //   const fileData = loadData("testData.txt");
  //   const { input, map } = prepareData(fileData);
  //   let polymer = calculatePolymerStep({ input, map });
  //   expect(polymer).toEqual("NCNBCHB");
  //   polymer = calculatePolymerStep({ input: polymer, map });
  //   expect(polymer).toEqual("NBCCNBBBCBHCB");
  //   polymer = calculatePolymerStep({ input: polymer, map });
  //   expect(polymer).toEqual("NBBBCNCCNBBNBNBBCHBHHBCHB");
  //   polymer = calculatePolymerStep({ input: polymer, map });
  //   expect(polymer).toEqual(
  //     "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB",
  //   );
  // });
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { input, map } = prepareData(fileData);
  //   const { answer } = validate({ input, map });
  //   expect(answer).toEqual(1588);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { input, map } = prepareData(fileData);
  //   const { answer } = validate({ input, map });
  //   expect(answer).toEqual(2408);
  // });
  // Step 2:
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { input, map } = prepareData(fileData);
    const { answer } = validate2({ input, map });
    expect(answer).toEqual(2188189693529);
  });
  // it("validate myData", () => {
  // });
});
