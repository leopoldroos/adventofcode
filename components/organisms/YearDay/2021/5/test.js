const path = require("path");
const fs = require("fs");
import { validate, validate2, prepareData, prepareData2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 5", () => {
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { boards, numbers } = prepareData(fileData);
    expect(boards.length).toEqual(3);
    expect(numbers.length).toEqual(27);
    expect(boards[0].boardSum).toEqual(300);
    const { answer, bingo } = validate({ boards, numbers });
    expect(bingo).toEqual([4, 17, 14, 21, 24]);
    expect(answer).toEqual(4512);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { boards, numbers } = prepareData(fileData);
    const { answer } = validate({ boards, numbers });
    expect(answer).toEqual(69579);
  });

  // Step 2:
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { boards, numbers } = prepareData(fileData);
    const { answer } = validate2({ boards, numbers });
    expect(answer).toEqual(1924);
  });
  it("validate testData", () => {
    const fileData = loadData("myData.txt");
    const { boards, numbers } = prepareData(fileData);
    const { answer } = validate2({ boards, numbers });
    expect(answer).toEqual(14877);
  });
});
