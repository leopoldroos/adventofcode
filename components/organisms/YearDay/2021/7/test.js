const path = require("path");
const fs = require("fs");
import {
  validate,
  validate2,
  sortCrabsByPosition,
  calculateSum,
  calculateFuel2,
  calculateMeanPos,
  prepareData,
  prepareData2,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 7", () => {
  // it("validate sortCrabsByPosition", () => {
  //   const fileData = loadData("testData.txt");
  //   const { crabs } = prepareData(fileData);
  //   sortCrabsByPosition({ crabs });
  //   expect(crabs[0].position).toEqual(0);
  //   expect(crabs[1].position).toEqual(1);
  //   expect(crabs[2].position).toEqual(1);
  //   expect(crabs[3].position).toEqual(2);
  //   expect(crabs[4].position).toEqual(2);
  //   expect(crabs[8].position).toEqual(14);
  //   expect(crabs[9].position).toEqual(16);
  // });

  // it("validate calculateSum", () => {
  //   const fileData = loadData("testData.txt");
  //   const { crabs } = prepareData(fileData);
  //   sortCrabsByPosition({ crabs });
  //   const totalSum = calculateSum({ crabs });
  //   expect(totalSum).toEqual(49);
  // });

  // it("validate calculateMeanPos", () => {
  //   const fileData = loadData("testData.txt");
  //   const { crabs } = prepareData(fileData);
  //   sortCrabsByPosition({ crabs });
  //   const { totalFuel } = calculateMeanPos({ crabs, endPosition: 0 });
  //   expect(totalFuel).toEqual(49);
  //   expect(calculateMeanPos({ crabs, endPosition: 1 }).totalFuel).toEqual(41);
  //   expect(calculateMeanPos({ crabs, endPosition: 3 }).totalFuel).toEqual(39);
  //   expect(calculateMeanPos({ crabs, endPosition: 10 }).totalFuel).toEqual(71);
  // });

  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { crabs } = prepareData(fileData);
  //   sortCrabsByPosition({ crabs });
  //   const { minFuel, minFuelPos } = validate({ crabs });
  //   expect(minFuel).toEqual(37);
  //   expect(minFuelPos).toEqual(2);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { crabs } = prepareData(fileData);
  //   sortCrabsByPosition({ crabs });
  //   const { minFuel, minFuelPos } = validate({ crabs });
  //   expect(minFuel).toEqual(344297);
  //   expect(minFuelPos).toEqual(313);
  // });

  // Step 2:
  it("validate calculateFuel2", () => {
    // 0->1 (1), 1->2 (1+(1+1)), 2->3 (3+(1+1+1))
    expect(
      calculateFuel2({ crab: { position: 0 }, toPsoition: 3 }).fuel,
    ).toEqual(6);
    expect(
      calculateFuel2({ crab: { position: 1 }, toPsoition: 5 }).fuel,
    ).toEqual(10);
    expect(
      calculateFuel2({ crab: { position: 14 }, toPsoition: 5 }).fuel,
    ).toEqual(45);
    expect(
      calculateFuel2({ crab: { position: 16 }, toPsoition: 5 }).fuel,
    ).toEqual(66);
  });
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const { crabs } = prepareData(fileData);
    sortCrabsByPosition({ crabs });
    const { minFuel, minFuelPos } = validate2({ crabs });
    expect(minFuel).toEqual(168);
    expect(minFuelPos).toEqual(5);
  });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { crabs } = prepareData(fileData);
    sortCrabsByPosition({ crabs });
    const { minFuel, minFuelPos } = validate2({ crabs });
    expect(minFuel).toEqual(97164301);
    expect(minFuelPos).toEqual(465);
  });
});
