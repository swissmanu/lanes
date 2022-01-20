import React from "react";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";
import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";

function App() {
  const [board, setBoard] = React.useState(boardFixture);
  return (
    <>
      <Reset />
      <GlobalStyles />
      <Board board={board} onChange={setBoard} />
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
body {
  background: #0079BF;
  font-family: 'Helvetica Neue', 'Arial Nova', Helvetica, Arial, sans-serif;
}
`;
