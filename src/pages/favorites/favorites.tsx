import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../routing/routing';
import { OfferCardData } from '../../types/offer';
import { useEffect, useMemo } from 'react';
import { CityGroup } from './city-group';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectFavoriteOffers } from '../../store/selectors';
import { fetchFavoriteOffers } from '../../store/offers/api-actions';
import { FavoritesEmptyPage } from './favorites-empty-page';

function extractGroups(offers: OfferCardData[]) {
  const groups = offers.reduce((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {} as Record<string, OfferCardData[]>);
  return Object.entries(groups);
}

export function FavoritesPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const offers = useAppSelector(selectFavoriteOffers);
  const groups = useMemo(() => extractGroups(offers), [offers]);

  if (!groups.length) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {groups.map(([city, offersGroup]) => (
                <CityGroup key={city} city={city} offers={offersGroup} />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.Root} className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
