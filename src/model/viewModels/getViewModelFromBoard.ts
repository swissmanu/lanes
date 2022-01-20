import { Board } from "../board";
import { BoardViewModel } from "./index";

export default function getViewModelFromBoard(board: Board): BoardViewModel {
  let taskIndex = 0;
  return {
    title: board.title,
    lanes: board.lanes.map(({ id, title }) => ({ id, title })),
    tasks: board.lanes.reduce(
      (acc: BoardViewModel["tasks"], lane) => [
        ...acc,
        ...lane.tasks.map((task) => ({ ...task, laneId: lane.id, index: taskIndex++ })),
      ],
      []
    ),
  };
}
