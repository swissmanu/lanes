import { BoardViewModel, TaskViewModel } from ".";

export default function moveCard(
  tasks: BoardViewModel["tasks"],
  taskId: TaskViewModel["id"],
  targetIndex: number,
  targetLaneId?: string
): BoardViewModel["tasks"] {
  const taskIndex = tasks.findIndex(({ id }) => id === taskId);
  if (taskIndex === -1 || taskIndex === targetIndex) {
    return tasks;
  }

  const task = tasks[taskIndex];

  const removed = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
  const nextTask = targetLaneId ? { ...task, laneId: targetLaneId } : task;
  const inserted = [...removed.slice(0, targetIndex), nextTask, ...removed.slice(targetIndex)];

  // TODO other way to do this?
  const [lowerBoundary, upperBoundary] = taskIndex > targetIndex ? [targetIndex, taskIndex] : [taskIndex, targetIndex];
  const withUpdatedIndices = [
    ...inserted.slice(0, lowerBoundary),
    ...inserted.slice(lowerBoundary, upperBoundary + 1).map((t, i) => ({ ...t, index: lowerBoundary + i })),
    ...inserted.slice(upperBoundary + 1),
  ];

  return withUpdatedIndices;
}
