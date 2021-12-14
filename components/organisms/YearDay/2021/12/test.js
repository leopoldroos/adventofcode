const path = require("path");
const fs = require("fs");
import { prepareData, validate, validate2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 12", () => {
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const caves = prepareData(fileData);
  //   const { answer } = validate(caves);
  //   expect(answer).toEqual(10);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const caves = prepareData(fileData);
  //   const { answer } = validate(caves);
  //   expect(answer).toEqual(4720);
  // });
  // Step 2:
  it("validate testData", () => {
    // const fileData = loadData("testData.txt");
    // const caves = prepareData(fileData);
    // const { answer } = validate2(caves);
    // expect(answer).toEqual(36);
  });
  it("validate testData2", () => {
    // const fileData = loadData("testData2.txt");
    // const caves = prepareData(fileData);
    // const { answer } = validate2(caves);
    // expect(answer).toEqual(103);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const caves = prepareData(fileData);
    const { answer } = validate2(caves);
    expect(answer).toEqual(147848);
  });
});
