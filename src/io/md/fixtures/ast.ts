import { Root } from "mdast";
import { heading, list, listItem, paragraph, root, text } from "mdast-builder";

const astFixture = root([
  heading(1, [text("Board")]),
  heading(2, [text("Lane 1")]),
  list("unordered", [listItem([paragraph([text("Task 1.1")])]), listItem([paragraph([text("Task 1.2")])])]),
  heading(2, [text("Lane 2")]),
  list("unordered", [
    listItem([paragraph([text("Task 2.1\nLorem ipsum dolor amet.")])]),
    listItem([paragraph([text("Task 2.2")])]),
    listItem([paragraph([text("Task 2.3")])]),
    listItem([paragraph([text("Task 2.4\nDucimus ratione quisquam sunt voluptas voluptatem.")])]),
  ]),
  heading(2, [text("Lane 3")]),
  list("unordered", []),
]) as Root;
export default astFixture;
