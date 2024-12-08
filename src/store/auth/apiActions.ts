import { UserFullData } from '../../types/user';
import {
  createDeleteAction,
  createGetAction,
  createPostAction,
} from '../../utils/actions';

export const checkLogin = createGetAction<UserFullData>(
  'CHECK_LOGIN',
  '/six-cities/login'
);

export const login = createPostAction<
  UserFullData,
  { data: { email: string; password: string } }
>('LOGIN', '/six-cities/login');

export const logout = createDeleteAction('LOGOUT', '/six-cities/logout');
