import { getIndexFromAlphaChar } from "@/helpers/alphanumToNumber";
import { getShareItems, validate, validate2, prepareData } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  xit("getIndexFromAlphaChar shoudl work", () => {
    expect(getIndexFromAlphaChar("a") + 1).toEqual(1);
    expect(getIndexFromAlphaChar("p") + 1).toEqual(16);
    expect(getIndexFromAlphaChar("A") + 1).toEqual(27);
    expect(getIndexFromAlphaChar("L") + 1).toEqual(38);
    expect(getIndexFromAlphaChar("P") + 1).toEqual(42);
  });
  xit("getShareItems testData", () => {
    const { line, sum } = getShareItems(testData);
    expect(line).toEqual("pLPvts");
    expect(sum).toEqual(157);
  });
  xit("getShareItems myData", () => {
    const { line, sum } = getShareItems(myData);
    // expect(line).toEqual();
    expect(sum).toEqual();
  });

  xit("validate2 testData", () => {
    const { keyLetters, sum } = validate2(testData);
    expect(keyLetters).toEqual("rZ");
    expect(sum).toEqual(70);
  });
  it("validate2 myData", () => {
    const { keyLetters, sum } = validate2(myData);
    expect(sum).toEqual(0);
  });
});
