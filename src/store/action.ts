import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const setCity = createAction<string>('SET_CITY');

export const setOffers = createAction<Offer[]>('SET_OFFER');
