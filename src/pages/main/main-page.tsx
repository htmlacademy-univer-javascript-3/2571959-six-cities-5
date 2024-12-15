import cn from 'classnames';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { Places } from '../../components/places/places';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectCurrentOffers } from '../../store/selectors';
import { setCity } from '../../store/offers/offersSlice';
import { Spinner } from '../../components/spinner/spinner';
import { useCallback, useEffect } from 'react';
import { fetchOffers } from '../../store/offers/apiActions';

export function MainPage() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectCurrentOffers);
  const isEmpty = offers.length === 0;
  const selectedCity = useAppSelector((state) => state.offers.city);
  const isLoading = useAppSelector((state) => state.offers.loading);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(setCity(city));
    },
    [dispatch]
  );

  return (
    <div className={cn('page', 'page--gray', 'page--main')}>
      <Header />
      <main
        className={cn('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs selectedCity={selectedCity} onCityChange={handleCityChange} />
        <div className="cities">
          <div
            className={cn('cities__places-container', 'container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <Places selectedCity={selectedCity} offers={offers} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
