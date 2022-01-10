import React from "react";
import styled from "styled-components";
import { Task as TaskModel } from "../model/task";

const Card = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 8px;
`;

interface TaskProps {
  task: TaskModel;
}

const Task: React.FC<TaskProps> = ({ task: { title } }) => {
  return <Card>{title}</Card>;
};
export default Task;
