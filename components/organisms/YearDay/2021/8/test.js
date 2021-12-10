const path = require("path");
const fs = require("fs");
import {
  validate,
  validate2,
  prepareData,
  filterString,
  getJoinedString,
  getUnmatchedString,
  decrypt,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 8", () => {
  it("validate testData", () => {
    // const fileData = loadData("testData.txt");
    // const { values, allOutputValues } = prepareData(fileData);
    // expect(values.length).toEqual(10);
    // expect(values[0].inputValues.length).toEqual(10);
    // expect(values[0].outputValues.length).toEqual(4);
    // expect(allOutputValues.length).toEqual(10);
    // expect(allOutputValues[0].length).toEqual(4);
    // const { answer } = validate({ allOutputValues });
    // expect(answer).toEqual(26);
  });
  it("validate myData", () => {
    // const fileData = loadData("myData.txt");
    // const { allOutputValues } = prepareData(fileData);
    // const { answer } = validate({ allOutputValues });
    // expect(answer).toEqual(0);
  });

  // Step 2:
  it("validate getUnmatchedString", () => {
    expect(getUnmatchedString("abc", "abcd")).toEqual("d");
    expect(getUnmatchedString("xabcy", "abcxd")).toEqual("yd");
  });
  it("validate getJoinedString", () => {
    expect(getJoinedString("abc", "abcd")).toEqual("abcd");
    expect(getJoinedString("abcg", "abcd")).toEqual("abcgd");
  });
  it("validate filterString", () => {
    expect(filterString("abcd", "abc")).toEqual("d");
    expect(filterString("abcd", "qwea")).toEqual("bcd");
    expect(filterString("af", "fdcge")).toEqual("a");
    expect(filterString("af", "fecdb")).toEqual("a");
    expect(filterString("af", "fabcd")).toEqual("");
  });

  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { values } = prepareData(fileData);
    expect(decrypt(values[0])).toEqual(8394);
    const { answer } = validate2({ values });
    expect(answer).toEqual(61229);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { values } = prepareData(fileData);
    // expect(decrypt(values[0])).toEqual(8394);
    const { answer } = validate2({ values });
    expect(answer).toEqual(1046281);
  });
});
