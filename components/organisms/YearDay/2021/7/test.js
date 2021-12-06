const path = require("path");
const fs = require("fs");
import { validate, validate2, prepareData, prepareData2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 6", () => {
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { lines, maxX, maxY } = prepareData(fileData);
    const { answer } = validate({ lines, maxX, maxY });
    expect(answer).toEqual(5);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { lines, maxX, maxY } = prepareData(fileData);
    const { answer } = validate({ lines, maxX, maxY });
    expect(answer).toEqual(5576);
  });

  // Step 2:
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { lines, maxX, maxY } = prepareData(fileData);
    const { answer } = validate2({ lines, maxX, maxY });
    expect(answer).toEqual(12);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { lines, maxX, maxY } = prepareData(fileData);
    const { answer } = validate2({ lines, maxX, maxY });
    expect(answer).toEqual(18144);
  });
});
