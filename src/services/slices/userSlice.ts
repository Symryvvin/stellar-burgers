import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  authChecked: boolean;
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

const initialState: TUserState = {
  user: null,
  authChecked: false,
  error: null,
  status: 'success'
};

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.authChecked = action.payload;
    },
    setFormValue: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.authChecked,
    isAuthenticatedSelector: (state) => state.user != null,
    userSelector: (state) => state.user,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Ошибка при регистрации';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Ошибка при авторизации';
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'success';
        state.error = null;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message ?? 'Ошибка при получении профиля пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'success';
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message || 'Ошибка обновления профиля пользователя';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.status = 'success';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

export const { setAuthChecked, setFormValue } = userSlice.actions;

export const {
  errorSelector,
  userSelector,
  isAuthCheckedSelector,
  isAuthenticatedSelector
} = userSlice.selectors;
