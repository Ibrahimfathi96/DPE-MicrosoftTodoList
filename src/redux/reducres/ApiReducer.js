import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStarterListAsync,
  fetchSecondaryListAsync
} from "../API/ApiActions";

const initialState = {
  starterListData: [],
  secondaryListData: [],
  status: "idle",
  error: null
};

const apiReducer = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarterListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStarterListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.starterListData = action.payload;
      })
      .addCase(fetchStarterListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSecondaryListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSecondaryListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.secondaryListData = action.payload;
      })
      .addCase(fetchSecondaryListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});
export default apiReducer.reducer;
