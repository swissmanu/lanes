import { Root } from "mdast";
import { heading, list, listItem, root, text } from "mdast-builder";

const astFixture = root([
  heading(1, [text("Board")]),
  heading(2, [text("Lane 1")]),
  list("unordered", [
    listItem([text("Task 1.1")]),
    listItem([text("Task 1.2")]),
  ]),
  heading(2, [text("Lane 2")]),
  list("unordered", [listItem([text("Task 2.1")]), listItem([text("Task 2.2")])]),
]) as Root;
export default astFixture;
