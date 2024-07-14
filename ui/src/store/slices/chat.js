import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  thumbnail: "",
  members: [],
  link: "",
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.members = action.payload.members;
      state.thumbnail = action.payload.thumbnail;
      state.link = action.payload.link;
      state.messages = action.payload.messages;
    },
    closeChat(state) {
      state.id = "";
      state.name = "";
      state.members = [];
      state.link = "";
      state.messages = [];
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { openChat, closeChat, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
