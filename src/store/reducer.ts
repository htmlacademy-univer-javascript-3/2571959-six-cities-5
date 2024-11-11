import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { setCity, setOffers } from './action';
import { reviews } from '../mocks/reviews';
import { DEFAULT_CITY } from '../utils/constants';

const initialState = {
  city: DEFAULT_CITY,
  offers,
  reviews,
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
