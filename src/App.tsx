import { readTextFile } from "@tauri-apps/api/fs";
import React from "react";
import remarkParse from "remark-parse";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import { unified } from "unified";
import Board from "./components/Board";
import Intro from "./components/Intro";
import useFrontendEvent from "./hooks/useFrontendEvent";
import decodeMarkdown from "./io/md/decode";
import { BoardViewModel } from "./model/viewModels";
import getViewModelFromBoard from "./model/viewModels/getViewModelFromBoard";
import { FrontendEventPayloads, NewFrontendEventName, OpenFrontendEventName } from "./tauri/frontendEvents";
import blue from "./theme/blue";

function App() {
  const [boardViewModel, setBoardViewModel] = React.useState<BoardViewModel | null>(null);

  const onChangeBoardViewModel = React.useCallback((boardViewModel: BoardViewModel) => {
    setBoardViewModel(boardViewModel);
  }, []);

  const onOpenFrontendEvent = React.useCallback(
    async ({ path }: FrontendEventPayloads[typeof OpenFrontendEventName]) => {
      const content = await readTextFile(path);
      const ast = unified().use(remarkParse).parse(content);
      const board = decodeMarkdown(ast);
      const viewModel = getViewModelFromBoard(board);
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
