const path = require("path");
const fs = require("fs");
import {
  validate,
  validate2,
  prepareData,
  prepareData2,
  findLowMap,
  isPointLowest,
  getPool,
  getPools,
  mergePools,
  xorSumArrays,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 9", () => {
  // it("validate minimap", () => {
  //   const map = [
  //     [4, 3, 2, 3, 0],
  //     [4, 3, 2, 5, 4],
  //     [4, 3, 2, 3, 4],
  //     [3, 1, 2, 3, 4],
  //     [4, 3, 2, 3, 4],
  //   ];
  //   expect(isPointLowest({ map, x: 1, y: 3 })).toEqual(true);
  //   expect(isPointLowest({ map, x: 0, y: 0 })).toEqual(false);
  //   expect(isPointLowest({ map, x: 4, y: 0 })).toEqual(true);
  // });
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { map } = prepareData(fileData);
  //   const { answer } = validate(map);
  //   expect(answer).toEqual(15);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { map } = prepareData(fileData);
  //   const { answer } = validate(map);
  //   expect(answer).toEqual(566); // not 1394, it is too high
  // });

  // Step 2:
  it("validate getPool", () => {
    // cosnt map = [[1, 9, 9, 3, 4, 0]];
    // expect(getPool({ map, lowestPoint: { x: 0, y: 0 } })).toEqual([1]);
    // expect(getPool({ map, lowestPoint: { x: 5, y: 0 } })).toEqual([0, 4, 3]);
    // expect(getPool({ map, lowestPoint: { x: 4, y: 0 } })).toEqual([4, 3, 0]);
  });
  it("validate getPools", () => {
    // const map = [
    //   "199658", // 0->1, 3->5
    //   "199940",
    //   "999230",
    // ];
    // const results = getPools(map);
    // expect(results.length).toEqual(3);
    // expect(results[0].length).toEqual(2);
    // expect(results[0][0]).toEqual({ from: 0, to: 0, length: 1, sum: 1 });
    // expect(results[0][1]).toEqual({ from: 3, to: 5, length: 3, sum: 19 });
    // expect(results[1].length).toEqual(2);
    // expect(results[1][0]).toEqual({ from: 0, to: 0, length: 1, sum: 1 });
    // expect(results[1][1]).toEqual({ from: 4, to: 5, length: 2, sum: 4 });
    // expect(results[2].length).toEqual(1);
    // expect(results[2][0]).toEqual({ from: 3, to: 5, length: 3, sum: 5 });
  });

  // it("validate xorSumArrays", () => {
  //   expect(xorSumArrays([1], [9])).toEqual([1]);
  //   expect(xorSumArrays([1, 9, 3], [9, 9, 1])).toEqual([1, 0, 4]);
  //   expect(
  //     xorSumArrays(
  //       [1, 3, 2, 1, 3, 9, 2, 3, 4, 9, 2, 3, 4, 9, 9, 9],
  //       [1, 3, 2, 1, 3, 9, 2, 3, 4, 9, 2, 3, 4, 9, 9, 9],
  //     ),
  //   ).toEqual([2, 6, 4, 2, 6, 0, 4, 6, 8, 0, 4, 6, 8, 0, 0, 0]);
  // });
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { answer } = validate2(prepareData(fileData).map);
    expect(answer).toEqual(1134);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { answer } = validate2(prepareData(fileData).map);
    expect(answer).toEqual(891684);
  });
});
