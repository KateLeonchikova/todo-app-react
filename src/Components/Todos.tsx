import { useContext } from "react";
import TodoList from "./TodoList";
import AlertMsg from "./AlertMsg";
import { MemoContext } from "../Context/MemoProvider";

const Todos = () => {
  const context = useContext(MemoContext);

  if (!context) {
    throw new Error("TodoContext is not provided");
  }

  const { filteredTodos } = context;

  return (
    <div className="container">
      <ul className="todos__list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoList key={todo.id} {...todo} />)
        ) : (
          <AlertMsg />
        )}
      </ul>
    </div>
  );
};

export default Todos;
