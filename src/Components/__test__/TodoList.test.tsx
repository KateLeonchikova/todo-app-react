import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";
import { TodoContext } from "../../Context/TodoProvider";
import { Todo } from "../../models/Todo";

const mockDispatch = jest.fn();
const mockTodo: Todo = { id: "1", text: "Test todo", isChecked: false };

const renderComponent = (mockTodo: Todo) => {
  return render(
    <TodoContext.Provider value={{ dispatch: mockDispatch, todos: [mockTodo] }}>
      <TodoList {...mockTodo} />
    </TodoContext.Provider>
  );
};

describe("TodoList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render TodoList component", () => {
    renderComponent(mockTodo);

    expect(screen.getByText("Test todo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("should call checkTodo when check button is clicked", () => {
    renderComponent(mockTodo);

    const checkButton = screen.getByRole("button", { name: /check/i });
    fireEvent.click(checkButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CHECK_TODO",
      payload: "1",
    });
  });

  test("should call deleteTodo when delete button is clicked", () => {
    renderComponent(mockTodo);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DELETE_TODO",
      payload: "1",
    });
  });
});
