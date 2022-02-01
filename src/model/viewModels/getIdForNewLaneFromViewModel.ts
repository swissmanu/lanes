import { BoardViewModel } from ".";

export default function getIdForNewLaneFromViewModel(viewModel: BoardViewModel): string {
  return `l${viewModel.lanes.length + 1}`;
}
