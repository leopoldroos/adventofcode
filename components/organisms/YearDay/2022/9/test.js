import { validate, validate2, prepareData, flip, countLowerTreesBack } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";
import testData2 from "./testData2.json";

describe("day9", () => {
  xit("validate testData", () => {
    expect(validate(testData)).toEqual(13);
  });
  xit("validate myData", () => {
    expect(validate(myData)).toEqual(5907);
  });
  xit("validate2 testData", () => {
    expect(validate2(testData)).toEqual(1);
    expect(validate2(testData2)).toEqual(36);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(2303);
  });
});
