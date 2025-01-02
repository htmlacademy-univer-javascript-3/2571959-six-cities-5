import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute } from '../../routing/routing';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/auth/api-actions';

export function UserData({
  email,
  favoriteCount,
}: {
  email: string;
  favoriteCount: number;
}) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className="header__nav-list">
      <li className={cn('header__nav-item', 'user')}>
        <Link
          className={cn('header__nav-link', 'header__nav-link--profile')}
          to={AppRoute.FAVORITES}
        >
          <div
            className={cn('header__avatar-wrapper', 'user__avatar-wrapper')}
          />
          <span className={cn('header__user-name', 'user__name')}>{email}</span>
          <span className="header__favorite-count">{favoriteCount}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.LOGIN} onClick={handleLogout}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export function UserDataNoAuth() {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.LOGIN}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper" />
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}
