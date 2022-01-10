import { Lane } from "./lane";

export interface Board {
  readonly title: string;
  readonly lanes: ReadonlyArray<Lane>;
}
