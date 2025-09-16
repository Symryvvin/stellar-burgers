import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  isAuthCheckedSelector,
  isAuthenticatedSelector
} from '../../services/slices/userSlice';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
