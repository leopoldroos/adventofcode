const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  calculateTrajectory,
  updatePosition,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 17", () => {
  it("validate prepareData", () => {
    const fileData = loadData("testData.txt");
    const prepData = prepareData(fileData);
    expect(prepData.xMin).toEqual(20);
    expect(prepData.xMax).toEqual(30);
    expect(prepData.yMin).toEqual(-10);
    expect(prepData.yMax).toEqual(-5);
  });

  it("validate updatePosition", () => {
    const fileData = loadData("testData.txt");
    const prepData = prepareData(fileData);
    let result = updatePosition({ pos: [0, 0], velo: [7, 2] });
    expect(result.pos).toEqual([7, 2]);
    expect(result.velo).toEqual([6, 1]);

    result = updatePosition(result);
    expect(result.pos).toEqual([13, 3]);
    expect(result.velo).toEqual([5, 0]);

    result = updatePosition(result);
    expect(result.pos).toEqual([18, 3]);
    expect(result.velo).toEqual([4, -1]);

    result = updatePosition(result);
    expect(result.pos).toEqual([22, 2]);
    expect(result.velo).toEqual([3, -2]);

    result = updatePosition(result);
    expect(result.pos).toEqual([25, 0]);
    expect(result.velo).toEqual([2, -3]);

    result = updatePosition(result);
    expect(result.pos).toEqual([27, -3]);
    expect(result.velo).toEqual([1, -4]);

    result = updatePosition(result);
    expect(result.pos).toEqual([28, -7]);
    expect(result.velo).toEqual([0, -5]);
  });

  it("validate calculateTrajectory", () => {
    const fileData = loadData("testData.txt");
    const targetMap = prepareData(fileData);
    const { targetReached, highest, nrOfSteps } = calculateTrajectory({
      pos: [0, 0],
      velo: [7, 2],
      targetMap,
    });
    expect(targetReached).toEqual(true);
    expect(highest).toEqual(3);
    expect(nrOfSteps).toEqual(7);
  });

  it("validate calculateTrajectory", () => {
    const fileData = loadData("testData.txt");
    const targetMap = prepareData(fileData);
    const { targetReached, highest, nrOfSteps } = calculateTrajectory({
      pos: [0, 0],
      velo: [6, 3],
      targetMap,
    });
    expect(targetReached).toEqual(true);
    expect(highest).toEqual(6);
    expect(nrOfSteps).toEqual(9);
  });

  it("validate calculateTrajectory", () => {
    const fileData = loadData("testData.txt");
    const targetMap = prepareData(fileData);
    const { targetReached, highest, nrOfSteps } = calculateTrajectory({
      pos: [0, 0],
      velo: [9, 0],
      targetMap,
    });
    expect(targetReached).toEqual(true);
    expect(highest).toEqual(0);
    expect(nrOfSteps).toEqual(4);
  });

  it("validate calculateTrajectory", () => {
    const fileData = loadData("testData.txt");
    const targetMap = prepareData(fileData);
    const { targetReached, highest, nrOfSteps } = calculateTrajectory({
      pos: [0, 0],
      velo: [17, -4],
      targetMap,
    });
    expect(targetReached).toEqual(false);
    expect(highest).toEqual(0);
    expect(nrOfSteps).toEqual(2);
  });
  it("validate testData", () => {
    const fileData = loadData("testData.txt");
    const targetMap = prepareData(fileData);
    const { answer, initialSteps } = validate(targetMap);
    expect(answer).toEqual(45);
    expect(initialSteps).toEqual(112);
  });

  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const targetMap = prepareData(fileData);
    const { answer, initialSteps } = validate(targetMap);
    expect(answer).toEqual(7381); // step 1
    expect(initialSteps).toEqual(3019); // step 2
  });
});
