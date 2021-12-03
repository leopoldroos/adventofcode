const path = require("path");
const fs = require("fs");
import { validate, validate2, prepareData, prepareData2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day4", () => {
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const preppedData = prepareData(fileData);
    expect(preppedData.flippedArray.length).toEqual(5);
    const {
      mostCommonBits,
      gammaBinary,
      gammaDecimal,
      epsilonBinary,
      epsilonDecimal,
      answer,
    } = validate(preppedData);
    expect(mostCommonBits[0]).toEqual(1);
    expect(mostCommonBits[1]).toEqual(0);
    expect(mostCommonBits[2]).toEqual(1);
    expect(mostCommonBits[3]).toEqual(1);
    expect(mostCommonBits[4]).toEqual(0);
    expect(gammaBinary).toEqual("10110");
    expect(gammaDecimal).toEqual(22);
    expect(epsilonBinary).toEqual("01001");
    expect(epsilonDecimal).toEqual(9);
    expect(answer).toEqual(198);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const preppedData = prepareData(fileData);
    const { answer } = validate(preppedData);
    expect(answer).toEqual(3923414);
  });

  // Step 2:
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const {
      oxygenBinary,
      oxygenDecimal,
      coBinary,
      coDecimal,
      answer,
    } = validate2(fileData);
    expect(oxygenBinary).toEqual("10111");
    expect(oxygenDecimal).toEqual(23);
    expect(coBinary).toEqual("01010");
    expect(coDecimal).toEqual(10);
    expect(answer).toEqual(230);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { answer } = validate2(fileData);
    expect(answer).toEqual(5852595);
  });
});
