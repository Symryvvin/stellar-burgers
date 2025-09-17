import {
  feedSlice,
  getFeed,
  initialState,
  setFeed,
  TFeedState
} from '../feedSlice';
import { TFeed } from '@utils-types';

describe('feedSlice reducers', () => {
  const reducer = feedSlice.reducer;

  it('должен установить feed при setFeed', () => {
    const mockFeed = { orders: [], total: 0, totalToday: 0 } as TFeed;
    const state = reducer(initialState, setFeed(mockFeed));

    expect(state.feed).toEqual(mockFeed);
  });

  it('должен установить status=loading при getFeed.pending', () => {
    const action = { type: getFeed.pending.type };
    const state = reducer(initialState, action);

    expect(state.status).toBe('loading');
  });

  it('должен установить status=success и feed при getFeed.fulfilled', () => {
    const mockFeed = { orders: [], total: 1, totalToday: 1 } as TFeed;
    const action = { type: getFeed.fulfilled.type, payload: mockFeed };
    const state = reducer(initialState, action);

    expect(state.status).toBe('success');
    expect(state.feed).toEqual(mockFeed);
  });

  it('должен установить status=error и error при getFeed.rejected', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const state = reducer(initialState, action);

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка сети');
  });
});

describe('feedSlice selectors', () => {
  it('feedSelector должен возвращать feed', () => {
    const mockFeed = { orders: [], total: 0, totalToday: 0 } as TFeed;
    const state: { feed: TFeedState } = {
      feed: {
        ...initialState,
        feed: mockFeed
      }
    };

    expect(feedSlice.selectors.feedSelector(state)).toEqual(mockFeed);
  });

  it('errorSelector должен возвращать error', () => {
    const state: { feed: TFeedState } = {
      feed: {
        ...initialState,
        error: 'Ошибка'
      }
    };

    expect(feedSlice.selectors.errorSelector(state)).toBe('Ошибка');
  });

  it('statusSelector должен возвращать status', () => {
    const state: { feed: TFeedState } = {
      feed: {
        ...initialState,
        status: 'success'
      }
    };

    expect(feedSlice.selectors.statusSelector(state)).toBe('success');
  });
});
