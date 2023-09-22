import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  error: null,
  isShownPassword: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      state.error = null;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    togglePasswordVisibility: state => {
      state.isShownPassword = !state.isShownPassword;
    }
  }
});

export const {
  login,
  logout,
  setError,
  togglePasswordVisibility
} = authSlice.actions;
export default authSlice.reducer;
/**
 * {
    email: "ibrahim@gmail.com",
    password: "123456",
    userName: "Ibrahim Fathi",
    photo: "../../../assets/personal-image.jpg"
  },
 * 
*/
