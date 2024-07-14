import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./slices/chat";
import groupReducer from "./slices/group";
import isCreateReducer from "./slices/createScreen";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    group: groupReducer,
    isCreate: isCreateReducer,
  },
});
