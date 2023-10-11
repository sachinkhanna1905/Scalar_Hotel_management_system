import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = {
  values: {
    mobilenumber:"",
    toDate: "",
  },

};

const mapSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    newValues(state, action) {
      state.values = action.payload;
    },
   
  },
});

export const mapAction = mapSlice.actions;

export default mapSlice.reducer;
