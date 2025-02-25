import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Section from "../Section";
import { TodoContext } from "../../Context/TodoProvider";
import { MemoContext } from "../../Context/MemoProvider";
import { Todo } from "../../models/Todo";

const mockTodos: Todo[] = [
  { id: "1", text: "Test todo 1", isChecked: false },
  { id: "2", text: "Test todo 2", isChecked: true },
];

const mockDispatch = jest.fn();
const showAllTodos = jest.fn();
const showOnlyCompleted = jest.fn();
const showOnlyUndone = jest.fn();

const renderComponent = () => {
  return render(
    <TodoContext.Provider value={{ todos: mockTodos, dispatch: mockDispatch }}>
      <MemoContext.Provider
        value={{
          filterType: "all",
          filteredTodos: mockTodos,
          itemCount: 1,
          showAllTodos,
          showOnlyCompleted,
          showOnlyUndone,
        }}
      >
        <Section />
      </MemoContext.Provider>
    </TodoContext.Provider>
  );
};

describe("Section", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render Section component", () => {
    renderComponent();

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Clear Completed")).toBeInTheDocument();
  });

  test("should show the correct number of items left", () => {
    renderComponent();

    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });

  test("should call showAllTodos when 'All' filter button is clicked", () => {
    renderComponent();

    const allButton = screen.getByText("All");
    fireEvent.click(allButton);

    expect(showAllTodos).toHaveBeenCalled();
  });

  test("should call showOnlyCompleted when 'Completed' filter button is clicked", () => {
    renderComponent();

    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    expect(showOnlyCompleted).toHaveBeenCalled();
  });

  test("should call showOnlyUndone when 'Active' filter button is clicked", () => {
    renderComponent();

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    expect(showOnlyUndone).toHaveBeenCalled();
  });

  test("should call clearAllChecked when 'Clear Completed' button is clicked", () => {
    renderComponent();

    const clearButton = screen.getByText("Clear Completed");
    fireEvent.click(clearButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "DELETE_ALL_CHECKED" });
  });
});
