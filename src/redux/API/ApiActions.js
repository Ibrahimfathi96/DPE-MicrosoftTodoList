import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGroupsAPI,
  addGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
  fetchAllTodosAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI
} from "./ApiServices";

export const fetchGroups = createAsyncThunk(
  "todos/fetchGroups",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetchGroupsAPI(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addGroup = createAsyncThunk(
  "todos/addGroup",
  async ({ name }, { getState, dispatch }) => {
    try {
      const userId = getState().auth.userId;
      const groupName = { name };
      await addGroupAPI(userId, groupName);
      const updatedList = await fetchListOfTodosAPI(userId);
      dispatch(fetchGroups());
      return updatedList;
    } catch (error) {
      throw error;
    }
  }
);

export const updateGroup = createAsyncThunk(
  "todos/updateGroup",
  async (
    { name, iconName, iconColor, iconType, backgroundColor },
    { getState }
  ) => {
    try {
      const userId = getState().auth.userId;
      const listId = getState().todo.listId;
      await updateGroupAPI(userId, listId, {
        name,
        iconName,
        iconColor,
        iconType,
        backgroundColor
      });
      return { name, iconName, iconColor, iconType, backgroundColor };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "todos/deleteGroup",
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const listId = getState().todo.listId;
      await deleteGroupAPI(userId, listId);
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
      dispatch(fetchAllTodos());
      return { taskId, todoTitle, todoDesc, isDone };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "todos/deleteTask",
  async (taskId, { getState }) => {
    try {
      const userId = getState().auth.userId;
      console.log("userIdFromDeleteTask", userId);
      const listId = getState().todo.listId;
      console.log("listIdFromDeleteTask", listId);
      await deleteTaskAPI(userId, listId, taskId);
    } catch (error) {
      throw error;
    }
  }
);
