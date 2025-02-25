import { useContext } from "react";
import { TodoContext } from "../Context/TodoProvider";
import { MemoContext } from "../Context/MemoProvider";

const Section = () => {
  const todoContext = useContext(TodoContext);
  const memoContext = useContext(MemoContext);

  if (!todoContext || !memoContext) {
    throw new Error("TodoContext is not provided");
  }

  const { dispatch, todos } = todoContext;

  const {
    filterType,
    itemCount,
    showAllTodos,
    showOnlyCompleted,
    showOnlyUndone,
  } = memoContext;

  const clearAllChecked = () => {
    dispatch({ type: "DELETE_ALL_CHECKED" });
  };

  return (
    <section className="container">
      <div className="section">
        <p className="section__counter">{itemCount} items left</p>

        {todos.length > 0 && (
          <>
            <div className="section__filterBox">
              <button
                className={`btn ${filterType === "all" && "active"}`}
                onClick={showAllTodos}
              >
                All
              </button>
              <button
                className={`btn ${filterType === "undone" && "active"}`}
                onClick={showOnlyUndone}
              >
                Active
              </button>
              <button
                className={`btn ${filterType === "completed" && "active"}`}
                onClick={showOnlyCompleted}
              >
                Completed
              </button>
            </div>
            <div className="section__corner">
              <button className="btn" onClick={clearAllChecked}>
                Clear Completed
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Section;
