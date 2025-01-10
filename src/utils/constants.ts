import { OfferCardData } from '../types/offer';

export enum SortingOrder {
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const sorting: Record<
  SortingOrder,
  (a: OfferCardData, b: OfferCardData) => number
> = {
  [SortingOrder.LowToHigh]: (a, b) => a.price - b.price,
  [SortingOrder.HighToLow]: (a, b) => b.price - a.price,
  [SortingOrder.TopRatedFirst]: (a, b) => b.rating - a.rating,
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
