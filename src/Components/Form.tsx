import { useContext, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { TodoContext } from "../Context/TodoProvider";
import { nanoid } from "nanoid";

const Form = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoContext is not provided");
  }

  const { dispatch } = context;

  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = { id: nanoid(), text, isChecked: false };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setText("");
  };

  return (
    <div className="container">
      <form className="input__form" onSubmit={handleSubmit}>
        <div className="input__container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Input some task ..."
            required
          />
        </div>
        <button className="btn btn__submit" type="submit">
          <BiPlusCircle />
        </button>
      </form>
    </div>
  );
};

export default Form;
