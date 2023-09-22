import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducres/authSlice";
export default configureStore({
  reducer: {
    auth
  }
});
