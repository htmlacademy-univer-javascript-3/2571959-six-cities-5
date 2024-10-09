import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { BookmarkButton } from '../bookmark/bookmark-button';
import { StarRating } from '../star-rating/star-rating';
import { Mark } from './mark';
import cn from 'classnames';
import { buildRoute } from '../../utils/url';
import { AppRoute } from '../../routing/routes';

interface PlaceCardProps {
  offer: Offer;
  width: number;
  height: number;
}

export function PlaceCard({ offer, width, height }: PlaceCardProps) {
  const offerRoute = buildRoute(AppRoute.OFFER, { id: offer.id });
  return (
    <article className={cn('cities__card', 'place-card')}>
      {offer.isPremium && <Mark />}
      <div className={cn('cities__image-wrapper', 'place-card__image-wrapper')}>
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
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {<BookmarkButton isFavorite={offer.isFavorite} />}
        </div>
        <StarRating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={offerRoute}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
