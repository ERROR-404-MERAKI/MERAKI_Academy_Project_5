import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    user:[],
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toLogin, toLogout ,setUser} = auth.actions;
export default auth.reducer;