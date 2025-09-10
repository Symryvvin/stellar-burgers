import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  isAuthCheckedSelector,
  isAuthenticatedSelector
} from '../../services/slices/userSlice';
import { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  if (!isAuthChecked) return <Preloader />;
  if (!isAuthenticated) return <Navigate replace to='/login' />;

  return <>{children}</>;
};
