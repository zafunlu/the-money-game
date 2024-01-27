import { createSlice } from "@reduxjs/toolkit";

const announcementsSlice = createSlice({
  name: "announcementsSlice",
  initialState: null,
  reducers: {
    setAnnouncements(_state, action) {
      return action.payload;
    },
  },
});

export const { actions: announcementsAction, reducer: announcementsReducer } = announcementsSlice;
