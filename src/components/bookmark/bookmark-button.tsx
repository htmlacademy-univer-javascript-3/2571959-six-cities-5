import cn from 'classnames';

interface BookmarkButtonProps extends GenericBookmarkButtonProps {
  className: string;
  iconClassName: string;
  width: number;
  height: number;
}

interface GenericBookmarkButtonProps {
  isFavorite: boolean;
}

function BookmarkButton({
  isFavorite,
  className,
  iconClassName,
  width,
  height,
}: BookmarkButtonProps) {
  return (
    <button className={cn('button', className)} type="button">
      <svg className={iconClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'To bookmarks' : 'In bookmarks'}
      </span>
    </button>
  );
}

export function PlaceCardBookmarkButton(props: GenericBookmarkButtonProps) {
  return (
    <BookmarkButton
      {...props}
      className={cn('place-card__bookmark-button', {
        'place-card__bookmark-button--active': props.isFavorite,
      })}
      iconClassName="place-card__bookmark-icon"
      width={18}
      height={19}
    />
  );
}

export function OfferBookmarkButton(props: GenericBookmarkButtonProps) {
  return (
    <BookmarkButton
      {...props}
      className={cn('offer__bookmark-button', {
        'offer__bookmark-button--active': props.isFavorite,
      })}
      iconClassName="offer__bookmark-icon"
      width={18}
      height={19}
    />
  );
}
