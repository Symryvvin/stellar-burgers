import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import {
  isAuthCheckedSelector,
  isAuthenticatedSelector,
  userSelector
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
