import axios from "axios";

const baseURL = "http://192.168.1.11:8000";

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
