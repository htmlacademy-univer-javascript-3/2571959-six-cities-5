import { PlaceCardFavorites } from '../../components/card/place-card';
import { OfferCardData } from '../../types/offer';
import { CityLabel } from './city-label';

interface CityGroupProps {
  city: string;
  offers: OfferCardData[];
}

export function CityGroup({ city, offers }: CityGroupProps) {
  return (
    <li className="favorites__locations-items">
      <CityLabel city={city} />
      <div className="favorites__places">
        {offers.map((x) => (
          <PlaceCardFavorites key={x.id} offer={x} />
        ))}
      </div>
    </li>
  );
}
