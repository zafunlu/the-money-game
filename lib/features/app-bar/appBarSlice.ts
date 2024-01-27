import { createSlice } from "@reduxjs/toolkit";

const appBarSlice = createSlice({
  name: "appBarSlice",
  initialState: {
    shouldDisplayGoBack: false,
  },
  reducers: {
    displayGoBack(state) {
      return { ...state, shouldDisplayGoBack: true };
    },
    displayDefault(state) {
      return { ...state, shouldDisplayGoBack: false };
    },
  },
});

export const { actions: appBarActions, reducer: appBarReducer } = appBarSlice;
