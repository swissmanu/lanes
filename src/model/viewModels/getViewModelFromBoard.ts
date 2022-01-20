import { BoardViewModel } from "./index";
import { Board } from "../board";

export default function getViewModelFromBoard(board: Board): BoardViewModel {
  let taskIndex = 0;
  return {
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
