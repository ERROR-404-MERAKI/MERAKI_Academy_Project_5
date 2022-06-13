import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userId: 0,
  },
  reducers: {
    setId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setId } = userSlice.actions;

export default userSlice.reducer;
