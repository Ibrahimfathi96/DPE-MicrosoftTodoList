import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducres/authSlice";
import apiReducer from "./reducres/TodoReducer";
export default configureStore({
  reducer: {
    auth,
    api: apiReducer
  }
});
