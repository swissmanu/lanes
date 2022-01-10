import React from "react";
import styled from "styled-components";
import { Board as BoardModel } from "../model/board";
import { Lane as LaneModel } from "../model/lane";
import updateInArray from "../util/immutable/updateInArray";
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
  const onChangeLane = React.useCallback(
    (lane: LaneModel) => {
      const updatedLanes = updateInArray(
        board.lanes,
        ({ id }) => id === lane.id,
        lane
      );
      if (updatedLanes !== board.lanes) {
        onChange({ ...board, lanes: updatedLanes });
      }
    },
    [board, onChange]
  );

  return (
    <>
      <Title>{board.title}</Title>
      <Lanes>
        {board.lanes.map((lane) => (
          <div>
            <Lane key={lane.id} lane={lane} onChange={onChangeLane} />
          </div>
        ))}
      </Lanes>
    </>
  );
};
export default Board;
