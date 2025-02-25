import { Todo } from "./Todo";

export type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "CHECK_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "DELETE_ALL_CHECKED" };
