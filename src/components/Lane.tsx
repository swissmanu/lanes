import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { Lane as LaneModel } from "../model/lane";
import { Task as TaskModel } from "../model/task";
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

  const [, dropRef] = useDrop<TaskModel, unknown, unknown>(
    () => ({
      accept: "task",
      drop: (task) => {
        onChange({
          ...lane,
          tasks: [...lane.tasks, task],
        });
      },
    }),
    [onChange, lane]
  );

  return (
    <div ref={dropRef}>
      <Title>{lane.title}</Title>
      <Tasks>
        {lane.tasks.map((task, i) => (
          <Task key={task.id} task={task} onChange={createOnChangeTask(i)} />
        ))}
      </Tasks>
    </div>
  );
};
export default Lane;
