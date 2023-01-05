import React from "react";
import { useEffect, useState } from "react";
// Import Firebase Tools
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { app } from "../firebase/firebase";
import "./DisplayTodo.css";
import { useDispatch, useSelector } from "react-redux";
// Import Actions
import {
  addTodo,
  disableTodo,
  completedTodo,
  checkTodo,
  incompleteTodo,
} from "../redux/reduxSlice";
function DisplayTodo() {
  const db = getDatabase(app);
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();
  // Disable State
  const disable = useSelector((state) => state.todo.disable);
  // Todo Completed State
  const todoCompleted = useSelector((state) => state.todo.completed);
  // Todo InComplete State
  const todoIncomplete = useSelector((state) => state.todo.incomplete);
  // Check State For Conditional Rendering
  const check = useSelector((state) => state.todo.check);
  useEffect(() => {
    let todoRef = ref(db, "/todos");
    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList = [];
      let tempComp = [];
      let tempInComp = [];
      for (let id in todos) {
        // Check Conditions and push into redux state  according to complete or not
        newTodoList.push({ id, ...todos[id] });
        if (todos[id].done === true) {
          tempComp.push({ id, ...todos[id] });
        } else {
          tempInComp.push({ id, ...todos[id] });
        }
      }
      dispatch(incompleteTodo(tempInComp));
      dispatch(completedTodo(tempComp));
      setTodo(newTodoList);
    });
  }, [db, dispatch]);
  // Change Todo Completed Status
  const changeTodoCompletion = (eve) => {
    const todoRef = ref(db, "/todos/" + eve.id);
    update(todoRef, { done: !eve.done });
  };
  // Delete Todo
  const deleteHandler = (eve) => {
    let todoRef = ref(db, "/todos/" + eve.id);
    remove(todoRef, { id: eve.id });
  };
  // Delete All Handler
  const deleteAllHandler = () => {
    let flag = window.confirm("Want To Delete All Tasks !!!");
    if (flag === true) {
      let todoRef = ref(db, "/todos");
      window.location.reload();
      remove(todoRef);
    }
  };
  // Delete Only Incomplete Tasks
  const deleteTodo = () => {
    let flag = window.confirm("Want To Delete All Incomplete Tasks !!!");
    if (flag === true) {
      let todoRef = ref(db, "/todos");
      onValue(todoRef, (snapshot) => {
        const todos = snapshot.val();
        for (let id in todos) {
          if (todos[id].done === false) {
            todoRef = ref(db, "/todos/" + id);
            window.location.reload();
            remove(todoRef);
            break;
          }
        }
      });
    }
  };
  // Delete Only Completed Tasks
  const deleteDone = () => {
    let flag = window.confirm("Want To Delete All Complete Tasks !!!");
    if (flag === true) {
      let todoRef = ref(db, "/todos");
      onValue(todoRef, (snapshot) => {
        const todos = snapshot.val();
        for (let id in todos) {
          if (todos[id].done === true) {
            todoRef = ref(db, "/todos/" + id);
            window.location.reload();
            remove(todoRef);
            break;
          }
        }
      });
    }
  };
  // Edit Todo Tasks
  const editHandler = (eve) => {
    let todoRef = ref(db, "/todos/" + eve.id);
    dispatch(addTodo(eve.text));
    dispatch(disableTodo(true));
    remove(todoRef, { id: eve.id });
  };
  // Display All Tasks
  const todoAllHandler = () => {
    dispatch(checkTodo("all"));
  };
  // Display Only Completed Tasks
  const todoDoneHandler = () => {
    dispatch(checkTodo("done"));
  };
  //  Display Only Todo Tasks
  const todoIncomeplete = () => {
    dispatch(checkTodo("todo"));
  };
  return (
    <div>
      <center>
        <div className="displayTodo">
          <h1>TodoList</h1>
          <div className="section__list">
            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                onClick={todoAllHandler}
                className="btn btn-primary"
                type="button"
              >
                All
              </button>
            </div>

            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                onClick={todoDoneHandler}
                className="btn btn-primary"
                type="button"
              >
                Done
              </button>
            </div>

            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                onClick={todoIncomeplete}
                className="btn btn-primary"
                type="button"
              >
                Todo
              </button>
            </div>
          </div>
          {/* Conditional Rendering According To User Choice */}
          <ul className="list-group">
            {check === "all"
              ? todo.map((val, index) => (
                  <li
                    key={index}
                    style={{ fontSize: "25px" }}
                    className="list-group-item"
                  >
                    <span style={{ float: "left" }}>{val.text}</span>
                    <span style={{ float: "right" }}>
                      <input
                        checked={val.done}
                        onChange={() => changeTodoCompletion(val)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <button
                        style={{ background: "transparent", border: "none" }}
                        onClick={() => editHandler(val)}
                        disabled={disable}
                      >
                        <i
                          style={{
                            color: "#fec701",
                            margin: "0 10px",
                            cursor: "pointer",
                          }}
                          className="material-icons"
                        >
                          edit
                        </i>
                      </button>

                      <i
                        style={{ color: "#f50046", cursor: "pointer" }}
                        className="material-icons"
                        onClick={() => deleteHandler(val)}
                      >
                        delete
                      </i>
                    </span>
                  </li>
                ))
              : check === "done"
              ? todoCompleted.map((val, index) => (
                  <li
                    key={index}
                    style={{ fontSize: "25px" }}
                    className="list-group-item"
                  >
                    <span style={{ float: "left" }}>{val.text}</span>
                    <span style={{ float: "right" }}>
                      <input
                        checked={val.done}
                        onChange={() => changeTodoCompletion(val)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <button
                        style={{ background: "transparent", border: "none" }}
                        onClick={() => editHandler(val)}
                        disabled={disable}
                      >
                        <i
                          style={{
                            color: "#fec701",
                            margin: "0 10px",
                            cursor: "pointer",
                          }}
                          className="material-icons"
                        >
                          edit
                        </i>
                      </button>

                      <i
                        style={{ color: "#f50046", cursor: "pointer" }}
                        className="material-icons"
                        onClick={() => deleteHandler(val)}
                      >
                        delete
                      </i>
                    </span>
                  </li>
                ))
              : check === "todo"
              ? todoIncomplete.map((val, index) => (
                  <li
                    key={index}
                    style={{ fontSize: "25px" }}
                    className="list-group-item"
                  >
                    <span style={{ float: "left" }}>{val.text}</span>
                    <span style={{ float: "right" }}>
                      <input
                        checked={val.done}
                        onChange={() => changeTodoCompletion(val)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <button
                        style={{ background: "transparent", border: "none" }}
                        onClick={() => editHandler(val)}
                        disabled={disable}
                      >
                        <i
                          style={{
                            color: "#fec701",
                            margin: "0 10px",
                            cursor: "pointer",
                          }}
                          className="material-icons"
                        >
                          edit
                        </i>
                      </button>

                      <i
                        style={{ color: "#f50046", cursor: "pointer" }}
                        className="material-icons"
                        onClick={() => deleteHandler(val)}
                      >
                        delete
                      </i>
                    </span>
                  </li>
                ))
              : null}
          </ul>
          {/* Delete Done,Todo,All Button Container */}
          <div className="section__list">
            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                style={{ backgroundColor: "#f50046" }}
                className="btn btn-primary"
                type="button"
                onClick={deleteDone}
              >
                Delete Done Task
              </button>
            </div>

            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                style={{ backgroundColor: "#f50046" }}
                className="btn btn-primary"
                type="button"
                onClick={deleteTodo}
              >
                Delete Todo Task
              </button>
            </div>

            <div className="d-grid gap-2 col-3 mx-auto">
              <button
                style={{ backgroundColor: "#f50046" }}
                className="btn btn-primary"
                type="button"
                onClick={deleteAllHandler}
              >
                Delete All Task
              </button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default DisplayTodo;
