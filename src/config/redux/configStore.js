import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userSlice";
import postReducer from "./modules/postSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
  },
});
