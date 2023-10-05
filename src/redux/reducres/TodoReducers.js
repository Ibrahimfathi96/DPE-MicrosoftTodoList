import { createSlice } from "@reduxjs/toolkit";
import { fetchListOfTodos } from "../API/ApiActions";

const initialState = {
  listOfTodos: [],
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
      });
  }
});

export default todoSlice.reducer;
