import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offersSlice';
import { api } from '../api/api';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});
