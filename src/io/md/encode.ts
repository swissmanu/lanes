import { Root } from "mdast";
import { heading, list, listItem, paragraph, root, text } from "mdast-builder";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { Node } from "unist";
import { Encoder } from "../io";

const encodeMarkdown: Encoder<string> = (board) => {
  const ast = root([
    heading(1, [text(board.title)]),
    ...board.lanes.reduce<ReadonlyArray<Node>>(
      (acc, lane) => [
        ...acc,
        heading(2, [text(lane.title)]),
        list(
          "unordered",
          lane.tasks.map((task) =>
            listItem([paragraph([text(task.notes ? `${task.title}\n${task.notes}` : task.title)])])
          )
        ),
      ],
      []
    ),
  ]) as Root;

  const markdownString = unified()
    .use(remarkStringify, {
      listItemIndent: "one",
    })
    .stringify(ast);
  return markdownString;
};
export default encodeMarkdown;
