import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavorite } from '../../store/offers/api-actions';
import { AuthStatus } from '../../types/auth-status';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../routing/routing';

interface BookmarkButtonProps extends GenericBookmarkButtonProps {
  className: string;
  iconClassName: string;
  width: number;
  height: number;
}

interface GenericBookmarkButtonProps {
  isFavorite: boolean;
  offerId: string;
}

function BookmarkButton({
  isFavorite,
  className,
  iconClassName,
  width,
  height,
  offerId,
}: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const handleClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(
      toggleFavorite({ params: { offerId, status: isFavorite ? '0' : '1' } })
    );
  };
  return (
    <button
      className={cn('button', className)}
      type="button"
      onClick={handleClick}
      data-testid="bookmark-button"
    >
      <svg className={iconClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks' }
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
