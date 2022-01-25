import { readFile } from "fs/promises";
import { join } from "path";
import boardFixture from "../../model/fixture/board";
import encode from "./encode";

describe("encodeMarkdown()", () => {
  let markdownString: string;

  beforeAll(async () => {
    markdownString = (await readFile(join(__dirname, "fixtures", "board.md"))).toString();
  });

  test("encodes a Board to a Markdown string", () => {
    expect(encode(boardFixture)).toEqual(markdownString);
  });
});
