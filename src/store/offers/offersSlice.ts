import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../utils/constants';
import { Offer, OfferCardData } from '../../types/offer';
import { fetchNearbyOffers, fetchOffer, fetchOffers, fetchReviews } from './apiActions';
import { Review } from '../../types/review';

interface OffersState {
  city: string;
  offers: OfferCardData[];
  nearbyOffers: OfferCardData[];
  loading: boolean;
  reviews: Review[];
  offer?: Offer;
}

const initialState = {
  city: DEFAULT_CITY,
  offers: [],
  nearbyOffers: [],
  loading: false,
  reviews: [],
} as OffersState;

const citiesSlice = createSlice({
  initialState,
  name: 'cities',
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    clearOffer: (state) => {
      state.offer = undefined;
      state.nearbyOffers = [];
      state.reviews = [];
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offer = undefined;
        state.loading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addMatcher(isAnyOf(fetchOffers.pending, fetchOffer.pending), (state) => {
        state.loading = true;
      })
});

export const { setCity, setOffers, clearOffer } = citiesSlice.actions;
export const offersReducer = citiesSlice.reducer;
