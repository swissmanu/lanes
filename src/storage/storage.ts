import { Board } from "../model/board";

type Identifier = string;

export interface IStorage {
  read: (identifier: Identifier) => Promise<Board>;
  write: (identifier: Identifier, board: Board) => Promise<void>;
}

