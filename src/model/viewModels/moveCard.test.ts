import { TaskViewModel } from ".";
import moveCard from "./moveCard";

describe("moveCard()", () => {
  const tasks: ReadonlyArray<TaskViewModel> = [
    { id: "t1", index: 0, laneId: "l1", title: "Task A" },
    { id: "t2", index: 1, laneId: "l1", title: "Task B" },
    { id: "t3", index: 2, laneId: "l2", title: "Task C" },
    { id: "t4", index: 3, laneId: "l2", title: "Task D" },
  ];

  test("returns the same tasks when index did not change", () => {
    expect(moveCard(tasks, tasks[1].id, 1)).toBe(tasks);
  });

  test("moves tasks within the same lane from above to below", () => {
    expect(moveCard(tasks, tasks[2].id, 3)).toEqual([
      tasks[0],
      tasks[1],
      { ...tasks[3], index: 2 },
      { ...tasks[2], index: 3 },
    ]);
    expect(moveCard(tasks, tasks[0].id, 1)).toEqual([
      { ...tasks[1], index: 0 },
      { ...tasks[0], index: 1 },
      tasks[2],
      tasks[3],
    ]);
  });

  test("moves tasks within the same lane from below to above", () => {
    expect(moveCard(tasks, tasks[3].id, 2)).toEqual([
      tasks[0],
      tasks[1],
      { ...tasks[3], index: 2 },
      { ...tasks[2], index: 3 },
    ]);
    expect(moveCard(tasks, tasks[1].id, 0)).toEqual([
      { ...tasks[1], index: 0 },
      { ...tasks[0], index: 1 },
      tasks[2],
      tasks[3],
    ]);
  });

  test("moves tasks between lanes", () => {
    expect(moveCard(tasks, tasks[3].id, 2, "l1")).toEqual([
      tasks[0],
      tasks[1],
      { ...tasks[3], index: 2, laneId: "l1" },
      { ...tasks[2], index: 3 },
    ]);
  });

  // Example: Move to another lane, but do not give new laneId
  test.todo("fails if the moved task breaks the lane consistency");

  test("does only update tasks involved in a move operation", () => {
    const lower = moveCard(tasks, tasks[3].id, 2);
    expect(lower[0]).toBe(tasks[0]);
    expect(lower[1]).toBe(tasks[1]);
    expect(lower[2]).not.toBe(tasks[2]);
    expect(lower[3]).not.toBe(tasks[3]);

    const upper = moveCard(tasks, tasks[1].id, 0);
    expect(upper[0]).not.toBe(tasks[0]);
    expect(upper[1]).not.toBe(tasks[1]);
    expect(upper[2]).toBe(tasks[2]);
    expect(upper[3]).toBe(tasks[3]);
  });
});
