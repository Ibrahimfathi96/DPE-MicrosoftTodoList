import axios from "axios";
import { API_URL } from "@env";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const baseURL = `${API_URL}`;

const api = axios.create({
  baseURL
});
export const fetchStarterList = async () => {
  try {
    const response = await api.get("/api/getStarterList");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSecondaryList = async () => {
  try {
    const response = await api.get("/api/getSecondaryList");
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
export const fetchListOfTodosAPI = async (userId) => {
  const response = await api.get(`/api/getTasks/${userId}`);
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
