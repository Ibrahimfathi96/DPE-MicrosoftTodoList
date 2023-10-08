import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseURL = "https://microsofttodolist.onrender.com";
const baseURL = `${API_URL}`;

const api = axios.create({
  baseURL
});

export const signIn = async (email, password) => {
  try {
    const response = await api.post("/api/signIn", { email, password });
    await AsyncStorage.setItem("isAuthenticated", "true");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (name, email, password) => {
  try {
    const response = await api.post("/api/signUp", { name, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchGroupsAPI = async (userId) => {
  const response = await api.get(`/api/getGroups/${userId}`);
  return response.data;
};

export const addGroupAPI = async (userId, name) => {
  try {
    const response = await api.post(`/api/addGroup/${userId}`, name);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroupAPI = async (userId, listId, groupdata) => {
  try {
    const response = await api.put(
      `/api/updateGroup/${userId}/${listId}`,
      groupdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroupAPI = async (userId, listId) => {
  try {
    const response = await api.delete(`/api/deleteGroup/${userId}/${listId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllTodosAPI = async (userId, listId) => {
  const response = await api.get(`/api/getTasks/${userId}/${listId}`);
  return response.data;
};

export const addTaskAPI = async (userId, listId, todoTitle) => {
  try {
    const response = await api.post(
      `/api/addTask/${userId}/${listId}`,
      todoTitle
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskAPI = async (userId, listId, taskId, taskData) => {
  try {
    const response = await api.put(
      `/api/updateTask/${userId}/${listId}/${taskId}`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
