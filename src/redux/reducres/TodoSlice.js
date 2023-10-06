import { createSlice } from "@reduxjs/toolkit";
import { fetchGroups, fetchAllTodos } from "../API/ApiActions";

const initialState = {
  groups: [],
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
      .addCase(fetchGroups.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
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
