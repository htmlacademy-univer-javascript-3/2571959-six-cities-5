import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { offers } from '../../mocks/offers';
import { reviews } from '../../mocks/reviews';
import { DEFAULT_CITY } from '../../utils/constants';
import { Offer } from '../../types/offer';

const initialState = {
  city: DEFAULT_CITY,
  offers,
  reviews,
};

const citiesSlice = createSlice({
  initialState,
  name: 'cities',
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  }
});

export const { setCity, setOffers } = citiesSlice.actions;
export const offersReducer = citiesSlice.reducer;
