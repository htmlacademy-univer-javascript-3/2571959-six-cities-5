import { Offer, OfferCardData } from '../../types/offer';
import { Review } from '../../types/review';
import { createGetAction, createPostAction } from '../../utils/actions';

export const fetchOffers = createGetAction<OfferCardData[]>(
  'offers/get-all',
  '/six-cities/offers'
);

export const fetchOffer = createGetAction<Offer, { offerId: string }>(
  'offers/get-by-id',
  '/six-cities/offers/:offerId'
);

export const fetchNearbyOffers = createGetAction<
  OfferCardData[],
  { offerId: string }
>('offers/get-nearby', '/six-cities/offers/:offerId/nearby');

export const fetchReviews = createGetAction<Review[], { offerId: string }>(
  'reviews/get-by-offer-id',
  'six-cities/comments/:offerId'
);

export const addReview = createPostAction<
  Review,
  { params: { offerId: string }; data: { comment: string; rating: number } }
>('reviews/add', 'six-cities/comments/:offerId');

export const fetchFavoriteOffers = createGetAction<OfferCardData[]>(
  'offers/get-favorite',
  '/six-cities/favorite'
);

export const toggleFavorite = createPostAction<
  Offer,
  { params: { offerId: string; status: string } }
>('offers/toggle-favorite', '/six-cities/favorite/:offerId/:status');
