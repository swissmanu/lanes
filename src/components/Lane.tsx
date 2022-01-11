import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import styled from "styled-components";
import { Lane as LaneModel } from "../model/lane";
import { Task as TaskModel } from "../model/task";
import {
  TaskDragAndDropItem,
  TaskDragAndDropResult,
} from "../model/taskDragAndDrop";
import Task from "./Task";

const LaneContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
`;

const Title = styled.h2`
  padding: 10px 8px;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
`;

const Footer = styled.div`
  height: 10px;
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

  const onMoveCard = React.useCallback(
    (fromIndex: number, toIndex: number) => {
      const removed = [
        ...lane.tasks.slice(0, fromIndex),
        ...lane.tasks.slice(fromIndex + 1),
      ];
      const inserted = [
        ...removed.slice(0, toIndex),
        lane.tasks[fromIndex],
        ...removed.slice(toIndex),
      ];
      onChange({ ...lane, tasks: inserted });
    },
    [lane, onChange]
  );

  const [, dropRef] = useDrop<
    TaskDragAndDropItem,
    TaskDragAndDropResult,
    unknown
  >(
    () => ({
      accept: "task",
      drop: (
        item,
        monitor: DropTargetMonitor<TaskDragAndDropItem, TaskDragAndDropResult>
      ) => {
        const prevDropResult = monitor.getDropResult();
        if (prevDropResult?.dropHandled) {
          // Do not handle this drop, if it was already handled before:
          return prevDropResult;
        }

        onChange({
          ...lane,
          tasks: [...lane.tasks, item.task],
        });

        return { dropHandled: true };
      },
    }),
    [onChange, lane]
  );

  return (
    <LaneContainer ref={dropRef}>
      <Title>{lane.title}</Title>
      <Tasks>
        {lane.tasks.map((task, i) => (
          <Task
            key={task.id}
            task={task}
            index={i}
            onChange={createOnChangeTask(i)}
            onMove={onMoveCard}
          />
        ))}
      </Tasks>
      <Footer />
    </LaneContainer>
  );
};
export default Lane;
