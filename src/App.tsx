import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import Board from "./components/Board";
import boardFixture from "./model/fixture/board";
import { BoardViewModel } from "./model/viewModels";
import getViewModelFromBoard from "./model/viewModels/getViewModelFromBoard";
import blue from "./theme/blue";

function App() {
  const [boardViewModel, setBoardViewModel] = React.useState(getViewModelFromBoard(boardFixture));

  const onChangeBoardViewModel = React.useCallback((boardViewModel: BoardViewModel) => {
    console.log(boardViewModel);
    setBoardViewModel(boardViewModel);
  }, []);

  return (
    <>
      <Reset />
      <ThemeProvider theme={blue}>
        <GlobalStyles />
        <Board board={boardViewModel} onChange={onChangeBoardViewModel} />
      </ThemeProvider>
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
body {
  height: 100vh;
  background: ${(props) => props.theme.board.background};
  font-family: 'Helvetica Neue', 'Arial Nova', Helvetica, Arial, sans-serif;
}

#root {
  height: 100%;
}
`;
