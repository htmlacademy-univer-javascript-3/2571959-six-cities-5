import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { selectOffers, selectOffersMap } from './offers/offersSlice';

export const selectNearbyOffers = createSelector(
  [
    (state: State) => selectOffersMap(state.offers.cards.all),
    (state: State) => state.offers.cards.nearbyIds,
  ],
  (offers, ids) => ids.map((id) => offers[id]).filter((x) => x !== undefined)
);

export const selectFavoriteOffers = createSelector(
  [(state: State) => selectOffers(state.offers.cards.all)],
  (offers) => offers.filter((x) => x.isFavorite)
);

export const selectCurrentOffers = createSelector(
  [
    (state: State) => state.offers.city,
    (state: State) => selectOffers(state.offers.cards.all),
  ],
  (city, offers) => offers.filter((x) => x.city.name === city)
);
