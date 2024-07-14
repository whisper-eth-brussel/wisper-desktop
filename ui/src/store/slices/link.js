import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  link: "",
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLink } = linkSlice.actions;

export default linkSlice.reducer;
