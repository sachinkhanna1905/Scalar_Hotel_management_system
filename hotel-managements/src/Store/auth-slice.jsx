import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { userName: null, isRenderForm: true };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    renderForm(state) {
      state.isRenderForm = !state.isRenderForm;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
