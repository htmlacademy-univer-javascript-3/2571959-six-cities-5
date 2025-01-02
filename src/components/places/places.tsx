import cn from 'classnames';
import { PlaceCardCities } from '../card/card';
import { memo, useState } from 'react';
import { PlacesProps } from './types';
import { Map } from '../map/map';
import { sorting, DEFAULT_ZOOM, SortingOrder } from '../../utils/constants';
import { SortingOrderSelect } from '../sorting-order/sorting-order';
import styles from './places.module.css';
import { PlacesEmpty } from './places-empty';

interface CityPlacesProps extends PlacesProps {
  selectedCity: string;
}

function PlacesInternal({ selectedCity, offers }: CityPlacesProps) {
  const [order, setOrder] = useState<SortingOrder>(SortingOrder.LOW_TO_HIGH);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  if (offers.length === 0) {
    return <PlacesEmpty selectedCity={selectedCity} />;
  }

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
        <SortingOrderSelect order={order} onChangeOrder={setOrder} />
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

export const Places = memo(PlacesInternal);
