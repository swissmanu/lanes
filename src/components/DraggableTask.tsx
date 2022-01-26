import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Task as TaskModel } from "../model/task";
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

  const [, drop] = useDrop<TaskViewModel, unknown, unknown>(
    {
      accept: "task",
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }

        const hoverIndex = task.index;

        if (item.laneId === task.laneId) {
          const dragIndex = item.index;

          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        } else {
          // Modify Monitor Item 🤫
          item.laneId = task.laneId;
        }

        onMove(item.id, hoverIndex, task.laneId);
      },
    },
    [onMove, task.index, task.laneId]
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
