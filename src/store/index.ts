import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offersSlice';

export const store = configureStore({ reducer: {
  offers: offersReducer
}});
