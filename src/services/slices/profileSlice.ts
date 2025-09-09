import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi, logoutApi, TRegisterData, updateUserApi } from '@api';

type TProfileState = {
  user: TUser | null;
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

const initialState: TProfileState = {
  user: null,
  error: null,
  status: 'success'
};

export const getUser = createAsyncThunk('profile/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const logout = createAsyncThunk('profile/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFormValue: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    profileSelector: (state) => state.user,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message ?? 'Ошибка при получении профиля пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message || 'Ошибка обновления профиля пользователя';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'success';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

export const { setFormValue } = profileSlice.actions;

export const { errorSelector, profileSelector } = profileSlice.selectors;
