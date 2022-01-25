import { Lane } from "../lane";
import { Task } from "../task";

export interface TaskViewModel extends Task {
  laneId: string;
  index: number;
}

export type LaneViewModel = Omit<Lane, "tasks">;

export interface BoardViewModel {
  filePath?: string;

  title: string;

  lanes: ReadonlyArray<LaneViewModel>;

  /**
   * Precondition: Ordered after lane and task
   */
  tasks: ReadonlyArray<TaskViewModel>;
}
