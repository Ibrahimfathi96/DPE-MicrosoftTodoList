import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducres/TodoReducer";
import authReducer from "./reducres/authSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer
  }
});
