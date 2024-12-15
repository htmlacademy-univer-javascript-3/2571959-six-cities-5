import cn from 'classnames';
import { memo } from 'react';

interface TabsProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

interface TabProps {
  city: string;
  active: boolean;
  onCityChange: (city: string) => void;
}

function TabInternal({ city, active, onCityChange }: TabProps) {
  return (
    <li key={city} className="locations__item">
      <a
        className={cn('locations__item-link', 'tabs__item', {
          'tabs__item--active': active,
        })}
        onClick={() => onCityChange(city)}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

const Tab = memo(TabInternal);

const locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

function TabsInternal({ selectedCity, onCityChange }: TabsProps) {
  return (
    <div className="tabs">
      <section className={cn('locations', 'container')}>
        <ul className={cn('locations__list', 'tabs__list')}>
          {locations.map((city) => (
            <Tab
              key={city}
              city={city}
              active={city === selectedCity}
              onCityChange={onCityChange}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export const Tabs = memo(TabsInternal);
