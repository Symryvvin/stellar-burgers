import { Middleware } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { login, logout, register } from '../slices/userSlice';

export const userMiddleware: Middleware = () => (next) => (action) => {
  if (register.fulfilled.match(action) || login.fulfilled.match(action)) {
    const { accessToken, refreshToken } = action.payload;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  if (logout.fulfilled.match(action)) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return next(action);
};
