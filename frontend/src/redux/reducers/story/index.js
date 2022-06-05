import { createSlice } from "@reduxjs/toolkit";

export const storys = createSlice({
  name: "storys",
  initialState: {
    storys: [],
  },
  reducers: {
    setStorys: (state, action) => {
      state.storys = action.payload;
    },
    addstorys: (state, action) => {
      state.storys.push(action.payload);
    },

    deletestorys: (state, action) => {
      state.storys = state.storys.filter((element) => {
        return element.id !== action.payload;
      });
    },
  },
});

export const { setStorys, addstorys, deletestorys } = storys.actions;

export default storys.reducer;
