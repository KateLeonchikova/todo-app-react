import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../Form";
import { TodoContext } from "../../Context/TodoProvider";

const mockDispatch = jest.fn();

const renderComponent = () => {
  return render(
    <TodoContext.Provider value={{ dispatch: mockDispatch, todos: [] }}>
      <Form />
    </TodoContext.Provider>
  );
};

describe("Form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render Form component", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("Input some task ...")
    ).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should update input value when typing", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Input some task ...");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input).toHaveValue("New Task");
  });

  test("should call dispatch with data on form submit", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Input some task ...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "ADD_TODO",
        payload: { id: expect.any(String), text: "New Task", isChecked: false },
      });
    });
  });
});
