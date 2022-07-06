import "./todos-styles.css";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeTodos, delTodos, getTodos } from "../../../features/todos-reducer";
import { useEffect } from "react";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector(state => state.todos.error)
  const dispatch = useDispatch();

  function handleEmpty (element) {
    dispatch(changeTodos(element))
  }

  function handleDeleteBtn(i) {
    dispatch(delTodos(i))
  }

  useEffect(() => {
    dispatch(getTodos())}, [dispatch])
    
  return (
    <div className="todos">
      {error && <div className="err-login">{error}</div>}
      {todos.map((element, index) => {
        return (
          <>
          <div key={index} className={element.completed === true ? 'todo check' : 'todo'}>
            <input type="checkbox" onChange={() => handleEmpty(element)} checked={element.completed} />
            {element.text}
            <button onClick={() => handleDeleteBtn(element._id)} className="deleteBtn">
              x
            </button>
          </div>
          </>
        );
      })}
    </div>
  );
};

export default Todos;