import cn from 'classnames';
import { PlaceCardCities } from '../card/place-card';
import { useState } from 'react';
import { PlacesProps } from './types';
import { Map } from '../map/map';

interface CityPlacesProps extends PlacesProps {
  selectedCity: string;
}

export function Places({ selectedCity, offers }: CityPlacesProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const points = offers.map((x) => ({
    name: x.id,
    location: x.location,
  }));
  return (
    <>
      <section className={cn('cities__places', 'places')}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul
            className={cn(
              'places__options',
              'places__options--custom',
              'places__options--opened'
            )}
          >
            <li
              className={cn('places__option', 'places__option--active')}
              tabIndex={0}
            >
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div
          className={cn('cities__places-list', 'places__list', 'tabs__content')}
        >
          {offers.map((x) => (
            <PlaceCardCities key={x.id} offer={x} onHover={setActiveCard} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          city={{...points[0], location: {...points[0].location, zoom: 12}}}
          cities={points}
          selectedCity={points.find((x) => x.name === activeCard)}
          className="cities__map map"
        />
      </div>
    </>
  );
}
