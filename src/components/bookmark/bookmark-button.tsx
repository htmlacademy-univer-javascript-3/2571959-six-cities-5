import cn from 'classnames';

interface BookmarkButtonProps {
  isFavorite: boolean;
}

export function BookmarkButton({ isFavorite }: BookmarkButtonProps) {
  return (
    <button
      className={cn('place-card__bookmark-button', 'button', {
        'place-card__bookmark-button--active': isFavorite,
      })}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'To bookmarks' : 'In bookmarks'}
      </span>
    </button>
  );
}
