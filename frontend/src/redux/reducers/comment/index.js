import { createSlice } from "@reduxjs/toolkit";
export const comments = createSlice({
  name: "comments",
  initialState: {
    commented: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.commented = action.payload;
    },
    addComment: (state, action) => {
      state.commented.push(action.payload);
    },

    deleteComment: (state, action) => {
      state.commented = state.commented.filter((element) => {
        return element.id !== action.payload;
      });
    },
  },
});

export const { setComments, addComment, deleteComment } = comments.actions;

export default comments.reducer;
