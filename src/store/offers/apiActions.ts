import { Offer, OfferCardData } from '../../types/offer';
import { Review } from '../../types/review';
import { createGetAction, createPostAction } from '../../utils/actions';

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

export const addReview = createPostAction<
  Review,
  { params: { offerId: string }; data: { comment: string; rating: number } }
>('ADD_REVIEW', 'six-cities/comments/:offerId');

export const fetchFavoriteOffers = createGetAction<OfferCardData[]>(
  'FETCH_FAVORITE_OFFERS',
  '/six-cities/favorite'
);

export const toggleFavorite = createPostAction<
  Offer,
  { params: { offerId: string; status: string } }
>('CHANGE_FAVORITE_STATUS', '/six-cities/favorite/:offerId/:status');
