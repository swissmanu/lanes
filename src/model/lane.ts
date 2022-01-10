import { Identifiable } from "./identifiable";
import { Task } from "./task";

export interface Lane extends Identifiable {
  readonly title: string;
  readonly tasks: ReadonlyArray<Task>;
}
