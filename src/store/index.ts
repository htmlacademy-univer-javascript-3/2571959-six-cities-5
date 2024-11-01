import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './reducer';

export const store = configureStore({ reducer: citiesReducer });
