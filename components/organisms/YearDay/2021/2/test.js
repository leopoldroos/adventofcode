const path = require("path");
const fs = require("fs");
import { validate, prepareData, prepareData2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day2", () => {
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    expect(fileData.length).toEqual(6);
    const preppedData = prepareData(fileData);
    expect(validate(preppedData)).toEqual(150);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const preppedData = prepareData(fileData);
    expect(validate(preppedData)).toEqual(2039256);
  });

  // Step 2:
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const preppedData = prepareData2(fileData);
    expect(validate(preppedData)).toEqual(900);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const preppedData = prepareData2(fileData);
    expect(validate(preppedData)).toEqual(18564597360);
  });
});
