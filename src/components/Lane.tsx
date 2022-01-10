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
  const onChangeTask = React.useCallback(
    (task: TaskModel) => {
      const updatedTasks = updateInArray(
        lane.tasks,
        ({ id }) => id === task.id,
        task
      );
      if (updatedTasks !== lane.tasks) {
        onChange({ ...lane, tasks: updatedTasks });
      }
    },
    [lane, onChange]
  );

  return (
    <>
      <Title>{lane.title}</Title>
      <Tasks>
        {lane.tasks.map((task) => (
          <Task key={task.id} task={task} onChange={onChangeTask} />
        ))}
      </Tasks>
    </>
  );
};
export default Lane;
