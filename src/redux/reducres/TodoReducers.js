import { addGroupAPI, fetchListOfTodosAPI } from "../API/ApiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addGroup = createAsyncThunk(
  "todos/addGroup",
  async ({ name }, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const groupName = { name };
      await addGroupAPI(userId, groupName);
      const updatedList = await fetchListOfTodosAPI(userId);
      dispatch(fetchListOfTodos());
      return updatedList;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchListOfTodos = createAsyncThunk(
  "todos/fetchList",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetchListOfTodosAPI(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

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
