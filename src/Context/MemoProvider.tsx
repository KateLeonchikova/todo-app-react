import { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { TodoContext } from "./TodoProvider";
import { Todo } from "../models/Todo";

interface MemoContextType {
  filterType: string;
  filteredTodos: Todo[];
  itemCount: number;
  showAllTodos: () => void;
  showOnlyCompleted: () => void;
  showOnlyUndone: () => void;
}

export const MemoContext = createContext<MemoContextType | undefined>(
  undefined
);

export const MemoProvider = ({ children }: { children: ReactNode }) => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error("TodoContext is not provided");
  }

  const { todos } = todoContext;

  const [filterType, setFilterType] = useState("all");

  const filteredTodos = useMemo(() => {
    if (filterType === "completed") {
      return todos.filter((todo) => todo.isChecked);
    } else if (filterType === "undone") {
      return todos.filter((todo) => !todo.isChecked);
    } else {
      return todos;
    }
  }, [todos, filterType]);

  const itemCount = useMemo(() => {
    return filteredTodos.filter((todo) => !todo.isChecked).length;
  }, [filteredTodos]);

  return (
    <MemoContext.Provider
      value={{
        filterType,
        filteredTodos,
        itemCount,
        showAllTodos: () => setFilterType("all"),
        showOnlyCompleted: () => setFilterType("completed"),
        showOnlyUndone: () => setFilterType("undone"),
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};
