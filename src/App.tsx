import { FsTextFileOption, readTextFile, writeFile } from "@tauri-apps/api/fs";
import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import Board from "./components/Board";
import Intro from "./components/Intro";
import useFrontendEvent from "./hooks/useFrontendEvent";
import decodeMarkdown from "./io/md/decode";
import encodeMarkdown from "./io/md/encode";
import { BoardViewModel } from "./model/viewModels";
import getBoardFromViewModel from "./model/viewModels/getBoardFromViewModel";
import getViewModelFromBoard from "./model/viewModels/getViewModelFromBoard";
import { FrontendEventPayloads, NewFrontendEventName, OpenFrontendEventName } from "./tauri/frontendEvents";
import blue from "./theme/blue";

function App() {
  const [boardViewModel, setBoardViewModel] = React.useState<BoardViewModel | null>(null);

  const onChangeBoardViewModel = React.useCallback(async (boardViewModel: BoardViewModel) => {
    setBoardViewModel(boardViewModel);

    if (boardViewModel.filePath) {
      const board = getBoardFromViewModel(boardViewModel);
      const markdownString = encodeMarkdown(board);
      const textFileOptions: FsTextFileOption = { path: boardViewModel.filePath, contents: markdownString };
      await writeFile(textFileOptions);
    }
  }, []);

  const onOpenFrontendEvent = React.useCallback(
    async ({ path }: FrontendEventPayloads[typeof OpenFrontendEventName]) => {
      const markdownString = await readTextFile(path);
      const board = decodeMarkdown(markdownString);
      const viewModel = getViewModelFromBoard(board, path);
      setBoardViewModel(viewModel);
    },
    []
  );

  const onNewFrontendEvent = React.useCallback(() => {
    setBoardViewModel({ lanes: [], tasks: [], title: "New Board" });
  }, []);

  useFrontendEvent(OpenFrontendEventName, onOpenFrontendEvent);
  useFrontendEvent(NewFrontendEventName, onNewFrontendEvent);

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
  background: ${(props) => props.theme.board.background};
  font-family: 'Helvetica Neue', 'Arial Nova', Helvetica, Arial, sans-serif;
}

#root {
  height: 100%;
}
`;
