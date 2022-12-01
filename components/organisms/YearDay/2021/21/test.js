const path = require("path");
const fs = require("fs");
import { validate, validate2 } from "./index";

const loadData = (fileName) =>
  fs.readFileSync(path.resolve(__dirname, "./", fileName), "utf8").split("\n");

describe("day 21", () => {
  // it("validate testData", () => {
  //   const { answer } = validate({ startPlayer1: 4, startPlayer2: 8 });
  //   expect(answer).toEqual(739785);
  // });
  // it("validate myData", () => {
  //   const { answer } = validate({ startPlayer1: 10, startPlayer2: 3 });
  //   expect(answer).toEqual(0);
  // });

  // Step 2
  it("validate testData", () => {
    const { answer } = validate({ startPlayer1: 4, startPlayer2: 8 });
    expect(answer).toEqual(444356092776315);
  });
});
