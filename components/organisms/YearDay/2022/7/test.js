import { validate, validate2, prepareData, isFullyOverLapped, isPartiallyOrFullyOverLapped } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  it("validate testData", () => {
    const { tree, answerA } = prepareData(testData);
    expect(answerA).toEqual(95437);
  });
  xit("validate myData", () => {
    const { tree, answerA } = prepareData(myData);
    expect(answerA).toEqual(1667443);
  });
  xit("validate2 testData", () => {
    const { tree, answerA } = prepareData(testData);
    expect(validate2(tree)).toEqual(24933642);
  });
  xit("validate2 myData", () => {
    const { tree, answerA } = prepareData(myData);
    expect(validate2(tree)).toEqual(8998590);
  });
});
