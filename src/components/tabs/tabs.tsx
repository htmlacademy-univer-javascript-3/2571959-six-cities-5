import cn from 'classnames';

interface TabsProps {
  selectedCity: string;
}

export function Tabs({ selectedCity }: TabsProps) {
  const locations = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ];

  return (
    <div className="tabs">
      <section className={cn('locations', 'container')}>
        <ul className={cn('locations__list', 'tabs__list')}>
          {locations.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={cn('locations__item-link', 'tabs__item', {
                  'tabs__item--active': city === selectedCity,
                })}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
