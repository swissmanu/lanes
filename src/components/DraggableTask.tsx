import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Task as TaskModel } from "../model/task";
import { TaskDragAndDropResult } from "../model/taskDragAndDrop";
import { TaskViewModel } from "../model/viewModels";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import Card from "./Card";
import Task from "./Task";

interface TaskProps {
  task: TaskViewModel;
  onChange: (task: TaskModel) => void;
  onMove: (...x: Tail<Parameters<typeof moveCard>>) => void;
}

const DraggableTask: React.FC<TaskProps> = ({ task, onChange, onMove }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onChangeTitle = React.useCallback(
    (title: string) => {
      onChange({ ...task, title });
    },
    [onChange, task]
  );

  const [{ dragging }, drag, preview] = useDrag<TaskViewModel, unknown, { dragging: boolean }>(
    () => ({
      type: "task",
      item: task,
      collect: (monitor) => ({
        dragging: monitor.getItem()?.id === task.id,
      }),
    }),
    [task]
  );

  const [, drop] = useDrop<TaskViewModel, TaskDragAndDropResult, unknown>(
    {
      accept: "task",
      drop: () => {
        return { dropHandled: true };
      },
      hover: (item) => {
        if (!ref.current) {
          return;
        }
        const hoverIndex = task.index;
        onMove(item.id, hoverIndex, task.laneId);
      },
    },
    [onMove, task]
  );

  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(drop(ref));

  return (
    <Card ref={ref} dragging={dragging}>
      <Task task={task} />
    </Card>
  );
};
export default DraggableTask;
