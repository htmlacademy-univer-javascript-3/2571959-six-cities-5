import { Link } from 'react-router-dom';
import { OfferCardData } from '../../types/offer';
import { PlaceCardBookmarkButton } from '../bookmark/bookmark-button';
import { PlaceCardStarRating } from '../star-rating/star-rating';
import { Mark } from './mark';
import cn from 'classnames';
import { buildRoute } from '../../utils/url';
import { AppRoute } from '../../routing/routes';
import { memo } from 'react';

interface PlaceCardProps {
  offer: OfferCardData;
  width: number;
  height: number;
  mainClassName: string;
  imageWrapperClassName: string;
  infoClassName?: string;
  onHover?: (id: string | null) => void;
}

function PlaceCardInternal({
  offer,
  width,
  height,
  mainClassName,
  imageWrapperClassName,
  infoClassName,
  onHover,
}: PlaceCardProps) {
  const offerRoute = buildRoute(AppRoute.OFFER, { id: offer.id });
  return (
    <article
      className={cn(mainClassName, 'place-card')}
      onMouseEnter={() => onHover?.(offer.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {offer.isPremium && <Mark />}
      <div className={cn('place-card__image-wrapper', imageWrapperClassName)}>
        <Link to={offerRoute}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cn('place-card__info', infoClassName)}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <PlaceCardBookmarkButton isFavorite={offer.isFavorite} />
        </div>
        <PlaceCardStarRating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={offerRoute}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export const PlaceCard = memo(PlaceCardInternal);

function PlaceCardFavoritesInternal({ offer }: Pick<PlaceCardProps, 'offer'>) {
  return (
    <PlaceCard
      offer={offer}
      width={150}
      height={110}
      mainClassName="favorites__card"
      imageWrapperClassName="favorites__image-wrapper"
      infoClassName="favorites__card-info"
    />
  );
}

function PlaceCardCitiesInternal({
  offer,
  onHover,
}: Pick<PlaceCardProps, 'offer' | 'onHover'>) {
  return (
    <PlaceCard
      offer={offer}
      width={260}
      height={200}
      onHover={onHover}
      mainClassName="cities__card"
      imageWrapperClassName="cities__image-wrapper"
    />
  );
}

function PlaceCardNearInternal({
  offer,
  onHover,
}: Pick<PlaceCardProps, 'offer' | 'onHover'>) {
  return (
    <PlaceCard
      offer={offer}
      width={260}
      height={200}
      onHover={onHover}
      mainClassName="near-places__card"
      imageWrapperClassName="near-places__image-wrapper"
    />
  );
}

export const PlaceCardFavorites = memo(PlaceCardFavoritesInternal);
export const PlaceCardCities = memo(PlaceCardCitiesInternal);
export const PlaceCardNear = memo(PlaceCardNearInternal);

