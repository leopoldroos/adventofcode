const path = require("path");
const fs = require("fs");
import {
  validate,
  validate2,
  prepareData,
  getCorruptChar,
  getClosingChars,
  getScore,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 10", () => {
  // it("validate getCorruptChar", () => {
  //   expect(getCorruptChar("()")).toEqual(false);
  //   expect(getCorruptChar("(>")).toEqual(">");
  //   expect(getCorruptChar("[<>({}){}[([])<>]]")).toEqual(false);
  //   expect(getCorruptChar("<([]){()}[{}])")).toEqual(")");
  // });

  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { answer } = validate(fileData);
  //   expect(answer).toEqual(26397);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { answer } = validate(fileData);
  //   expect(answer).toEqual(374061);
  // });

  // Step 2:
  // it("validate getClosingChars", () => {
  //   expect(getClosingChars("<(")).toEqual(")>");
  //   expect(getClosingChars("[({(<(())[]>[[{[]{<()<>>")).toEqual("}}]])})]");
  //   expect(getClosingChars("<{([{{}}[<[[[<>{}]]]>[]]")).toEqual("])}>");
  // });
  it("validate getScore", () => {
    expect(getScore("}}]])})]")).toEqual(288957);
  });
  it("validate testData", () => {
    // const fileData = loadData("testData.txt");
    // const { answer } = validate2(fileData);
    // expect(answer).toEqual(288957);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { answer } = validate2(fileData);
    expect(answer).toEqual(2116639949);
  });
});
