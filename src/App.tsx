import React from "react";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";
import getViewModelFromBoard from "./model/viewModels/getViewModelFromBoard";

function App() {
  const [boardViewModel, setBoardViewModel] = React.useState(getViewModelFromBoard(boardFixture));

  return (
    <>
      <Reset />
      <GlobalStyles />
      <Board board={boardViewModel} onChange={setBoardViewModel} />
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
