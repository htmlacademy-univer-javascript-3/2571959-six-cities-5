import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';

export const selectCurrentOffers = createSelector(
  [(state: State) => state.offers.city, (state: State) => state.offers],
  (city, offers) => offers.offers.filter((x) => x.city.name === city)
);
