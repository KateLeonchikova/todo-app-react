import { createContext, ReactNode, useEffect, useReducer } from "react";
import TodoReducer from "../Reducer/TodoReducer";
import { TodoState } from "../models/TodoState";
import { Todo } from "../models/Todo";
import { TodoAction } from "../models/TodoAction";

interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

const initialState: TodoState = {
  todos: [],
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState, () => {
    const storedTodos = localStorage.getItem("todos");
    return {
      ...initialState,
      todos: storedTodos ? JSON.parse(storedTodos) : initialState.todos,
    };
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
