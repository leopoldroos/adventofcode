import { validate, validate2, prepareData, isFullyOverLapped, isPartiallyOrFullyOverLapped } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  it("prepareData", () => {
    expect(prepareData(["0-10,2-8"])).toEqual([[[0, 10], [2, 8]]]);
  });
  it("isFullyOverLapped", () => {
    expect(isFullyOverLapped([0, 10], [2, 8])).toEqual(true);
    expect(isFullyOverLapped([2, 8], [0, 10])).toEqual(true);
    expect(isFullyOverLapped([10, 10], [0, 10])).toEqual(true);
    expect(isFullyOverLapped([0, 0], [0, 10])).toEqual(true);
    expect(isFullyOverLapped([2, 11], [0, 10])).toEqual(false);
    expect(isFullyOverLapped([12, 12], [0, 10])).toEqual(false);
    expect(isFullyOverLapped([10, 12], [10, 13])).toEqual(true);
    expect(isFullyOverLapped([9, 12], [10, 13])).toEqual(false);
    expect(isFullyOverLapped([6, 6], [4, 6])).toEqual(true);
  });
  xit("validate testData", () => {
    expect(validate(testData)).toEqual(2);
  });
  xit("validate myData", () => {
    expect(validate(myData)).toEqual(599);
  });
  it("isPartiallyOrFullyOverLapped", () => {
    expect(isPartiallyOrFullyOverLapped([0, 10], [8, 12])).toEqual(true);
    expect(isPartiallyOrFullyOverLapped([0, 10], [10, 10])).toEqual(true);
    expect(isPartiallyOrFullyOverLapped([0, 10], [11, 11])).toEqual(false);
  });
  it("validate2 testData", () => {
    expect(validate2(testData)).toEqual(4);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(928);
  });
});
