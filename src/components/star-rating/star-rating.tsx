import cn from 'classnames';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const width = (rating / 5) * 100;
  return (
    <div className={cn('place-card__rating', 'rating')}>
      <div className={cn('place-card__stars', 'rating__stars')}>
        <span style={{ width: `${width}%`}} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
