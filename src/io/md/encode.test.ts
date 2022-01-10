import boardFixture from "../../model/fixture/board";
import encode from "./encode";
import astFixture from "./fixtures/ast";

describe("encodeMarkdown()", () => {
  test("encodes a Board to an Markdown AST", () => {
    expect(encode(boardFixture)).toEqual(astFixture);
  });
});
