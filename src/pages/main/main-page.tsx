import cn from 'classnames';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { Places } from '../../components/places/places';
import { PlacesEmpty } from '../../components/places/places-empty';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectCurrentOffers } from '../../store/selectors';
import { setCity } from '../../store/offers/offersSlice';

export function MainPage() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectCurrentOffers);
  const isEmpty = offers.length === 0;
  const selectedCity = useAppSelector((state) => state.offers.city);

  const handleCityChange = (city: string) => {
    dispatch(setCity(city));
  };

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
            {isEmpty ? (
              <PlacesEmpty selectedCity={selectedCity} />
            ) : (
              <Places selectedCity={selectedCity} offers={offers} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
