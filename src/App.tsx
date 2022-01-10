import React from "react";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";

function App() {
  return <Board board={boardFixture} />;
}

export default App;
