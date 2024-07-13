import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./slices/chat";
import groupReducer from "./slices/group";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    group: groupReducer,
  },
});
