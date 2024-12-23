import {
  createSlice,
  PayloadAction,
  isAnyOf,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../utils/constants';
import { Offer, OfferCardData } from '../../types/offer';
import {
  addReview,
  toggleFavorite,
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  fetchReviews,
} from './apiActions';
import { Review } from '../../types/review';
import { checkLogin, login, logout } from '../auth/apiActions';

const offersAdapter = createEntityAdapter<OfferCardData>({
  selectId: (offer) => offer.id,
});

interface OffersState {
  city: string;
  cards: {
    all: EntityState<OfferCardData>;
    nearbyIds: string[];
  };
  loading: boolean;
  reviews: Review[];
  offer?: Offer;
}

const initialState = {
  city: DEFAULT_CITY,
  cards: {
    all: offersAdapter.getInitialState(),
    nearbyIds: [],
  },
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
      offersAdapter.upsertMany(state.cards.all, action.payload);
    },
    clearOffer: (state) => {
      state.offer = undefined;
      state.cards.nearbyIds = [];
      state.reviews = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        offersAdapter.upsertMany(state.cards.all, action.payload);
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
        offersAdapter.upsertMany(state.cards.all, action.payload);
        state.cards.nearbyIds = action.payload.map((offer) => offer.id);
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        offersAdapter.upsertMany(state.cards.all, action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        offersAdapter.upsertOne(state.cards.all, action.payload);
        if (state.offer?.id === action.payload.id) {
          state.offer = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(login.rejected, checkLogin.rejected, logout.fulfilled),
        (state) => {
          Object.values(state.cards.all.entities)
            .filter((x) => x !== undefined)
            .forEach((c) => {
              c.isFavorite = false;
            });
          if (state.offer?.isFavorite === true) {
            state.offer.isFavorite = false;
          }
        }
      )
      .addMatcher(isAnyOf(fetchOffers.pending, fetchOffer.pending), (state) => {
        state.loading = true;
      }),
});

export const {
  selectAll: selectOffers,
  selectById: selectOfferById,
  selectEntities: selectOffersMap,
} = offersAdapter.getSelectors();
export const { setCity, setOffers, clearOffer } = citiesSlice.actions;
export const offersReducer = citiesSlice.reducer;
