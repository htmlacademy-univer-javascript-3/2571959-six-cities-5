import cn from 'classnames';
import { PlaceCardCities } from '../card/place-card';
import { useState } from 'react';
import { PlacesProps } from './types';
import { Map } from '../map/map';
import { sortingOrder, sorting, DEFAULT_ZOOM } from '../../utils/constants';
import { SortingOrder } from '../sorting-order/sorting-order';
import styles from './places.module.css';

interface CityPlacesProps extends PlacesProps {
  selectedCity: string;
}

export function Places({ selectedCity, offers }: CityPlacesProps) {
  const [order, setOrder] = useState<sortingOrder>('Price: low to high');
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const points = offers.map((x) => ({
    name: x.id,
    location: x.location,
  }));
  return (
    <>
      <section className={cn('cities__places', 'places')}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {selectedCity}
        </b>
        <SortingOrder order={order} onChangeOrder={setOrder} />
        <div
          className={cn('cities__places-list', 'places__list', 'tabs__content')}
        >
          {offers.sort(sorting[order]).map((x) => (
            <PlaceCardCities key={x.id} offer={x} onHover={setActiveCard} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          city={{
            ...points[0],
            location: { ...points[0].location, zoom: DEFAULT_ZOOM },
          }}
          places={points}
          selectedCity={points.find((x) => x.name === activeCard)}
          className={cn('map', styles['cities__map'])}
        />
      </div>
    </>
  );
}
