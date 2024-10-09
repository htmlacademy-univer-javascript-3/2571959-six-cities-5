import { Outlet } from 'react-router-dom';
import { AppRoute } from './routes';
import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../types/auth-status';

interface PrivateRouteProps {
  authStatus: AuthStatus;
}

export function PrivateRoute({ authStatus }: PrivateRouteProps) {
  const isAuth = authStatus === AuthStatus.AUTH;
  return isAuth ? <Outlet /> : <Navigate to={AppRoute.LOGIN} />;
}
