import cn from 'classnames';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { Places } from '../../components/places/places';
import { PlacesEmpty } from '../../components/places/places-empty';

interface MainPageProps {
  cardsCount: number;
}

export function MainPage({ cardsCount }: MainPageProps) {
  const selectedCity = 'Amsterdam';
  return (
    <div className={cn('page', 'page--gray', 'page--main')}>
      <Header />
      <main
        className={cn('page__main', 'page__main--index', {
          'page__main--index-empty': cardsCount === 0,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs selectedCity={selectedCity} />
        <div className="cities">
          <div
            className={cn('cities__places-container', 'container', {
              'cities__places-container--empty': cardsCount === 0,
            })}
          >
            {cardsCount !== 0 ? (
              <Places cardsCount={cardsCount} selectedCity={selectedCity} />
            ) : (
              <PlacesEmpty selectedCity={selectedCity} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
