const path = require("path");
const fs = require("fs");
import {
  prepareData,
  validate,
  validate2,
  getPixelsForY,
  getSurroundingPixelsAsBinaryLine,
  addSurroundingBorder,
  getDecFromBinary,
  getEnhancedPixel,
} from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 20", () => {
  it("validate getPixelsForY", () => {
    expect(getPixelsForY({ yLine: "#.#", x: 1, padChar: "." })).toEqual("#.#");
    expect(getPixelsForY({ yLine: "#.#", x: 0, padChar: "." })).toEqual(".#.");
    expect(getPixelsForY({ yLine: "#.#", x: 2, padChar: "." })).toEqual(".#.");
    expect(getPixelsForY({ yLine: "#.#", x: 2, padChar: "#" })).toEqual(".##");
  });
  it("validate getSurroundingPixelsAsBinaryLine", () => {
    expect(
      getSurroundingPixelsAsBinaryLine({
        image: ["...", "#.#", "..."],
        x: 1,
        y: 1,
        step: 0,
      }),
    ).toEqual("000101000");
    expect(
      getSurroundingPixelsAsBinaryLine({
        image: ["...", "#.#", "..."],
        x: 0,
        y: 1,
        step: 0,
      }),
    ).toEqual("000010000");
    expect(
      getSurroundingPixelsAsBinaryLine({
        image: ["...", "#.#", "..."],
        x: 0,
        y: 0,
        step: 1,
      }),
    ).toEqual("111100110");
    expect(
      getSurroundingPixelsAsBinaryLine({
        image: ["...", "...", "..."],
        x: 1,
        y: 1,
        step: 0,
      }),
    ).toEqual("000000000");
  });

  it("validate addSurroundingBorder", () => {
    // expect(addSurroundingBorder(["#"])).toEqual([
    //   ".......",
    //   ".......",
    //   ".......",
    //   "...#...",
    //   ".......",
    //   ".......",
    //   ".......",
    // ]);
    // expect(addSurroundingBorder(["###", "###", "###"])).toEqual([
    //   ".........",
    //   ".........",
    //   ".........",
    //   "...###...",
    //   "...###...",
    //   "...###...",
    //   ".........",
    //   ".........",
    //   ".........",
    // ]);
  });
  it("validate getDecFromBinary", () => {
    // expect(getDecFromBinary("111111111")).toEqual(511);
    // expect(getDecFromBinary("00000")).toEqual(0);
    // expect(getDecFromBinary("10")).toEqual(2);
    // expect(getDecFromBinary("000100010")).toEqual(34);
  });
  // it("validate getEnhancedPixel", () => {
  //   expect(
  //     getEnhancedPixel({
  //       algorithm: "..#.#..#####.#.#.#.###.##.....###.##.#..###.####",
  //       image: ["...", "#..", ".#."],
  //       x: 1,
  //       y: 1,
  //     }),
  //   ).toEqual("#");
  //   expect(
  //     getEnhancedPixel({
  //       algorithm:
  //         "#..##.##.##..#.#.####.##..#..###.#..####.#.#....##....#....#...##.#.#.##...#.##.#...#.##..##.#....#...###.#.##.#..#..#..######..#....#.###..#....##.##..........#.#..###.......####..#...###.#.###...#####....##...##..##......#.#......#..#..#.#.......#.##.###.....##.#.#....##.#####.###.....#..###...###..##.##.#.#...#.##.###.###.#.....#.####..#..##....##.#.#.###...##.#.#.#...#.#####.......#..##......#..##.###.##.####.#.#..#...######...####...#.##.#...#....#.......##..#.#....###.#...#.##...#.#.......#.#....#.#..",
  //       image: ["#....", ".####", "#####", "##..#", "#..##"],
  //       x: 0,
  //       y: 0,
  //     }),
  //   ).toEqual("#");
  // });

  // it("validate testData", () => {
  //   const fileData = loadData("testData.txt");
  //   const prepData = prepareData(fileData);
  //   const { answer } = validate(prepData);
  //   expect(answer).toEqual(35);
  // });
  it("validate myData", () => {
    // expect(
    //   validate({
    //     algorithm:
    //       "#..##.##.##..#.#.####.##..#..###.#..####.#.#....##....#....#...##.#.#.##...#.##.#...#.##..##.#....#...###.#.##.#..#..#..######..#....#.###..#....##.##..........#.#..###.......####..#...###.#.###...#####....##...##..##......#.#......#..#..#.#.......#.##.###.....##.#.#....##.#####.###.....#..###...###..##.##.#.#...#.##.###.###.#.....#.####..#..##....##.#.#.###...##.#.#.#...#.#####.......#..##......#..##.###.##.####.#.#..#...######...####...#.##.#...#....#.......##..#.#....###.#...#.##...#.#.......#.#....#.#..",
    //     image: ["###", "###", "###"],
    //     nrOfSteps: 1,
    //   }).image,
    // ).toEqual([
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    //   "...........",
    // ]);
    // expect(
    //   validate({
    //     algorithm:
    //       "#..##.##.##..#.#.####.##..#..###.#..####.#.#....##....#....#...##.#.#.##...#.##.#...#.##..##.#....#...###.#.##.#..#..#..######..#....#.###..#....##.##..........#.#..###.......####..#...###.#.###...#####....##...##..##......#.#......#..#..#.#.......#.##.###.....##.#.#....##.#####.###.....#..###...###..##.##.#.#...#.##.###.###.#.....#.####..#..##....##.#.#.###...##.#.#.#...#.#####.......#..##......#..##.###.##.####.#.#..#...######...####...#.##.#...#....#.......##..#.#....###.#...#.##...#.#.......#.#....#.#..",
    //     image: ["#####", "#####", "#####", "#####", "#####"],
    //     nrOfSteps: 1,
    //   }).image,
    // ).toEqual([
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    //   "###########",
    // ]);
    // expect(
    //   validate({
    //     algorithm:
    //       "#..##.##.##..#.#.####.##..#..###.#..####.#.#....##....#....#...##.#.#.##...#.##.#...#.##..##.#....#...###.#.##.#..#..#..######..#....#.###..#....##.##..........#.#..###.......####..#...###.#.###...#####....##...##..##......#.#......#..#..#.#.......#.##.###.....##.#.#....##.#####.###.....#..###...###..##.##.#.#...#.##.###.###.#.....#.####..#..##....##.#.#.###...##.#.#.#...#.#####.......#..##......#..##.###.##.####.#.#..#...######...####...#.##.#...#....#.......##..#.#....###.#...#.##...#.#.......#.#....#.#..",
    //     image: ["#....", ".####", "#####", "##..#", "#..##"],
    //     nrOfSteps: 1,
    //   }).image,
    // ).toEqual([
    //   "###########",
    //   "###########",
    //   "##..#######",
    //   "##.#.######",
    //   "##...######",
    //   "#####...###",
    //   "##..#..####",
    //   "##...#.####",
    //   "####.##..##",
    //   "###########",
    //   "###########",
    // ]);
    // expect(
    //   validate({
    //     algorithm:
    //       "#..##.##.##..#.#.####.##..#..###.#..####.#.#....##....#....#...##.#.#.##...#.##.#...#.##..##.#....#...###.#.##.#..#..#..######..#....#.###..#....##.##..........#.#..###.......####..#...###.#.###...#####....##...##..##......#.#......#..#..#.#.......#.##.###.....##.#.#....##.#####.###.....#..###...###..##.##.#.#...#.##.###.###.#.....#.####..#..##....##.#.#.###...##.#.#.#...#.#####.......#..##......#..##.###.##.####.#.#..#...######...####...#.##.#...#....#.......##..#.#....###.#...#.##...#.#.......#.#....#.#..",
    //     image: ["#....", ".####", "#####", "##..#", "#..##"],
    //     nrOfSteps: 2,
    //   }).image,
    // ).toEqual([
    //   "#################",
    //   "#################",
    //   "##.##############",
    //   "###.#############",
    //   "##.....#.....####",
    //   "##..##.##....####",
    //   "##..#.#.#....####",
    //   "##...##....#.####",
    //   "##...#.#...#.####",
    //   "##..#.#..###.####",
    //   "##....#.#...#####",
    //   "##..##.#....#####",
    //   "##....#.###.#####",
    //   "##.#..........###",
    //   "####...........##",
    //   "#################",
    //   "#################",
    // ]);
    // expect(
    //   validate({
    //     algorithm:
    //       "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#",
    //     image: ["#..#.", "#....", "##..#", "..#..", "..###"],
    //     nrOfSteps: 2,
    //   }).image,
    // ).toEqual([
    //   ".................",
    //   ".................",
    //   ".................",
    //   ".................",
    //   "...........#.....",
    //   ".....#..#.#......",
    //   "....#.#...###....",
    //   "....#...##.#.....",
    //   "....#.....#.#....",
    //   ".....#.#####.....",
    //   "......#.#####....",
    //   ".......##.##.....",
    //   "........###......",
    //   ".................",
    //   ".................",
    //   ".................",
    //   ".................",
    // ]);
    // const fileData = loadData("myData.txt");
    // const prepData = prepareData(fileData);
    // const { answer } = validate({ ...prepData, nrOfSteps: 2 });
    // expect(answer).toEqual(4873);
  });
  // Step 2:50
  it("validate testData", () => {
    const fileData = loadData("myData.txt");
    const prepData = prepareData(fileData);
    const { answer } = validate({ ...prepData, nrOfSteps: 50 });
    expect(answer).toEqual(16394);
  });
});
