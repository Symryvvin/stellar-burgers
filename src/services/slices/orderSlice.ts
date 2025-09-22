import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TOrderState = {
  order: TOrder | null;
  orderResult: TOrder | null;
  orderRequested: boolean;
  userOrders: TOrder[];
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

export const initialState: TOrderState = {
  order: null,
  orderResult: null,
  orderRequested: false,
  userOrders: [],
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
  } catch (e: unknown) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
    return rejectWithValue('Ошибка при получении заказа');
  }
});

export const createOrder = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const userOrders = createAsyncThunk(
  'order/userOrders',
  async () => await getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderResult = null;
      state.error = null;
      state.status = 'loading';
      state.orderRequested = false;
      state.userOrders = [];
    }
  },
  selectors: {
    isOrderRequestedSelector: (state) => state.orderRequested,
    orderResultSelector: (state) => state.orderResult,
    userOrdersSelector: (state) => state.userOrders,
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
      })
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.orderRequested = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.orderResult = action.payload.order;
        state.orderRequested = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Ошибка при создании заказа';
      })
      .addCase(userOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.userOrders = action.payload;
      })
      .addCase(userOrders.rejected, (state) => {
        state.status = 'loading';
        state.error = null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const {
  errorSelector,
  orderSelector,
  orderResultSelector,
  statusSelector,
  isOrderRequestedSelector,
  userOrdersSelector
} = orderSlice.selectors;
