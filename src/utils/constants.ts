import { OfferCardData } from '../types/offer';

const sortingOrders = {
  'Price: low to high': 1,
  'Price: high to low': 2,
  'Top rated first': 3,
};

export type sortingOrder = keyof typeof sortingOrders;

export const sorting: Record<
  sortingOrder,
  (a: OfferCardData, b: OfferCardData) => number
> = {
  'Price: low to high': (a, b) => a.price - b.price,
  'Price: high to low': (a, b) => b.price - a.price,
  'Top rated first': (a, b) => b.rating - a.rating,
};

export const sortingKeys = Object.keys(sortingOrders);

export const DEFAULT_CITY = 'Amsterdam';

export const DEFAULT_ZOOM = 12;
