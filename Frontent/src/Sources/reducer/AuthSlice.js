// reducer/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if exists
const storedUser = JSON.parse(localStorage.getItem("user"));

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: !!storedUser,
    user: storedUser || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = !!action.payload;
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
