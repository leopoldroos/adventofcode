import { validate, validate2, prepareData, isFullyOverLapped, isPartiallyOrFullyOverLapped } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  xit("validate testData", () => {
    expect(validate(testData[0])).toEqual(7);
    expect(validate(testData[1])).toEqual(5);
    expect(validate(testData[2])).toEqual(6);
    expect(validate(testData[3])).toEqual(10);
    expect(validate(testData[4])).toEqual(11);
  });
  xit("validate myData", () => {
    expect(validate(myData[0])).toEqual();
  });
  xit("validate2 testData", () => {
    expect(validate2(testData[0])).toEqual(19);
    expect(validate2(testData[1])).toEqual(23);
    expect(validate2(testData[2])).toEqual(23);
    expect(validate2(testData[3])).toEqual(29);
    expect(validate2(testData[4])).toEqual(26);
  });
  it("validate2 myData", () => {
    expect(validate2(myData[0])).toEqual(2334);
  });
});
