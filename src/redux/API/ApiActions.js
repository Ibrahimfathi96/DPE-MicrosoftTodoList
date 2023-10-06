import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addGroupAPI,
  addTaskAPI,
  fetchListOfTodosAPI,
  fetchAllTodosAPI,
  updateTaskAPI
} from "./ApiServices";


export const addGroup = createAsyncThunk(
  "todos/addGroup",
  async ({ name }, { getState, dispatch }) => {
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
export const addTask = createAsyncThunk(
  "todos/addTask",
  async ({ todoTitle }, { getState, dispatch }) => {
    try {
      const userId = getState().auth.userId;
      const listId = getState().todo.listId;
      const title = { todoTitle };
      await addTaskAPI(userId, listId, title);
      const fetchTodos = await fetchAllTodosAPI(userId, listId);
      dispatch(fetchAllTodos());
      return fetchTodos;
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
export const fetchAllTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const listId = getState().todo.listId;
      const response = await fetchAllTodosAPI(userId, listId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "todos/updateTask",
  async ({ taskId, todoTitle, todoDesc, isDone }, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const listId = getState().todo.listId;
      await updateTaskAPI(userId, listId, taskId, {
        todoTitle,
        todoDesc,
        isDone
      });
      return { taskId, todoTitle, todoDesc, isDone };
    } catch (error) {
      throw error;
    }
  }
);
