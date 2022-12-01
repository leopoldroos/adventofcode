const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  validate2,
  inpAction,
  addAction,
  mulAction,
  divAction,
  modAction,
  eqlAction,
  replacementAlu,
  runActionsList,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 24", () => {
  it("validate 'eqlAction'", () => {
    expect(eqlAction(1, 1)).toEqual(1);
    expect(eqlAction(1, 0)).toEqual(0);
  });
  it("validate 'negation'", () => {
    // inp x
    // mul x -1
    let x;
    x = inpAction(10, x);
    x = mulAction(x, -1);
    expect(x).toEqual(-10);
  });

  it("validate 'true if threes times larger'", () => {
    // inp z
    // inp x
    // mul z 3
    // eql z x

    let z;
    let x;
    x = inpAction(30, x);
    z = inpAction(10, z);
    z = mulAction(z, 3);
    z = eqlAction(z, x);
    expect(z).toEqual(1);
  });

  it("validate ''", () => {
    // inp w
    // add z w
    // mod z 2
    // div w 2
    // add y w
    // mod y 2
    // div w 2
    // add x w
    // mod x 2
    // div w 2
    // mod w 2

    let x = 0;
    let y = 0;
    let z = 0;
    let w = 0;

    // wxyz
    w = inpAction(15, w); // 1 => 0001 , 2 => 0010, 4 => 0100 etc
    z = addAction(z, w);
    z = modAction(z, 2);

    w = divAction(w, 2);
    y = addAction(y, w);
    y = modAction(y, 2);

    w = divAction(w, 2);
    x = addAction(x, w);
    x = modAction(x, 2);

    w = divAction(w, 2);
    w = modAction(w, 2);

    // expect(divAction(10, 0)).toEqual(10);
    // expect(modAction(10, 9)).toEqual(1);
    // expect(modAction(10, 11)).toEqual(10);

    expect(z).toEqual(1);
    expect(y).toEqual(1);
    expect(x).toEqual(1);
    expect(w).toEqual(1);
  });

  it("validate replacementAlu", () => {
    expect(replacementAlu(1)).toEqual("0001");
    expect(replacementAlu(2)).toEqual("0010");
    expect(replacementAlu(15)).toEqual("1111");
    expect(replacementAlu(16)).toEqual("0000");
  });
  it("validate prepareData", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // expect(prepData.folds.length).toEqual(2);
    // expect(prepData.folds[0].value).toEqual(7);
    // expect(prepData.folds[0].direction).toEqual("y");
    // expect(prepData.folds[1].value).toEqual(5);
    // expect(prepData.folds[1].direction).toEqual("x");
    // expect(prepData.map.length).toEqual(14);
    // expect(prepData.map[0].length).toEqual(10);
  });

  it("validate runActionsList", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // const wxyz = runActionsList(8, prepData.actionsLists[0]);
    // expect(wxyz.w).toEqual(1);
    // expect(wxyz.x).toEqual(0);
    // expect(wxyz.y).toEqual(0);
    // expect(wxyz.z).toEqual(0);
  });
  it("validate testData", () => {
    // const fileData = loadData("testData.txt");
    // const prepData = prepareData(fileData);
    // const { answer } = validate(prepData.actionsLists);
    // expect(answer).toEqual("8");
  });

  it("validate myData", () => {
    const fileData = loadData("myData.txt");
    const prepData = prepareData(fileData);
    // const wxyz = runActionsList(1, prepData.actionsLists[0]);
    // expect(wxyz.z).toEqual(0);
    // expect(wxyz.w).toEqual(1);

    const { answer } = validate(prepData.actionsLists);
    expect(answer).toEqual("00000000000000");
  });
  // Step 2:
  // it("validate testData", () => {
  // });
  // it("validate myData", () => {
  //   const fileData = loadData("myData.txt");
  //   const prepData = prepareData(fileData);
  //   const { answer } = validate(prepData);
  //   logAnswer(answer);
  //   expect(1).toEqual(1); // Consol.logs "BLKJRBAG"
  // });
});
