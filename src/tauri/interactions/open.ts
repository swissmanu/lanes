import { dialog } from "@tauri-apps/api";
import { readTextFile } from "@tauri-apps/api/fs";
import decodeMarkdown from "../../io/md/decode";
import { BoardViewModel } from "../../model/viewModels";
import getViewModelFromBoard from "../../model/viewModels/getViewModelFromBoard";
import { dialogFilter } from "./util";

export default async function open(): Promise<BoardViewModel | null> {
  const selection = await dialog.open({ filters: dialogFilter });
  const path = Array.isArray(selection) ? selection[0] : selection;

  if (path) {
    const markdownString = await readTextFile(path);
    const board = decodeMarkdown(markdownString);
    const viewModel = getViewModelFromBoard(board, path);
    return viewModel;
  }
  return null;
}
