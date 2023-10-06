import { createSlice } from "@reduxjs/toolkit";
import { fetchListOfTodos, fetchAllTodos } from "../API/ApiActions";

const initialState = {
  listOfTodos: [],
  listId: null,
  todos: [],
  incompleteTasks: [],
  completedTasks: [],
  loading: "idle",
  error: null
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setListId: (state, action) => {
      state.listId = action.payload;
    },
    setIncompleteTasks: (state, action) => {
      state.incompleteTasks = action.payload;
    },

    setCompletedTasks: (state, action) => {
      state.completedTasks = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOfTodos.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchListOfTodos.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.listOfTodos = action.payload;
      })
      .addCase(fetchListOfTodos.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.todos = action.payload;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  }
});
export const { setListId, setIncompleteTasks, setCompletedTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
