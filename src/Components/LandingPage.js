import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { addTodo, disableTodo } from "../redux/reduxSlice";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../firebase/firebase";
function LandingPage() {
  const db = getDatabase(app);
  const inputHandler = (e) => {
    // Dispatch addTodo Action
    dispatch(addTodo(e.target.value));
  };
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const addTodoHandler = () => {
    if (todos === "") {
      alert("Empty Field Can Not Be Empty");
    } else {
      const todoRef = ref(db, "/todos");
      const todo = {
        text: todos,
        done: false,
      };
      // Push Into Firebase DB
      push(todoRef, todo);
      dispatch(addTodo(""));
      dispatch(disableTodo(false));
    }
  };
  return (
    <center>
      <section className="section">
        <h1>TodoInput</h1>
        <div className="section__input">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i
                className="fa fa-calendar-check-o"
                style={{ fontSize: "36px" }}
              ></i>
            </span>
            <input
              value={todos}
              onChange={inputHandler}
              type="text"
              className="form-control"
              placeholder="New Todo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="d-grid gap-2">
            <button
              onClick={addTodoHandler}
              className="btn btn-primary"
              type="button"
            >
              Add new task
            </button>
          </div>
        </div>
      </section>
    </center>
  );
}

export default LandingPage;
