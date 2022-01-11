import React from "react";
import styled from "styled-components";
import { Lane as LaneModel } from "../model/lane";
import { Task as TaskModel } from "../model/task";
import updateInArray from "../util/immutable/updateInArray";
import Task from "./Task";

const Title = styled.h2``;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface LaneProps {
  lane: LaneModel;
  onChange: (lane: LaneModel) => void;
}

const Lane: React.FC<LaneProps> = ({ lane, onChange }) => {
  const createOnChangeTask = React.useCallback(
    (index: number) => (task: TaskModel) => {
      onChange({
        ...lane,
        tasks: [
          ...lane.tasks.slice(0, index),
          task,
          ...lane.tasks.slice(index + 1),
        ],
      });
    },
    [lane, onChange]
  );

  return (
    <>
      <Title>{lane.title}</Title>
      <Tasks>
        {lane.tasks.map((task, i) => (
          <Task key={task.id} task={task} onChange={createOnChangeTask(i)} />
        ))}
      </Tasks>
    </>
  );
};
export default Lane;
