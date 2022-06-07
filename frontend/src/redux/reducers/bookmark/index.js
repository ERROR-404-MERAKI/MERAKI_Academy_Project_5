import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      // action.payload =>data pushed to database
      state.bookmark.push(action.payload);
    },
    setBookmark: (state, action) => {
      // action.payload => bookmark saved in database
      state.bookmark = action.payload;
    },
  },
});

export const { addBookmark, setBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
