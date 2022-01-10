import { Board } from "../../model/board";
import boardFixture from "../../model/fixture/board";
import decode from "./decode";
import astFixture from "./fixtures/ast";

describe("decodeMarkdown()", () => {
  test("decodes a Markdown AST to a Board", () => {
    expect(decode(astFixture)).toEqual<Board>(boardFixture);
  });
});
