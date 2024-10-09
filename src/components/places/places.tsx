import cn from 'classnames';
import { PlaceCard } from '../card/place-card';

interface PlacesProps {
  cardsCount: number;
  selectedCity: string;
}

export function Places({ cardsCount, selectedCity }: PlacesProps) {
  return (
    <>
      <section className={cn('cities__places', 'places')}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">312 places to stay in {selectedCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul
            className={cn(
              'places__options',
              'places__options--custom',
              'places__options--opened'
            )}
          >
            <li
              className={cn('places__option', 'places__option--active')}
              tabIndex={0}
            >
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div
          className={cn('cities__places-list', 'places__list', 'tabs__content')}
        >
          {[...Array<number>(cardsCount)].map((_, i) => (
            <PlaceCard
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              offer={{
                id: '12312',
                title: 'Beautiful & luxurious apartment at great location',
                price: 120,
                type: 'Apartment',
                rating: 4.8,
                isPremium: true,
                isFavorite: false,
                previewImage: 'img/apartment-01.jpg',
              }}
              width={260}
              height={200}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </>
  );
}
