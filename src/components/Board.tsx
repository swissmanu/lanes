import React from "react";
import styled from "styled-components";
import { Board as BoardModel } from "../model/board";
import { Lane as LaneModel } from "../model/lane";
import Lane from "./Lane";

const Title = styled.h1``;

const Lanes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 16px;
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
      <Lanes>
        {board.lanes.map((lane, i) => (
          <div>
            <Lane key={lane.id} lane={lane} onChange={createOnChangeLane(i)} />
          </div>
        ))}
      </Lanes>
    </>
  );
};
export default Board;
