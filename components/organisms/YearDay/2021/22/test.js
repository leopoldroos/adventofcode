const path = require("path");
const fs = require("fs");
import { prepareData, validate, applyActionCube } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 22", () => {
  it("validate prepareData", () => {
    const fileData = loadData("testData.txt");
    const prepData = prepareData(fileData);
    expect(prepData.length).toEqual(22);
    expect(prepData[0].mode).toEqual("on");
    expect(prepData[1].xSpan).toEqual([-20, 33]);
    expect(prepData[2].ySpan).toEqual([-29, 23]);
    expect(prepData[3].zSpan).toEqual([-50, -1]);
    expect(prepData[4].isSmall).toEqual(true);
    expect(prepData[5].xSpan).toEqual([2, 47]);
    expect(prepData[5].ySpan).toEqual([-22, 22]);
    expect(prepData[5].zSpan).toEqual([-23, 27]);
    expect(prepData[5].isContaining(40, 20, 10)).toEqual(true);
    expect(prepData[5].isContaining(47, -22, 0)).toEqual(true);
    expect(prepData[5].isContaining(48, -22, 0)).toEqual(false);
    expect(prepData[5].isContaining(47, -23, 0)).toEqual(false);
  });

  it("validate applyActionCube", () => {
    const prepData = prepareData([
      "on x=10..12,y=10..12,z=10..12",
      "on x=11..13,y=11..13,z=11..13",
      "off x=9..11,y=9..11,z=9..11",
      "on x=10..10,y=10..10,z=10..10",
    ]);
    let allCubesState = {
      onBulbs: [],
      offBulbs: [],
    };
    allCubesState = applyActionCube(allCubesState, prepData[0]);
    expect(allCubesState.onBulbs.length).toEqual(27);
    expect(allCubesState.offBulbs.length).toEqual(0);

    allCubesState = applyActionCube(allCubesState, prepData[1]);
    expect(allCubesState.onBulbs.length).toEqual(46);
    expect(allCubesState.offBulbs.length).toEqual(0);

    allCubesState = applyActionCube(allCubesState, prepData[2]);
    expect(allCubesState.onBulbs.length).toEqual(38);
    expect(allCubesState.offBulbs.length).toEqual(27);

    allCubesState = applyActionCube(allCubesState, prepData[3]);
    expect(allCubesState.onBulbs.length).toEqual(39);
    expect(allCubesState.offBulbs.length).toEqual(26);
  });

  it("validate testData", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // const { answer } = validate(prepData);
    // expect(answer).toEqual(590784);
  });

  it("validate myData", () => {
    // const fileData = loadData("myData.txt");
    // const targetMap = prepareData(fileData);
    // const { answer, initialSteps } = validate(targetMap);
    // expect(answer).toEqual(7381); // step 1
    // expect(initialSteps).toEqual(3019); // step 2
  });
});
