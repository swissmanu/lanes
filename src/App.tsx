import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import Board from "./components/Board";
import Intro from "./components/Intro";
import useFrontendEvent from "./hooks/useFrontendEvent";
import { BoardViewModel } from "./model/viewModels";
import {
  NewFrontendEventName,
  OpenFrontendEventName,
  SaveAsFrontendEventName,
  SaveFrontendEventName,
} from "./tauri/frontendEvents";
import open from "./tauri/interactions/open";
import save from "./tauri/interactions/save";
import blue from "./theme/blue";

function App() {
  const [boardViewModel, setBoardViewModel] = React.useState<BoardViewModel | null>(null);

  const onChangeBoardViewModel = React.useCallback(async (boardViewModel: BoardViewModel) => {
    setBoardViewModel(boardViewModel);
  }, []);

  const onNewFrontendEvent = React.useCallback(() => {
    setBoardViewModel({ lanes: [], tasks: [], title: "New Board" });
  }, []);

  const onOpenFrontendEvent = React.useCallback(async () => {
    const viewModel = await open();
    if (viewModel) {
      setBoardViewModel(viewModel);
    }
  }, []);

  const onSaveFrontendEvent = React.useCallback(async () => {
    if (boardViewModel) {
      const filePath = await save(boardViewModel);
      if (filePath) {
        setBoardViewModel({ ...boardViewModel, filePath });
      }
    }
  }, [boardViewModel]);

  const onSaveAsFrontendEvent = React.useCallback(async () => {
    if (boardViewModel) {
      const filePath = await save(boardViewModel, true);
      if (filePath) {
        setBoardViewModel({ ...boardViewModel, filePath });
      }
    }
  }, [boardViewModel]);

  useFrontendEvent(OpenFrontendEventName, onOpenFrontendEvent);
  useFrontendEvent(NewFrontendEventName, onNewFrontendEvent);
  useFrontendEvent(SaveFrontendEventName, onSaveFrontendEvent);
  useFrontendEvent(SaveAsFrontendEventName, onSaveAsFrontendEvent);

  return (
    <>
      <Reset />
      <ThemeProvider theme={blue}>
        <GlobalStyles />
        {boardViewModel ? <Board board={boardViewModel} onChange={onChangeBoardViewModel} /> : <Intro />}
      </ThemeProvider>
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
body {
  height: 100vh;
  font-family: 'Helvetica Neue', 'Arial Nova', Helvetica, Arial, sans-serif;
}

#root {
  height: 100%;
}
`;
