import { render } from '@testing-library/react';
import { StarRating, PlaceCardStarRating, OfferStarRating } from './star-rating';

describe('StarRating Component', () => {
  it('renders correctly with given rating', () => {
    const { container } = render(
      <StarRating
        rating={4}
        ratingClassName="test-rating"
        starsClassName="test-stars"
        showRating
      />
    );
    expect(container.querySelector('.test-rating')).toBeInTheDocument();
    expect(container.querySelector('.test-stars')).toBeInTheDocument();
    expect(container.querySelector('.offer__rating-value')).toHaveTextContent('4');
  });

  it('renders correctly without showing rating', () => {
    const { container } = render(
      <StarRating
        rating={3}
        ratingClassName="test-rating"
        starsClassName="test-stars"
        showRating={false}
      />
    );
    expect(container.querySelector('.test-rating')).toBeInTheDocument();
    expect(container.querySelector('.test-stars')).toBeInTheDocument();
    expect(container.querySelector('.offer__rating-value')).not.toBeInTheDocument();
  });
});

describe('PlaceCardStarRating Component', () => {
  it('renders correctly with given rating', () => {
    const { container } = render(<PlaceCardStarRating rating={4} />);
    expect(container.querySelector('.place-card__rating')).toBeInTheDocument();
    expect(container.querySelector('.place-card__stars')).toBeInTheDocument();
    expect(container.querySelector('.offer__rating-value')).not.toBeInTheDocument();
  });
});

describe('OfferStarRating Component', () => {
  it('renders correctly with given rating', () => {
    const { container } = render(<OfferStarRating rating={5} />);
    expect(container.querySelector('.offer__rating')).toBeInTheDocument();
    expect(container.querySelector('.offer__stars')).toBeInTheDocument();
    expect(container.querySelector('.offer__rating-value')).toHaveTextContent('5');
  });
});
