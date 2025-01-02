import { Header } from '../../components/header/header';
import { OfferBookmarkButton } from '../../components/bookmark/bookmark';
import { OfferStarRating } from '../../components/star-rating/star-rating';
import { OfferMark } from '../../components/card/mark';
import { OfferUserAvatar } from '../../components/user/user';
import { AuthStatus } from '../../types/auth-status';
import { Reviews } from './reviews';
import { ReviewForm } from './review-form';
import { NotFoundPage } from '../not-found/not-found';
import cn from 'classnames';
import { PlaceCardNear } from '../../components/card/card';
import { Map } from '../../components/map/map';
import { DEFAULT_ZOOM } from '../../utils/constants';
import styles from './offer-page.module.css';
import { Spinner } from '../../components/spinner/spinner';
import { useOfferPage } from './use-offer-page';
import { useAppSelector } from '../../hooks/redux';

export function OfferPage() {
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const { offer, reviews, nearOffers, isLoading } = useOfferPage();

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  const offerLocation = {
    location: { ...offer.location, zoom: DEFAULT_ZOOM },
    name: offer.id,
  };

  const nearPlaces = nearOffers
    .map((x) => ({
      location: x.location,
      name: x.id,
    }))
    .concat(offerLocation);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer?.images.map((src) => (
                <div className="offer__image-wrapper" key={src}>
                  <img className="offer__image" src={src} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <OfferMark />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <OfferBookmarkButton isFavorite={offer.isFavorite} offerId={offer.id} />
              </div>
              <OfferStarRating rating={offer.rating} />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp; night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((x) => (
                    <li key={x} className="offer__inside-item">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <OfferUserAvatar user={offer.host} alt="Host avatar" />
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Reviews reviews={reviews} />
                {authStatus === AuthStatus.AUTH && <ReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>
          <Map
            places={nearPlaces}
            city={{ ...offerLocation, name: offer.city.name }}
            selectedCity={offerLocation}
            className={cn('map', styles['offer__map-wrapper'])}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className={cn('near-places__list', 'places__list')}>
              {nearOffers.map((x) => (
                <PlaceCardNear key={x.id} offer={x} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
