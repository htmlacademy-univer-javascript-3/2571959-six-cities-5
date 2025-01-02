import { OfferCardData } from '../types/offer';

export enum SortingOrder {
  LOW_TO_HIGH = 'Price: low to high',
  HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED_FIRST = 'Top rated first',
}

export const sorting: Record<
  SortingOrder,
  (a: OfferCardData, b: OfferCardData) => number
> = {
  [SortingOrder.LOW_TO_HIGH]: (a, b) => a.price - b.price,
  [SortingOrder.HIGH_TO_LOW]: (a, b) => b.price - a.price,
  [SortingOrder.TOP_RATED_FIRST]: (a, b) => b.rating - a.rating,
};

export const DEFAULT_CITY = 'Amsterdam';

export const DEFAULT_ZOOM = 12;

export const locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
