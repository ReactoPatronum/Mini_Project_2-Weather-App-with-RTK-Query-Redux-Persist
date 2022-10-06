import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: "Liste",
} 

const optionSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export default optionSlice.reducer;
export const { addIsActive } = optionSlice.actions;