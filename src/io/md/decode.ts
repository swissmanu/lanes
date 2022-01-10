import { Root } from "mdast";
import { Lane } from "../../model/lane";
import { Task } from "../../model/task";
import { Decoder } from "../io";
import { toMarkdown } from "mdast-util-to-markdown";
import { root } from "mdast-builder";

const decodeMarkdown: Decoder<Root> = (ast) => {
  let boardTitle = "";
  const lanes: Lane[] = [];
  let laneId = 0;
  let taskId = 0;

  for (const node of ast.children) {
    if (node.type === "heading") {
      if (node.depth === 1) {
        if (node.children[0]?.type === "text") {
          boardTitle = node.children[0].value;
        }
      }
    }
  }

  for (let i = 0; i < ast.children.length; i++) {
    const node = ast.children[i];

    if (node.type === "heading" && node.depth === 2) {
      const nextSibling = ast.children[i + 1];
      const laneTitle = toMarkdown(node.children[0]).trim();
      const tasks: Task[] = [];

      if (nextSibling?.type === "list") {
        for (const listItem of nextSibling.children) {
          tasks.push({
            id: `t${++taskId}`,
            title: toMarkdown(listItem.children[0]).trim(),
          });
        }
      }

      lanes.push({
        id: `l${++laneId}`,
        title: laneTitle,
        tasks: tasks,
      });
    }
  }

  return { title: boardTitle, lanes };
};
export default decodeMarkdown;
