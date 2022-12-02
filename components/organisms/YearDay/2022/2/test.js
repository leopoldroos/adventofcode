import { validate, validate2, prepareData } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  xit("validate testData", () => {
    expect(validate(testData)).toEqual(15);
  });
  xit("validate myData", () => {
    expect(validate(myData)).toEqual(15337); // INTE: 15937 is too high, 
  });
  xit("validate2 testData", () => {
    expect(validate2(testData)).toEqual(12);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(0);
  });
});
