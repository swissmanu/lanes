import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { BoardViewModel, LaneViewModel } from "../model/viewModels";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import CreateLane from "./CreateLane";
import DragLayer from "./DragLayer";
import Lane from "./Lane";
import TextEditor from "./TextEditor";

const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 0px 14px;
  margin: 32px 0px 16px 0px;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const HiddenTitle = styled.h1`
  display: none;
`;
const TitleEditor = styled(TextEditor)`
  min-height: 26px;
`;

const Lanes = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  padding: 0 16px 16px 16px;
`;
const LaneContainer = styled.div`
  flex: 0 0 270px;
  max-height: 100%;
`;

interface BoardProps {
  board: BoardViewModel;
  onChange: (board: BoardViewModel) => void;
}

const Board: React.FC<BoardProps> = ({ board: { lanes, tasks, title }, onChange }) => {
  const onChangeBoardTitle = React.useCallback(
    (t: string) => {
      if (t !== title) {
        onChange({ title: t, tasks, lanes });
      }
    },
    [lanes, onChange, tasks, title]
  );

  const onChangeLane = React.useCallback(
    (lane: LaneViewModel) => {
      onChange({
        title,
        tasks,
        lanes: lanes.map((l) => (lane.id === l.id ? lane : l)),
      });
    },
    [lanes, onChange, tasks, title]
  );

  const onCreateLane = React.useCallback(
    (title: string) => {
      onChange({
        title,
        tasks,
        lanes: [...lanes, { id: `l${lanes.length + 1}`, title }],
      });
    },
    [lanes, onChange, tasks]
  );

  const onMoveCard = React.useCallback(
    (...args: Tail<Parameters<typeof moveCard>>) => {
      const nextTasks = moveCard(tasks, ...args);
      if (nextTasks !== tasks) {
        onChange({ lanes, tasks: nextTasks, title });
      }
    },
    [lanes, onChange, tasks, title]
  );

  return (
    <BoardContainer>
      <Header>
        <HiddenTitle>{title}</HiddenTitle>
        <TitleEditor value={title} onChange={onChangeBoardTitle} />
      </Header>
      <DndProvider backend={HTML5Backend}>
        <DragLayer />
        <Lanes>
          {lanes.map((lane) => (
            <LaneContainer key={lane.id}>
              <Lane
                lane={lane}
                tasks={tasks.filter((t) => t.laneId === lane.id) /* TODO Do this better*/}
                onChange={onChangeLane}
                onMoveCard={onMoveCard}
              />
            </LaneContainer>
          ))}
          <LaneContainer>
            <CreateLane onCreate={onCreateLane} />
          </LaneContainer>
        </Lanes>
      </DndProvider>
    </BoardContainer>
  );
};
export default Board;
