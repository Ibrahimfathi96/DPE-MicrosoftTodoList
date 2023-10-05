import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducres/ApiReducer";
import authReducer from "./reducres/authSlice";
import todoSlice from "./reducres/TodoReducers";
export default configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    todo: todoSlice
  }
});
