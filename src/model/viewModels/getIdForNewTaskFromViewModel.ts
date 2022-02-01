import { BoardViewModel } from ".";

export default function getIdForNewTaskFromViewModel(viewModel: BoardViewModel): string {
  return `t${viewModel.tasks.length + 1}`;
}
