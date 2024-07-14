import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreate: false,
};

export const isCreateSlice = createSlice({
  name: "isCreate",
  initialState,
  reducers: {
    setCreateScreen: (state, action) => {
      state.isCreate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreateScreen } = isCreateSlice.actions;

export default isCreateSlice.reducer;
