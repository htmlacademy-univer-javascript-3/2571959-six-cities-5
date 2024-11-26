import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../utils/constants';
import { Offer, OfferCardData } from '../../types/offer';
import { fetchOffers } from './apiActions';
import { Review } from '../../types/review';

interface OffersState {
  city: string;
  offers: OfferCardData[];
  loading: boolean;
  reviews: Review[];
  offer?: Offer;
}

const initialState = {
  city: DEFAULT_CITY,
  offers: [],
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
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
      }),
});

export const { setCity, setOffers } = citiesSlice.actions;
export const offersReducer = citiesSlice.reducer;
