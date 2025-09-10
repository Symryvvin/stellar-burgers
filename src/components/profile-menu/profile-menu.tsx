import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  isAuthenticatedSelector,
  logout
} from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthenticatedSelector);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) {
      navigate('/feed');
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
