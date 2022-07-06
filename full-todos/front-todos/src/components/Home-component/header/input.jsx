import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../../../features/todos-reducer";
import { logout } from "../../../features/register-reducer";
import "./styles.css";

const Header = () => {
  const [text, setText] = useState("");
  const token = useSelector(state => state.auth.token)

  function handleText(e) {
    setText(e.target.value);
  }

  const dispatch = useDispatch();

  function handleAdd() {
    if (text !== "") {
      dispatch(addTodos(text));
    }
    setText("");
  }

  function handleLogout() {
    if (token) {
      dispatch(logout());
    }
  }

  return (
    <>
      <button onClick={handleLogout} className="logout">
        Выйти
      </button>
      <div className="buttons-block">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/join">
          Join
        </Link>
        <Link className="link" to="/register">
          Register
        </Link>
      </div>
      <div className="header">
        <input onChange={handleText} value={text} className="input"></input>
        <button onClick={handleAdd} className="addButton">
          Add
        </button>
      </div>
    </>
  );
};

export default Header;
