import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading?: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const getFeed = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeed.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error.message);
    });
    builder.addCase(getFeed.fulfilled, (_, action) => ({
      ...action.payload,
      isLoading: false
    }));
  }
});
