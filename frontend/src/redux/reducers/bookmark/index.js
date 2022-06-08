import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
  },
  reducers: {
    setBookmark: (state, action) => {
      // action.payload => bookmark saved in database
      state.bookmark = action.payload;
    },
    addBookmark: (state, action) => {
      // action.payload =>data pushed to database
      state.bookmark.push(action.payload);
    },
    deleteBookmark: (state, action) => {
      state.bookmark = state.bookmark.filter((element) => {
        return element.id !== action.payload;
      });
    },
  },
});

export const { addBookmark, setBookmark, deleteBookmark } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
