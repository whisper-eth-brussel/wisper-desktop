import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [
    // {
    //   id: "1",
    //   name: "Group 1",
    //   thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //   time: "12:00",
    //   link: "/group/1",
    //   members: [
    //     {
    //       id: "1",
    //       name: "User 1",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //     {
    //       id: "2",
    //       name: "User 2",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //   ],
    //   unread: 2,
    //   messages: [
    //     {
    //       id: "1",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hello",
    //       time: "12:00",
    //     },
    //     {
    //       id: "2",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hi",
    //       time: "12:01",
    //     },
    //   ],
    // },
    // {
    //   id: "2",
    //   name: "Group 1",
    //   thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //   time: "12:00",
    //   link: "/group/1",
    //   unread: 2,
    //   members: [
    //     {
    //       id: "1",
    //       name: "User 1",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //     {
    //       id: "2",
    //       name: "User 2",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //   ],
    //   messages: [
    //     {
    //       id: "1",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hello",
    //       time: "12:00",
    //     },
    //     {
    //       id: "2",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hi",
    //       time: "12:01",
    //     },
    //   ],
    // },
    // {
    //   id: "3",
    //   name: "Group 3",
    //   link: "/group/1",
    //   thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //   time: "12:00",
    //   unread: 2,
    //   members: [
    //     {
    //       id: "1",
    //       name: "User 1",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //     {
    //       id: "2",
    //       name: "User 2",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //     },
    //   ],
    //   messages: [
    //     {
    //       id: "1",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hello",
    //       time: "12:00",
    //     },
    //     {
    //       id: "2",
    //       sender: {
    //         id: "1",
    //         name: "User 1",
    //         thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    //       },
    //       message: "Hi",
    //       time: "12:01",
    //     },
    //   ],
    // },
  ],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    newChat: (state, action) => {
      state.chats.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { newChat } = groupSlice.actions;

export default groupSlice.reducer;
