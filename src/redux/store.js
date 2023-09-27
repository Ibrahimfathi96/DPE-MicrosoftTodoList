import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducres/authSlice";
import tasksDetailsSlice from "./reducres/tasksDetailsSlice";
export default configureStore({
  reducer: {
    auth,
    tasks: tasksDetailsSlice
  }
});
