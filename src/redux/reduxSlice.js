import { createSlice } from "@reduxjs/toolkit";
// Initial State
const initialState = {
  todos: "",
  completed: [],
  incomplete: [],
  check: "all",
  disable: false,
};
// Slice
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Actions
    addTodo: (state, action) => {
      state.todos = action.payload;
      state.count += 1;
    },
    disableTodo: (state, action) => {
      state.disable = action.payload;
    },
    completedTodo: (state, action) => {
      state.completed = action.payload;
    },
    incompleteTodo: (state, action) => {
      state.incomplete = action.payload;
    },
    checkTodo: (state, action) => {
      state.check = action.payload;
    },
  },
});

export const {
  addTodo,
  disableTodo,
  completedTodo,
  incompleteTodo,
  checkTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
