import React from "react";
import styled from "styled-components";
import { Board as BoardModel } from "../model/board";
import Lane from "./Lane";

const Title = styled.h1``;

const Lanes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 8px;
`;

interface BoardProps {
  board: BoardModel;
}

const Board: React.FC<BoardProps> = ({ board: { title, lanes } }) => {
  return (
    <>
      <Title>{title}</Title>
      <Lanes>
        {lanes.map((lane) => (
          <div>
            <Lane key={lane.id} lane={lane} />
          </div>
        ))}
      </Lanes>
    </>
  );
};
export default Board;
