import React, { useState, useEffect } from "react";
import Axios from "axios";

const Edit = (props) => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos = await Axios.get(
      `https://jsonplaceholder.typicode.com/todos/${props.match.params.id}`
    );
    setTodo(todos.data);
  };

  const renderTodo = () => {
    if (todo)
      return (
        <div>
          <input
            value={todo.title}
            onChange={(event) => {
              setTodo({
                ...todo,
                title: event.target.value,
              });
            }}
          />
          <div>{todo.id}</div>
          <button
            onClick={async () => {
              await Axios.put(
                `https://jsonplaceholder.typicode.com/todos/${props.match.params.id}`,
                {
                  ...todo,
                }
              );
              props.history.push("/");
            }}
          >
            Edit
          </button>
        </div>
      );
    else return null;
  };

  return <div>{renderTodo()}</div>;
};

export default Edit;
