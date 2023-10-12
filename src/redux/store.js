import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducres/authSlice";
import todoReducer from "./reducres/TodoSlice";
import homeSlice from "./reducres/homeSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    home: homeSlice
  }
});
