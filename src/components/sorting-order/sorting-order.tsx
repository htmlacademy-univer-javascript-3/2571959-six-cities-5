import cn from 'classnames';
import { sortingOrder, sortingKeys } from '../../utils/constants';
import { useState } from 'react';

interface SortingOrderProps {
  order: string;
  onChangeOrder: (order: sortingOrder) => void;
}

export function SortingOrder({ order, onChangeOrder }: SortingOrderProps) {
  const [opened, setOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened(!opened)}
      >
        {order}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn('places__options', 'places__options--custom', {
          'places__options--opened': opened,
        })}
      >
        {sortingKeys.map((key) => (
          <li
            key={key}
            className={cn('places__option', {
              'places__option--active': key === order,
            })}
            tabIndex={0}
            onClick={() => {
              onChangeOrder(key as sortingOrder);
              setOpened(false);
            }}
          >
            {key}
          </li>
        ))}
      </ul>
    </form>
  );
}
