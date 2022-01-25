import { toMarkdown } from "mdast-util-to-markdown";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { Lane } from "../../model/lane";
import { Task } from "../../model/task";
import { Decoder } from "../io";

const decodeMarkdown: Decoder<string> = (markdownString) => {
  let boardTitle = "";
  const lanes: Lane[] = [];
  let laneId = 0;
  let taskId = 0;

  const ast = unified().use(remarkParse).parse(markdownString);

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
          const [firstChild] = listItem.children;
          if (firstChild?.type === "paragraph") {
            const text = toMarkdown(firstChild.children[0]).trim();
            const [title, ...notes] = text.split("\n");
            tasks.push({
              id: `t${++taskId}`,
              title,
              ...(notes.length > 0 ? { notes: notes.join("\n") } : {}),
            });
          }
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
