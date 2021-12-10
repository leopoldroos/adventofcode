const path = require("path");
const fs = require("fs");
import { prepareData, validate, validate2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 11", () => {
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const { answer } = validate(fileData);
  //   expect(answer).toEqual(26397);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const { answer } = validate(fileData);
  //   expect(answer).toEqual(374061);
  // });
  // Step 2:
  // it("validate testData", () => {
  // });
  // it("validate myData", () => {
  // });
});
