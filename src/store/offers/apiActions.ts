import { Offer, OfferCardData } from '../../types/offer';
import { Review } from '../../types/review';
import { createGetAction } from '../../utils/actions';

export const fetchOffers = createGetAction<OfferCardData[]>(
  'FETCH_OFFERS',
  '/six-cities/offers'
);

export const fetchOffer = createGetAction<Offer, { offerId: string }>(
  'FETCH_OFFER',
  '/six-cities/offers/:offerId'
);

export const fetchNearbyOffers = createGetAction<
  OfferCardData[],
  { offerId: string }
>('FETCH_NEARBY_OFFERS', '/six-cities/offers/:offerId/nearby');

export const fetchReviews = createGetAction<Review[], { offerId: string }>(
  'FETCH_REVIEWS',
  'six-cities/comments/:offerId'
);
