import { Identifiable } from "./identifiable";

export interface Task extends Identifiable {
  readonly title: string;
}
