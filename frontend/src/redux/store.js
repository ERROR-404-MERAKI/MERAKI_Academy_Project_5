import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth/index";

import postReducer from "./reducers/posts";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});