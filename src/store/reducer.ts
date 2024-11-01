import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { setCity, setOffers } from './action';

const initialState = {
  city: 'Amsterdam',
  offers,
};

export const citiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
