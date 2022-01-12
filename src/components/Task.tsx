import React from "react";
import { Task as TaskModel } from "../model/task";

interface TaskProps {
  task: TaskModel;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <>
      <div>{task.title}</div>
      {task.notes ? <div>{task.notes}</div> : null}
    </>
  );
};
export default Task;
