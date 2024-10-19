import { Review } from '../../types/review';
import { ReviewItem } from './review-item';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {[...reviews]
          .sort(
            (x, y) => new Date(y.date).getTime() - new Date(x.date).getTime()
          )
          .slice(0, 10)
          .map((review) => (
            <li
              key={review.id}
              className="reviews__item"
            >
              <ReviewItem review={review} />
            </li>
          ))}
      </ul>
    </>
  );
}
