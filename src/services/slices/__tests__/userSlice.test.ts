import {
  getUser,
  initialState,
  login,
  logout,
  register,
  setAuthChecked,
  setFormValue,
  TUserState,
  updateUser,
  userSlice
} from '../userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Aizen',
  email: 'symryvvin@mail.com'
};

describe('userSlice reducer', () => {
  const reducer = userSlice.reducer;

  it('setAuthChecked меняет authChecked', () => {
    const state = reducer(initialState, setAuthChecked(true));

    expect(state.authChecked).toBe(true);
  });

  it('setFormValue меняет user', () => {
    const state = reducer(initialState, setFormValue(mockUser));

    expect(state.user).toEqual(mockUser);
  });

  it('register.pending устанавливает status=loading', () => {
    const state = reducer(initialState, { type: register.pending.type });

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('register.fulfilled устанавливает user и status=success', () => {
    const actionPayload = { user: mockUser };
    const state = reducer(initialState, {
      type: register.fulfilled.type,
      payload: actionPayload
    });

    expect(state.status).toBe('success');
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('register.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: register.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('login.pending устанавливает status=loading', () => {
    const state = reducer(initialState, { type: login.pending.type });

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('login.fulfilled устанавливает user и status=success', () => {
    const actionPayload = { user: mockUser };
    const state = reducer(initialState, {
      type: login.fulfilled.type,
      payload: actionPayload
    });

    expect(state.status).toBe('success');
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('login.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: login.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('getUser.fulfilled устанавливает user и authChecked', () => {
    const state = reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });

    expect(state.user).toEqual(mockUser);
    expect(state.authChecked).toBe(true);
    expect(state.status).toBe('success');
  });

  it('getUser.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: getUser.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('updateUser.fulfilled обновляет user', () => {
    const updatedUser = { ...mockUser, name: 'Пётр' };
    const state = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });

    expect(state.user).toEqual(updatedUser);
    expect(state.status).toBe('success');
    expect(state.error).toBeNull();
  });

  it('updateUser.rejected устанавливает status=error и error', () => {
    const state = reducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка');
  });

  it('logout.fulfilled очищает user и status', () => {
    const preState = { ...initialState, user: mockUser };
    const state = reducer(preState, { type: logout.fulfilled.type });

    expect(state.user).toBeNull();
    expect(state.status).toBe('success');
    expect(state.error).toBeNull();
  });
});

describe('userSlice selectors', () => {
  const state: { user: TUserState } = {
    user: {
      ...initialState,
      user: mockUser,
      authChecked: true,
      status: 'error',
      error: 'Ошибка'
    }
  };

  it('isAuthCheckedSelector возвращает authChecked', () => {
    expect(userSlice.selectors.isAuthCheckedSelector(state)).toBe(true);
  });

  it('isAuthenticatedSelector возвращает true если user есть', () => {
    expect(userSlice.selectors.isAuthenticatedSelector(state)).toBe(true);
  });

  it('userSelector возвращает user', () => {
    expect(userSlice.selectors.userSelector(state)).toEqual(mockUser);
  });

  it('errorSelector возвращает error', () => {
    expect(userSlice.selectors.errorSelector(state)).toBe('Ошибка');
  });

  it('statusSelector возвращает status', () => {
    expect(userSlice.selectors.statusSelector(state)).toBe('error');
  });
});
