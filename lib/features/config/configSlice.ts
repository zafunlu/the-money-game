import { BankConfig } from "@/app/constants";
import { GET } from "@/app/utils/http-client";
import { ThunkStatus } from "@/lib/thunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    current: {},
    status: ThunkStatus.Idle,
  } as { current: BankConfig; status: ThunkStatus },
  reducers: {
    loadConfig(_state, { payload }) {
      return { ...payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConfig.pending, (state, _) => {
        state.status = ThunkStatus.Loading;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = ThunkStatus.Success;
      })
      .addCase(fetchConfig.rejected, (state, _) => {
        state.status = ThunkStatus.Error;
      });
  },
});

export const { actions: configAction, reducer: configReducer } = configSlice;

export const fetchConfig = createAsyncThunk<BankConfig>("config", async () => {
  const response = await GET("/config");

  if (!response.ok) {
    const { message } = await response.json();
    throw message;
  }

  return response.json();
});
