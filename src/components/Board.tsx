import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { Board as BoardModel } from "../model/board";
import { Lane as LaneModel } from "../model/lane";
import Lane from "./Lane";

const Title = styled.h1``;

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
  const createOnChangeLane = React.useCallback(
    (index: number) => (lane: LaneModel) => {
      onChange({
        ...board,
        lanes: [
          ...board.lanes.slice(0, index),
          lane,
          ...board.lanes.slice(index + 1),
        ],
      });
    },
    [board, onChange]
  );

  return (
    <>
      <Title>{board.title}</Title>
      <DndProvider backend={HTML5Backend}>
        <Lanes>
          {board.lanes.map((lane, i) => (
            <div key={lane.id}>
              <Lane lane={lane} onChange={createOnChangeLane(i)} />
            </div>
          ))}
        </Lanes>
      </DndProvider>
    </>
  );
};
export default Board;
