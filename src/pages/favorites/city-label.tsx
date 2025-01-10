import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/routing';

interface CityLabelProps {
  city: string;
}

export function CityLabel({ city }: CityLabelProps) {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Root}>
          <span>{city}</span>
        </Link>
      </div>
    </div>
  );
}
