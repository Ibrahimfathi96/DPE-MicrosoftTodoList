import { createSlice } from "@reduxjs/toolkit";
import { fetchListOfTodos, fetchAllTodos } from "../API/ApiActions";

const initialState = {
  listOfTodos: [],
  todos: [],
  loading: "idle",
  error: null
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
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
        state.todosForList = action.payload;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  }
});

export default todoSlice.reducer;
