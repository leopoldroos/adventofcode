const path = require("path");
const fs = require("fs");
import { prepareData, validate, validate2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 11", () => {
  // it("validate testData", () => {
  // const fileData = loadData("testData.txt");
  // const map = prepareData(fileData);
  // expect(map.length).toEqual(10);
  // expect(map[0].length).toEqual(10);
  // expect(validate([...map], 1).answer).toEqual(0);
  // expect(validate([...map], 2).answer).toEqual(35);
  // expect(validate([...map], 10).answer).toEqual(204);
  // expect(validate([...map], 100).answer).toEqual(1656);
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const map = prepareData(fileData);
  //   expect(validate([...map], 100).answer).toEqual(1615);
  // });
  // Step 2:
  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const map = prepareData(fileData);
  //   expect(validate2(map).answer).toEqual(195);
  // });
  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const map = prepareData(fileData);
    expect(validate2(map).answer).toEqual(249);
  });
});
