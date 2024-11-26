import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offersSlice';
import { api } from '../api/api';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});
