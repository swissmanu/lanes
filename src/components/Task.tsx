import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Task as TaskModel } from "../model/task";
import {
  TaskDragAndDropItem,
  TaskDragAndDropResult,
} from "../model/taskDragAndDrop";
import Card from "./Card";
import Editable from "./Editable";

interface TaskProps {
  task: TaskModel;
  index: number;
  onChange: (task: TaskModel) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, onChange, onMove }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onChangeTitle = React.useCallback(
    (title: string) => {
      onChange({ ...task, title });
    },
    [onChange, task]
  );

  const [{ dragging }, drag, preview] = useDrag<
    TaskDragAndDropItem,
    unknown,
    { dragging: boolean }
  >(
    () => ({
      type: "task",
      item: { task, index },
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
    }),
    [task]
  );

  const [, drop] = useDrop<TaskDragAndDropItem, TaskDragAndDropResult, unknown>(
    {
      accept: "task",
      drop: () => ({ dropHandled: true }),
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        // Dont replace task with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

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

        // Time to actually perform the action
        onMove(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    },
    [onMove, index]
  );

  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(drop(ref));

  return (
    <Card ref={ref} dragging={dragging}>
      <Editable value={task.title} onChange={onChangeTitle}>
        {(title) => title}
      </Editable>
    </Card>
  );
};
export default Task;
