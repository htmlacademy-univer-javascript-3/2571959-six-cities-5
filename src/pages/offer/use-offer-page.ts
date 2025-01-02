import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOffer, fetchNearbyOffers, fetchReviews } from '../../store/offers/api-actions';
import { clearOffer, setCity } from '../../store/offers/offers';
import { DEFAULT_CITY } from '../../utils/constants';
import { selectNearbyOffers } from '../../store/selectors';

export function useOfferPage() {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams<{ id?: string }>();

  useEffect(() => {
    if (!offerId) {
      return () => {};
    }
    dispatch(fetchOffer({ offerId }));
    dispatch(fetchNearbyOffers({ offerId }));
    dispatch(fetchReviews({offerId}));

    return () => dispatch(clearOffer());
  }, [offerId, dispatch]);

  const offer = useAppSelector((state) => state.offers.offer);

  useEffect(() => {
    dispatch(setCity(offer?.city.name ?? DEFAULT_CITY));
  }, [offer, dispatch]);

  const reviews = useAppSelector((state) => state.offers.reviews ?? []).slice(0, 10);
  const nearOffers = useAppSelector(selectNearbyOffers).slice(0, 3);
  const isLoading = useAppSelector((state) => state.offers.loading);

  return { offer, reviews, nearOffers, isLoading };
}
