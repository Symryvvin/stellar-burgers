import {
  clearOrder,
  createOrder,
  getOrderByNumber,
  initialState,
  orderSlice,
  TOrderState,
  userOrders
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  number: 123,
  name: 'Бургер',
  status: 'done',
  createdAt: '2025-09-17T10:00:00.000Z',
  updatedAt: '2025-09-17T10:00:00.000Z',
  ingredients: []
};

const mockOrders: TOrder[] = [mockOrder];

describe('orderSlice reducer', () => {
  const reducer = orderSlice.reducer;

  it('clearOrder сбрасывает состояние', () => {
    const state = reducer(
      {
        ...initialState,
        order: mockOrder,
        orderResult: mockOrder,
        orderRequested: true
      },
      clearOrder()
    );

    expect(state).toEqual(initialState);
  });

  it('getOrderByNumber.pending устанавливает status=loading', () => {
    const state = reducer(initialState, {
      type: getOrderByNumber.pending.type
    });

    expect(state.status).toBe('loading');
  });

  it('getOrderByNumber.fulfilled устанавливает order и status=success', () => {
    const state = reducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    });

    expect(state.status).toBe('success');
    expect(state.order).toEqual(mockOrder);
  });

  it('getOrderByNumber.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('createOrder.pending устанавливает status=loading и orderRequested=true', () => {
    const state = reducer(initialState, { type: createOrder.pending.type });

    expect(state.status).toBe('loading');
    expect(state.orderRequested).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled устанавливает orderResult и status=success', () => {
    const actionPayload = { order: mockOrder };
    const state = reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: actionPayload
    });

    expect(state.status).toBe('success');
    expect(state.orderResult).toEqual(mockOrder);
    expect(state.orderRequested).toBe(false);
    expect(state.error).toBeNull();
  });

  it('createOrder.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('userOrders.pending устанавливает status=loading и error=null', () => {
    const state = reducer(initialState, { type: userOrders.pending.type });

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('userOrders.fulfilled устанавливает userOrders и status=success', () => {
    const state = reducer(initialState, {
      type: userOrders.fulfilled.type,
      payload: mockOrders
    });

    expect(state.status).toBe('success');
    expect(state.userOrders).toEqual(mockOrders);
  });

  it('userOrders.rejected сбрасывает статус и error', () => {
    const state = reducer(initialState, { type: userOrders.rejected.type });

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });
});

describe('orderSlice selectors', () => {
  const state: { order: TOrderState } = {
    order: {
      ...initialState,
      order: mockOrder,
      orderResult: mockOrder,
      orderRequested: true,
      userOrders: mockOrders,
      error: 'Ошибка',
      status: 'error'
    }
  };

  it('isOrderRequestedSelector возвращает orderRequested', () => {
    expect(orderSlice.selectors.isOrderRequestedSelector(state)).toBe(true);
  });

  it('orderSelector возвращает order', () => {
    expect(orderSlice.selectors.orderSelector(state)).toEqual(mockOrder);
  });

  it('orderResultSelector возвращает orderResult', () => {
    expect(orderSlice.selectors.orderResultSelector(state)).toEqual(mockOrder);
  });

  it('userOrdersSelector возвращает userOrders', () => {
    expect(orderSlice.selectors.userOrdersSelector(state)).toEqual(mockOrders);
  });

  it('errorSelector возвращает error', () => {
    expect(orderSlice.selectors.errorSelector(state)).toBe('Ошибка');
  });

  it('statusSelector возвращает status', () => {
    expect(orderSlice.selectors.statusSelector(state)).toBe('error');
  });
});
