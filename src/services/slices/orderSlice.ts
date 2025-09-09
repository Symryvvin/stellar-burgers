import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TOrderState = {
  order: TOrder | null;
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

const initialState: TOrderState = {
  order: null,
  error: null,
  status: 'loading'
};

export const getOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/getOrderByNumber', async (number: number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);

    if (!response.orders || response.orders.length === 0) {
      return rejectWithValue('Заказ с таким номером не найден');
    }

    return response.orders[0];
  } catch (e: any) {
    return rejectWithValue(e.message || 'Ошибка при получении заказа');
  }
});

export const createOrder = createAsyncThunk(
  'order/getOrderByNumber',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.status = 'loading';
    }
  },
  selectors: {
    orderSelector: (state) => state.order,
    errorSelector: (state) => state.error,
    statusSelector: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = 'success';
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message ?? 'Ошибка при получении деталей заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const { errorSelector, orderSelector, statusSelector } =
  orderSlice.selectors;
