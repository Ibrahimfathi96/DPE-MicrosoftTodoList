import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStarterList,
  fetchSecondaryList,
  addGroupAPI,
  fetchListOfTodosAPI,
  fetchAllTodosAPI
} from "./ApiServices";

export const fetchStarterListAsync = createAsyncThunk(
  "api/fetchStarterList",
  async () => {
    const data = await fetchStarterList();
    return data;
  }
);

export const fetchSecondaryListAsync = createAsyncThunk(
  "api/fetchSecondaryList",
  async () => {
    const data = await fetchSecondaryList();
    return data;
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
export const fetchAllTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (payload, { getState }) => {
    try {
      const userId = getState().auth.userId;
      const { listId } = payload; //dispatch(fetchAllTodos({ listId: yourListId }));
      const response = await fetchAllTodosAPI(userId, listId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
