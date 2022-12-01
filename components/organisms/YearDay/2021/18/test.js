const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  validate2,
  getFirstPosOfIssue,
  getPartialComplexString,
  getPartialComplexPair,
  addInLeftDirection,
  addInRightDirection,
  buildUpAdditionString,
  reduceUntilDone,
  combineComplexStrings,
  combineAndReduceComplexStrings,
  reduceLargeValuesUntilDone,
  calculateMagnitude,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 18", () => {
  it("validate getFirstPosOfIssue", () => {
    //   expect(getFirstPosOfIssue("[[[[[1,0]]]]]")).toEqual(4);
    //   expect(getFirstPosOfIssue("[[[[1,0]]]]]")).toEqual(-1);
    //   expect(getFirstPosOfIssue("[[[[1,[1,0]]]]]")).toEqual(6);
    //   expect(getFirstPosOfIssue("[[[[1,0],[1,[1,0]]]]]")).toEqual(12);
    // expect(
    //   getFirstPosOfIssue(
    //     "[[[[4,0],[5,4]],[[7,0],[[7,8],5]]],[[5,5],[[[5,6],9],[[5,6],0]]]]",
    //   ),
    // ).toEqual(24);
  });
  // it("validate getPartialComplexString", () => {
  //   expect(getPartialComplexString("[[[[1,0],[1,[1,0]]]]]", 12)).toEqual({
  //     endPos: 16,
  //     partialComplexString: "[1,0]",
  //   });
  //   expect(getPartialComplexString("[[[[1,0],[15,[1,0]]]]]", 9)).toEqual({
  //     endPos: 18,
  //     partialComplexString: "[15,[1,0]]",
  //   });
  // });
  it("validate getPartialComplexPair", () => {
    // expect(getPartialComplexPair("[[[[1,0],[1,[1,0]]]]]", 12)).toEqual({
    //   endPos: 16,
    //   partialComplextPair: [1, 0],
    // });
    // expect(getPartialComplexPair("[[[[1,0],[15,[1,0]]]]]", 9)).toEqual({
    //   endPos: 18,
    //   partialComplextPair: [15, [1, 0]],
    // });
  });
  // it("validate addInLeftDirection", () => {
  //   expect(addInLeftDirection("[[[[1,0],[1", 1)).toEqual("[[[[1,0],[2");
  //   expect(addInLeftDirection("[[[[12,30],[21", 11)).toEqual("[[[[12,30],[32");
  // });
  // it("validate addInRightDirection", () => {
  //   expect(addInRightDirection("]]]]]", 1)).toEqual("]]]]]");
  //   expect(addInRightDirection(",[1,[1,0]]]]]", 1)).toEqual(",[2,[1,0]]]]]");
  //   expect(addInRightDirection(",[10,[1,0]]]]]", 10)).toEqual(",[20,[1,0]]]]]");
  // });
  // it("validate buildUpAdditionString", () => {
  //   expect(
  //     buildUpAdditionString("[[[[1,0],[1,[1,0]]]]]", [1, 0], 12, 16),
  //   ).toEqual("[[[[1,0],[2,0]]]]");
  // });
  // it("validate reduceLargeValuesUntilDone", () => {
  //   expect(reduceLargeValuesUntilDone("[[[[1,15],[1,0]]]]]")).toEqual(
  //     "[[[[1,[7,8]],[1,0]]]]]",
  //   );
  // });

  // it("validate reduceUntilDone", () => {
  //   expect(reduceUntilDone("[[[[[9,8],1],2],3],4]")).toEqual(
  //     "[[[[0,9],2],3],4]",
  //   );
  //   expect(reduceUntilDone("[7,[6,[5,[4,[3,2]]]]]")).toEqual(
  //     "[7,[6,[5,[7,0]]]]",
  //   );
  //   expect(reduceUntilDone("[[6,[5,[4,[3,2]]]],1]")).toEqual(
  //     "[[6,[5,[7,0]]],3]",
  //   );
  //   expect(reduceUntilDone("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]")).toEqual(
  //     "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
  //   );
  // });
  // it("validate combineComplexStrings", () => {
  //   expect(combineComplexStrings("[1,1]", "[2,2]")).toEqual("[[1,1],[2,2]]");
  // });
  // it("validate combineAndReduceComplexStrings", () => {
  //   expect(combineAndReduceComplexStrings("[1,1]", "[2,2]")).toEqual(
  //     "[[1,1],[2,2]]",
  //   );
  //   expect(
  //     combineAndReduceComplexStrings("[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"),
  //   ).toEqual("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
  // });

  // it("validate calculateMagnitude", () => {
  //   expect(calculateMagnitude("[[1,2],[[3,4],5]]")).toEqual(143);
  //   expect(
  //     calculateMagnitude(
  //       "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]",
  //     ),
  //   ).toEqual(3488);
  // });

  // it("validate testData", () => {
  //   var testData = ["[1,1]", "[2,2]", "[3,3]", "[4,4]"];
  //   expect(validate(testData).complexString).toEqual(
  //     "[[[[1,1],[2,2]],[3,3]],[4,4]]",
  //   );
  // });

  // it("validate testData", () => {
  //   var testData = ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]"];
  //   expect(validate(testData).complexString).toEqual(
  //     "[[[[3,0],[5,3]],[4,4]],[5,5]]",
  //   );
  // });

  // it("validate testData", () => {
  //   var testData = ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"];
  //   expect(validate(testData).complexString).toEqual(
  //     "[[[[5,0],[7,4]],[5,5]],[6,6]]",
  //   );
  // });

  it("validate testData", () => {
    // let complexString = combineAndReduceComplexStrings(
    //   "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
    //   "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
    // );
    // expect(complexString).toEqual(
    //   "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]",
    // );
    // complexString = combineAndReduceComplexStrings(
    //   "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]",
    //   "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
    // );
    // expect(complexString).toEqual(
    //   "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]",
    // );
    // const testData = loadData("testData.txt");
    // expect(validate(testData).complexString).toEqual(
    //   "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]",
    // );
  });

  it("validate testData", () => {
    // const testData = loadData("testData2.txt");
    // const { answer, complexString } = validate(testData);
    // expect(complexString).toEqual(
    //   "[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]",
    // );
    // expect(answer).toEqual(4140);
  });

  // it("validate myData", () => {
  //   const testData = loadData("myData.txt");
  //   const { answer, complexString } = validate(testData);
  //   expect(complexString).toEqual(
  //     "[[[[6,7],[7,7]],[[7,7],[7,7]]],[[[0,7],[8,8]],[[8,7],[6,1]]]]",
  //   );
  //   expect(answer).toEqual(3892);
  // });

  // Step 2:
  // it("validate testData", () => {
  //   const testData = loadData("testData2.txt");
  //   const { answer, complexString } = validate2(testData);
  //   expect(answer).toEqual(3993);
  // });
  it("validate myData", () => {
    const testData = loadData("myData.txt");
    const { answer, complexString } = validate2(testData);
    expect(answer).toEqual(4909);
  });
});
