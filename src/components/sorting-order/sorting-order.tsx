import cn from 'classnames';
import { SortingOrder } from '../../utils/constants';
import { useState } from 'react';

interface SortingOrderProps {
  order: SortingOrder;
  onChangeOrder: (order: SortingOrder) => void;
}

export function SortingOrderSelect({ order, onChangeOrder }: SortingOrderProps) {
  const [opened, setOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened(!opened)}
        data-testid="sorting-button"
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
        {Object.values(SortingOrder).map((key) => (
          <li
            key={key}
            className={cn('places__option', {
              'places__option--active': key === order,
            })}
            tabIndex={0}
            onClick={() => {
              onChangeOrder(key as SortingOrder);
              setOpened(false);
            }}
            data-testid={`sorting-option-${key}`}
          >
            {key}
          </li>
        ))}
      </ul>
    </form>
  );
}
