import { Board } from "../board";

const boardFixture: Board = {
  title: "Board",
  lanes: [
    {
      id: "l1",
      title: "Lane 1",
      tasks: [
        { id: "t1", title: "Task 1.1" },
        { id: "t2", title: "Task 1.2" },
      ],
    },
    {
      id: "l2",
      title: "Lane 2",
      tasks: [
        { id: "t3", title: "Task 2.1", notes: "Lorem ipsum dolor amet." },
        { id: "t4", title: "Task 2.2" },
        { id: "t5", title: "Task 2.3" },
        {
          id: "t6",
          title: "Task 2.4",
          notes: "Ducimus ratione quisquam sunt voluptas voluptatem.",
        },
      ],
    },
    { id: "l3", title: "Lane 3", tasks: [] },
  ],
};
export default boardFixture;
