import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { AuthStatus } from '../../types/auth-status';
import { UserFullData } from '../../types/user';
import { checkLogin, login, logout } from './apiActions';
import { dropToken, saveToken } from '../../api/token';

interface AuthState {
  user?: UserFullData;
  authStatus: AuthStatus;
}

const initialState = {
  authStatus: AuthStatus.UNKNOWN,
} as AuthState;

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addMatcher(
      isAnyOf(login.fulfilled, checkLogin.fulfilled),
      (state, action) => {
        const user = action.payload;
        state.user = user;
        state.authStatus = AuthStatus.AUTH;
        saveToken(user.token);
      }
    )
    .addMatcher(
      isAnyOf(login.rejected, checkLogin.rejected, logout.fulfilled),
      (state) => {
        state.authStatus = AuthStatus.NO_AUTH;
        state.user = undefined;
        dropToken();
      }
    )
);
