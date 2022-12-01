import { validate, validate2, prepareData } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  it("validate testData", () => {
    expect(validate(testData)).toEqual(24000);
  });
  it("validate myData", () => {
    // const prepData = prepareData(myData);
    expect(validate(myData)).toEqual(69177);
  });
  it("validate2 testData", () => {
    expect(validate2(testData)).toEqual(45000);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(0);
  });
});
