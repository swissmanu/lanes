import { readFile } from "fs/promises";
import { join } from "path";
import { Board } from "../../model/board";
import boardFixture from "../../model/fixture/board";
import decode from "./decode";

describe("decodeMarkdown()", () => {
  let markdownString: string;

  beforeAll(async () => {
    markdownString = (await readFile(join(__dirname, "fixtures", "board.md"))).toString();
  });

  test("decodes a Markdown string to a Board", () => {
    expect(decode(markdownString)).toEqual<Board>(boardFixture);
  });
});
