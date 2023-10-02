import axios from "axios";
import { API_URL } from "@env";

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
