import React from "react";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";
import { Reset } from "styled-reset";

function App() {
  const [board, setBoard] = React.useState(boardFixture);
  return (
    <>
      <Reset />
      <Board board={board} onChange={setBoard} />
    </>
  );
}

export default App;
