import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducres/authSlice";
import todoSlice from "./reducres/TodoReducers";
export default configureStore({
  reducer: {
    auth: authReducer,
    todo: todoSlice
  }
});
