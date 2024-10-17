import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/routes';

interface CityLabelProps {
  city: string;
}

export function CityLabel({ city }: CityLabelProps) {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.ROOT}>
          <span>{city}</span>
        </Link>
      </div>
    </div>
  );
}
