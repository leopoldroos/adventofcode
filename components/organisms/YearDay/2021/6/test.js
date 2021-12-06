const path = require("path");
const fs = require("fs");
import {
  fishFormula,
  getReproductionMap,
  simulateOneTypeOfFish,
  addFishDay,
  validate,
  validate2,
  prepareData,
  prepareData2,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 6", () => {
  // it("validate addFishDay", () => {
  //   const fish = { timer: 0, isParent: false, number: 0 };
  //   const { fish: updatedFish, newFish } = addFishDay({ fish });
  //   expect(updatedFish.timer).toEqual(6);
  //   expect(updatedFish.isParent).toEqual(true);
  //   expect(newFish.timer).toEqual(8);
  //   expect(newFish.isParent).toEqual(false);
  //   const { fish: updatedFish2, newFish: newFish2 } = addFishDay({
  //     fish: updatedFish,
  //   });
  //   expect(updatedFish2.timer).toEqual(5);
  //   expect(updatedFish.isParent).toEqual(true);
  //   expect(newFish2).toEqual(null);
  // });
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { fishes } = prepareData(fileData);
  //   const { fishes: fishesDay18 } = validate({ fishes, days: 18 });
  //   expect(fishesDay18.length).toEqual(26);
  //   const { fishes: fishesDay80 } = validate({
  //     fishes: fishesDay18,
  //     days: 80 - 18,
  //   });
  //   expect(fishesDay80.length).toEqual(5934);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { fishes } = prepareData(fileData);
  //   const { fishes: fishesDay80 } = validate({ fishes, days: 80 });
  //   expect(fishesDay80.length).toEqual(363101);
  // });

  // Step 2:
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { numbers } = prepareData(fileData);
  //   const { answer } = validate2({ numbers });
  //   expect(answer).toEqual(26984457539);
  // });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const { numbers } = prepareData(fileData);
    const { answer } = validate2({ numbers });
    expect(answer).toEqual(1644286074024);
  });
});
