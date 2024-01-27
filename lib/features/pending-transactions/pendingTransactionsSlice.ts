import { GET } from "@/app/utils/http-client";
import { Transaction } from "@/lib/models/Transaction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const pendingTransactionsSlice = createSlice({
  name: "pendingTransactions",
  initialState: {
    all: [],
  },
  reducers: {
    setPendingTransactions(_state, action) {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApprovals.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const fetchApprovals = createAsyncThunk("pendingTransactions", async () => {
  const response = await GET("/notifications");
  return response.json();
});

export const selectPendingApprovals = (state: any): Transaction[] => state.pendingTransactions.all;

export const { actions: pendingTransactionsActions, reducer: pendingTransactionsReducer } =
  pendingTransactionsSlice;
