import { Outlet } from 'react-router-dom';
import { AppRoute } from './routing';
import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../types/auth-status';
import { useAppSelector } from '../hooks/redux';

export function PrivateRoute() {
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const isAuth = authStatus === AuthStatus.AUTH;
  return isAuth ? <Outlet /> : <Navigate to={AppRoute.LOGIN} />;
}
