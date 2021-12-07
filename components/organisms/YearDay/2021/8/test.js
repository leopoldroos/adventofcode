const path = require("path");
const fs = require("fs");
import { validate, validate2, prepareData, prepareData2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 8", () => {
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { crabs } = prepareData(fileData);
  //   const { minFuel, minFuelPos } = validate({ crabs });
  //   expect(minFuel).toEqual(37);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { crabs } = prepareData(fileData);
  //   const { minFuel, minFuelPos } = validate({ crabs });
  //   expect(minFuel).toEqual(37);
  // });

  // Step 2:
  it("validate testData", () => {});
  it("validate myData", () => {});
});
