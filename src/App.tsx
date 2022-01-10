import React from "react";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";

function App() {
  const [board, setBoard] = React.useState(boardFixture);
  return <Board board={board} onChange={setBoard} />;
}

export default App;
