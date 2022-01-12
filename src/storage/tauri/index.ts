import { Board } from "../../model/board";
import { IStorage } from "../storage";

export default class TauriFileStorage implements IStorage {
  read: (identifier: string) => Promise<Board> = async () => {
    return { title: "", lanes: [] };
  };
  write: (identifier: string, board: Board) => Promise<void> = async () => {};
}
