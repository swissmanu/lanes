import { Board } from "../../model/board";
import { IStorage } from "../storage";

export default class LocalStorage implements IStorage {
  read: (identifier: string) => Promise<Board> = async () => {
    // const board = localStorage.getItem("board");

    // if (!board) {
    return { title: "Board", lanes: [] } as Board;
    // }

    // return board;
  };

  write: (identifier: string, board: Board) => Promise<void> = async (
    _,
    board
  ) => {
    localStorage.setItem("board", JSON.stringify(board));
  };
}
