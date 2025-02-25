import { useContext } from "react";
import { BiCheck, BiTrashAlt } from "react-icons/bi";
import { TodoContext } from "../Context/TodoProvider";
import { Todo } from "../models/Todo";

const TodoList = ({ id, isChecked, text }: Todo) => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoContext is not provided");
  }
  const { dispatch } = context;

  const checkTodo = () => {
    dispatch({ type: "CHECK_TODO", payload: id });
  };

  const deleteTodo = () => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <li className="todos__item">
      <button
        className="btn checkBtn btn__circle"
        onClick={checkTodo}
        aria-label="check"
      >
        <BiCheck />
      </button>

      <p className={`todos__text ${isChecked && "liChecked"}`}>{text}</p>

      <button
        className="btn trashBtn btn__circle"
        onClick={deleteTodo}
        aria-label="delete"
      >
        <BiTrashAlt />
      </button>
    </li>
  );
};

export default TodoList;
