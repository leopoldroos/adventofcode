import { removeAllExcept } from "./createRegularExpression";

describe("createRegularExpression", () => {
  describe("removeAllExcept", () => {
    it('should remove all chars except "a"', () => {
      const res = "a s d s aa sdA".replace(removeAllExcept("a"), "");
      expect(res).toEqual("aaa");
    });
    it('should remove all chars except "0123456789,"', () => {
      const res = "a1 s d 23s aa sdA,".replace(removeAllExcept("0-9,"), "");
      expect(res).toEqual("123,");
    });
  });
});
