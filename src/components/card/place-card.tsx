import { Offer } from '../../types/offer';
import { BookmarkButton } from '../bookmark/bookmark-button';
import { StarRating } from '../star-rating/star-rating';
import { Mark } from './mark';
import cn from 'classnames';

interface PlaceCardProps {
  offer: Offer;
  width: number;
  height: number;
}

export function PlaceCard({ offer, width, height }: PlaceCardProps) {
  return (
    <article className={cn('cities__card', 'place-card')}>
      {offer.isPremium && <Mark />}
      <div className={cn('cities__image-wrapper', 'place-card__image-wrapper')}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </a>
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
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
