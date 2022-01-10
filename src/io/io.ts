import { Board } from "../model/board";

export type Encoder<Output> = (board: Board) => Output;
export type Decoder<Input> = (input: Input) => Board;
