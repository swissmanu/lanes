import { dialog } from "@tauri-apps/api";
import { FsTextFileOption, writeFile } from "@tauri-apps/api/fs";
import encodeMarkdown from "../../io/md/encode";
import { BoardViewModel } from "../../model/viewModels";
import getBoardFromViewModel from "../../model/viewModels/getBoardFromViewModel";
import { dialogFilter } from "./util";

type Path = string;

export default async function save(boardViewModel: BoardViewModel, saveAs = false): Promise<Path | null> {
  const path = saveAs
    ? await showSaveDialog(boardViewModel.filePath)
    : boardViewModel.filePath ?? (await showSaveDialog());

  if (path) {
    const board = getBoardFromViewModel(boardViewModel);
    const markdownString = encodeMarkdown(board);
    const textFileOptions: FsTextFileOption = { path, contents: markdownString };
    await writeFile(textFileOptions);
    return path;
  }
  return null;
}

function showSaveDialog(defaultPath?: Path): Promise<string | null> {
  return dialog.save({ filters: dialogFilter, defaultPath });
}
