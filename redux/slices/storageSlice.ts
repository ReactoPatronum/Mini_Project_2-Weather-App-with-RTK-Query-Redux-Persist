import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    addStorage: (state: any, action) => {
      state.store.push(action.payload);
    },
    removeStorage: (state, action) => {
      state.store=state.store.filter((item) => item !== action.payload);
    },
  },
});

export default storageSlice.reducer;
export const { addStorage , removeStorage } = storageSlice.actions;
