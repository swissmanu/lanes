import { Root } from "mdast";
import { heading, list, listItem, root, text } from "mdast-builder";
import { Node } from "unist";
import { Encoder } from "../io";

const encodeMarkdown: Encoder<Root> = (board) => {
  return root([
    heading(1, [text(board.title)]),
    ...board.lanes.reduce<ReadonlyArray<Node>>(
      (acc, lane) => [
        ...acc,
        heading(2, [text(lane.title)]),
        list(
          "unordered",
          lane.tasks.map((task) => listItem([text(task.title)]))
        ),
      ],
      []
    ),
  ]) as Root;
};
export default encodeMarkdown;
