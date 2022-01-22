import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { BoardViewModel } from "../model/viewModels";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import DragLayer from "./DragLayer";
import Lane from "./Lane";

const BoardContainer = styled.div`
  padding: 16px;
`;

const HiddenTitle = styled.h1`
  display: none;
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0px 16px 0px;
  color: white;
`;

const TitleEditor = styled.textarea`
  background: none;
  border: none;
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0px 16px 0px;
  resize: none;
  color: white;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    color: black;
    background: white;
    cursor: unset;
  }
`;

const Lanes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  gap: 8px;
`;

interface BoardProps {
  board: BoardViewModel;
  onChange: (board: BoardViewModel) => void;
}

const Board: React.FC<BoardProps> = ({ board: { lanes, tasks, title }, onChange }) => {
  const onMoveCard = React.useCallback(
    (...args: Tail<Parameters<typeof moveCard>>) => {
      const nextTasks = moveCard(tasks, ...args);
      onChange({ lanes, tasks: nextTasks, title });
    },
    [lanes, onChange, tasks, title]
  );

  return (
    <BoardContainer>
      <HiddenTitle>{title}</HiddenTitle>
      <TitleEditor autoCorrect="off" spellCheck="false" autoComplete="off">
        {title}
      </TitleEditor>
      <DndProvider backend={HTML5Backend}>
        <DragLayer />
        <Lanes>
          {lanes.map((lane) => (
            <div key={lane.id}>
              <Lane
                lane={lane}
                tasks={tasks.filter((t) => t.laneId === lane.id) /* TODO Do this better*/}
                onChange={() => {}}
                onMoveCard={onMoveCard}
              />
            </div>
          ))}
        </Lanes>
      </DndProvider>
    </BoardContainer>
  );
};
export default Board;
