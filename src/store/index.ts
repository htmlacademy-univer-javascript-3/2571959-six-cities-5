import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offers';
import { api } from '../api/api';
import { authReducer } from './auth/auth';

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
