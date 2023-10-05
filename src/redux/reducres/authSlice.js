import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  userId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  }
});

export const { setUser, clearUser, setUserId } = authSlice.actions;
export default authSlice.reducer;
