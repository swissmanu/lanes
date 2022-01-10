import React from "react";
import styled from "styled-components";
import { Lane as LaneModel } from "../model/lane";
import Task from "./Task";

const Title = styled.h2``;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface LaneProps {
  lane: LaneModel;
}

const Lane: React.FC<LaneProps> = ({ lane: { title, tasks } }) => {
  return (
    <>
      <Title>{title}</Title>
      <Tasks>
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </Tasks>
    </>
  );
};
export default Lane;
