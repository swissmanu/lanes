import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { Board as BoardModel } from "../model/board";
import getViewModelFromBoard from "../model/viewModels/getViewModelFromBoard";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import DragLayer from "./DragLayer";
import Lane from "./Lane";

const BoardContainer = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0px 16px 0px;
  color: white;
`;

const Lanes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  gap: 8px;
`;

interface BoardProps {
  board: BoardModel;
  onChange: (board: BoardModel) => void;
}

const Board: React.FC<BoardProps> = ({ board, onChange }) => {
  const { tasks, lanes } = React.useMemo(() => getViewModelFromBoard(board), [board]);

  const [tasksState, setTasksState] = React.useState(tasks);
  React.useEffect(() => setTasksState(tasks), [tasks]);

  const onMoveCard = React.useCallback(
    (...args: Tail<Parameters<typeof moveCard>>) => {
      setTasksState(moveCard(tasksState, ...args));
    },
    [tasksState]
  );

  return (
    <BoardContainer>
      <Title>{board.title}</Title>
      <DndProvider backend={HTML5Backend}>
        <DragLayer />
        <Lanes>
          {lanes.map((lane) => (
            <div key={lane.id}>
              <Lane
                lane={lane}
                tasks={tasksState.filter((t) => t.laneId === lane.id) /* TODO Do this better*/}
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
