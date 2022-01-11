import { Task } from "./task";

export interface TaskDragAndDropItem {
  readonly task: Task;
  index: number;
}

export interface TaskDragAndDropResult {
  readonly dropHandled: boolean;
}
