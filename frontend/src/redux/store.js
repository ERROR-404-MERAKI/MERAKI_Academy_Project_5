import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth/index";

import postReducer from "./reducers/posts";

import storyReducer from "./reducers/story";

import commentReducer from "./reducers/comment";

import bookmarkSlice from "./reducers/bookmark";

import userSlice from "./reducers/users";
export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    storys: storyReducer,
    comments: commentReducer,
    bookmark: bookmarkSlice,
    userId: userSlice,
  },
});
