import { validate, validate2, prepareData, flip, countLowerTreesBack } from "./index";
import myData from "./myData.json";
import testData from "./testData.json";

describe("day1", () => {
  xit("prepareData testData", () => {
    const trees = prepareData(testData);
    expect(trees.length).toEqual(testData.length);
    expect(trees[0].length).toEqual(testData[0].length);
    expect(trees[2][2].height).toEqual(3);
    expect(trees[2][2].visible).toEqual("unknown");
    expect(trees[3][1].visible).toEqual("unknown");
    expect(trees[0][2].visible).toEqual(true);
    expect(trees[4][4].visible).toEqual(true);
  });
  xit("flip testData", () => {
    const trees = prepareData(testData);
    const flipped = flip(trees);
    expect(flipped[3][0].height).toEqual(7);
    expect(flipped[0][2].height).toEqual(6);
  });
  xit("validate testData", () => {
    expect(validate(testData)).toEqual(21);
  });
  xit("validate myData", () => {
    expect(validate(myData)).toEqual(21);
  });
  xit("countLowerTreesBack testData", () => {
    expect(countLowerTreesBack([{ height: 1 }, { height: 2 }, { height: 3 }, { height: 4 }, { height: 5 }])).toEqual(4);
    expect(countLowerTreesBack([{ height: 1 }, { height: 2 }, { height: 3 }, { height: 5 }, { height: 5 }])).toEqual(1);
    expect(countLowerTreesBack([{ height: 1 }, { height: 5 }, { height: 3 }, { height: 1 }, { height: 5 }])).toEqual(3);
  });
  xit("validate2 testData", () => {
    expect(validate2(testData)).toEqual(8);
  });
  it("validate2 myData", () => {
    expect(validate2(myData)).toEqual(268912);
  });
});
