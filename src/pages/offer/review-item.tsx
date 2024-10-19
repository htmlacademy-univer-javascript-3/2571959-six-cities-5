import { ReviewUserAvatar } from '../../components/user/user-avatar';
import { Review } from '../../types/review';
import moment from 'moment';

interface ReviewProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewProps) {
  const dateToFormat = moment.utc(review.date);
  return (
    <>
      <ReviewUserAvatar
        user={review.user}
        alt="Reviews avatar"
      />
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating * 100) / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={dateToFormat.format('YYYY-MM-DD')}
        >
          {dateToFormat.format('MMMM YYYY')}
        </time>
      </div>
    </>
  );
}
