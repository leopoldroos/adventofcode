import { validate, validate2, prepareData, isFullyOverLapped, isPartiallyOrFullyOverLapped } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  xit("validate testData", () => {
    expect(validate(testData)).toEqual("CMZ");
  });
  xit("validate myData", () => {
    expect(validate(myData)).toEqual("FWNSHLDNZ");
  });
  xit("validate2 testData", () => {
    expect(validate2(testData)).toEqual("MCD");
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual("RNRGDNFQG");
  });
});
