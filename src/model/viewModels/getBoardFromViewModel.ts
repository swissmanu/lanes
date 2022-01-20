import { BoardViewModel } from ".";
import { Board } from "../board";

export default function getBoardFromViewModel(viewModel: BoardViewModel): Board {
  return {
    title: viewModel.title,
    lanes: viewModel.lanes.map((lane) => ({
      ...lane,
      tasks: viewModel.tasks.filter(({ laneId }) => laneId === lane.id),
    })),
  };
}
