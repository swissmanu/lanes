import React from "react";
import styled from "styled-components";
import { Lane as LaneModel } from "../model/lane";
import { LaneViewModel, TaskViewModel } from "../model/viewModels";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import DraggableTask from "./DraggableTask";

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
  lane: LaneViewModel;
  tasks: ReadonlyArray<TaskViewModel>;
  onChange: (lane: LaneModel) => void;
  onMoveCard: (...x: Tail<Parameters<typeof moveCard>>) => void;
}

const Lane: React.FC<LaneProps> = ({ lane, tasks, onChange, onMoveCard }) => {
  // const createOnChangeTask = React.useCallback(
  //   (index: number) => (task: TaskModel) => {
  //     onChange({
  //       ...lane,
  //       tasks: [...lane.tasks.slice(0, index), task, ...lane.tasks.slice(index + 1)],
  //     });
  //   },
  //   [lane, onChange]
  // );

  return (
    <LaneContainer>
      <Title>{lane.title}</Title>
      <Tasks>
        {tasks.map((task, i) => (
          <DraggableTask key={task.id} task={task} onChange={() => {}} onMove={onMoveCard} />
        ))}
      </Tasks>
      <Footer />
    </LaneContainer>
  );
};
export default Lane;
