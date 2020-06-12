import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Home = (props) => {
  const dispatch = useDispatch();
  const todoStore = useSelector((state) => state.todo);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    getUser();
    return () => {
      dispatch({
        payload: [],
        type: "SET_TODO",
      });
    };
  }, []);

  const search = async (username) => {
    const userID = await getUserID(username);
    if (userID !== false) {
      const todos = await axios.get(
        `https://jsonplaceholder.typicode.com/todos`
      );
      const searchTodo = todos.data.filter((todo) => {
        if (todo.userId === userID) return true;
      });
      dispatch({
        payload: searchTodo,
        type: "SET_TODO",
      });
    }
  };

  const getUserID = async (username) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const selectedUser = res.data.filter((user) => {
      if (user.username === username) return true;
    });
    if (selectedUser.length > 0) return selectedUser[0].id;
    else return false;
  };
  const color = (item) => {
    if (item.completed) return "btn-success";
    else return "btn-danger";
  };

  return (
    <div className="container">
      <div>
        <input
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
          placeholder="username"
          style={{ width: "70%" }}
        />
        <button
          onClick={() => {
            search(inputValue);
          }}
          style={{ width: "30%", backgroundColor: "green" }}
        >
          search
        </button>
      </div>
      <div>
        <div className="d-flex justify-content-center h1">username</div>
        {users.map((item) => {
          return (
            <div className="d-flex justify-content-center">
              <button
                className={`btn btn-primary btn-lg mt-1 mb-1`}
                onClick={() => {
                  search(item.username);
                }}
              >
                {item.username}
              </button>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center h1">To do list</div>
      <div>
        {todoStore.todoLists.map((item) => {
          return (
            <div>
              <button
                className={`btn ${color(item)} btn-lg btn-block mt-3 mb-3`}
                onClick={() => {
                  props.history.push("/edit/" + item.id);
                }}
              >
                {item.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
