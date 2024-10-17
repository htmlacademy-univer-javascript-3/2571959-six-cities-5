import cn from 'classnames';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { Places } from '../../components/places/places';
import { PlacesEmpty } from '../../components/places/places-empty';
import { OfferCardData } from '../../types/offer';
import { useState } from 'react';

interface MainPageProps {
  offers: OfferCardData[];
}

export function MainPage({ offers }: MainPageProps) {
  const [selectedCity, setSelectedCity] = useState('Paris');
  offers = offers.filter((x) => x.city.name === selectedCity);
  const isEmpty = offers.length === 0;
  return (
    <div className={cn('page', 'page--gray', 'page--main')}>
      <Header />
      <main
        className={cn('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs selectedCity={selectedCity} onCityChange={setSelectedCity} />
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
