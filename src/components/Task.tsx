import React from "react";
import styled from "styled-components";
import { Task as TaskModel } from "../model/task";

interface TaskProps {
  task: TaskModel;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div``;
const Notes = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Layout>
      <Title>{task.title}</Title>
      {task.notes ? <Notes>{task.notes}</Notes> : null}
    </Layout>
  );
};
export default Task;
