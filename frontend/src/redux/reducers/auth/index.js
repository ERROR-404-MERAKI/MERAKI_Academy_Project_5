import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    toLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    toLogout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { toLogin, toLogout } = auth.actions;
export default auth.reducer;