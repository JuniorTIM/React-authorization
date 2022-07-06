import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createUser } from "../../../features/register-reducer";
import "./styles.css";

const Form = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const signUp = useSelector((state) => state.auth.signUp);
  const error = useSelector((state) => state.auth.error);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (login !== "" && password !== "") {
      dispatch(createUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <>
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
      <div className="block">
        <div className="join-text">Создай акк э</div>
        Логин:{" "}
        <input
          className="login-input"
          type="text"
          value={login}
          onChange={handleChangeLogin}
        />
        Пароль:{" "}
        <input
          className="pass-input"
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button
          disabled={signUp}
          onClick={handleSubmit}
          className="join-button"
        >
          Зарегистрироваться
        </button>
      </div>
      <div className="err-reg">{error && error}</div>
    </>
  );
};

export default Form;
