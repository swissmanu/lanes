import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { Task as TaskModel } from "../model/task";
import StringInput from "./StringInput";

const Card = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 8px;
`;

interface TaskProps {
  task: TaskModel;
  onChange: (task: TaskModel) => void;
}

const Task: React.FC<TaskProps> = ({ task, onChange }) => {
  const onChangeTitle = React.useCallback(
    (title: string) => {
      onChange({ ...task, title });
    },
    [onChange, task]
  );

  const [, dragHandle, dragPreview] = useDrag(
    () => ({
      type: "task",
      item: task,
    }),
    [task]
  );

  return (
    <Card ref={dragPreview}>
      <div ref={dragHandle}>
        <StringInput value={task.title} onChange={onChangeTitle} />
      </div>
    </Card>
  );
};
export default Task;
