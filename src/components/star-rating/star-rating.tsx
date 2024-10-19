import cn from 'classnames';

interface StarRatingProps {
  rating: number;
}

interface GenericStarRatingProps extends StarRatingProps {
  ratingClassName: string;
  starsClassName: string;
  showRating: boolean;
}

export function StarRating({
  rating,
  ratingClassName,
  starsClassName,
  showRating,
}: GenericStarRatingProps) {
  const width = (rating / 5) * 100;
  return (
    <div className={cn(ratingClassName, 'rating')}>
      <div className={cn(starsClassName, 'rating__stars')}>
        <span style={{ width: `${width}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {showRating && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div>
  );
}

export function PlaceCardStarRating(props: StarRatingProps) {
  return (
    <StarRating
      {...props}
      ratingClassName="place-card__rating"
      starsClassName="place-card__stars"
      showRating={false}
    />
  );
}

export function OfferStarRating(props: StarRatingProps) {
  return (
    <StarRating
      {...props}
      ratingClassName="offer__rating"
      starsClassName="offer__stars"
      showRating
    />
  );
}
