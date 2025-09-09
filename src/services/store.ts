import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { profileSlice } from './slices/profileSlice';
import { feedSlice } from './slices/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';

const rootReducer = combineSlices(
  profileSlice,
  feedSlice,
  ingredientsSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
