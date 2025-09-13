import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeed } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  feed: TFeed | null;
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

const initialState: TFeedState = {
  feed: null,
  error: null,
  status: 'loading'
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<TFeed>) => {
      state.feed = action.payload;
    }
  },
  selectors: {
    feedSelector: (state) => state.feed,
    errorSelector: (state) => state.error,
    statusSelector: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status = 'success';
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message ?? 'Ошибка при получении ленты заказов';
      });
  }
});

export const { setFeed } = feedSlice.actions;

export const { errorSelector, feedSelector, statusSelector } =
  feedSlice.selectors;
