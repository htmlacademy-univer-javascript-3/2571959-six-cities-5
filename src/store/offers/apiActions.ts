import { OfferCardData } from '../../types/offer';
import { createGetAction } from '../../utils/actions';

export const fetchOffers = createGetAction<OfferCardData[]>(
  'FETCH_OFFERS',
  '/six-cities/offers'
);
