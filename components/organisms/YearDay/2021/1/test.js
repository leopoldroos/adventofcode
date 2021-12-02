import { validate, validate2, prepareData } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  it("validate testData", () => {
    expect(validate(testData)).toEqual(7);
  });
  it("validate myData", () => {
    // const prepData = prepareData(myData);
    expect(validate(myData)).toEqual(1688);
  });
  it("validate2 testData", () => {
    expect(validate2(testData)).toEqual(5);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(1728);
  });
});
