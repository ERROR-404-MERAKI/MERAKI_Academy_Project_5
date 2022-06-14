import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userId: 0,
    myuser:0,
  },
  reducers: {
    setId: (state, action) => {
      state.userId = action.payload;
    },
    setMyuser: (state, action) => {
      state.myuser = action.payload;
    },
  },
});

export const { setId,setMyuser } = userSlice.actions;

export default userSlice.reducer;
