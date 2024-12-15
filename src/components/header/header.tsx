import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/routes';
import { AuthStatus } from '../../types/auth-status';
import { useAppSelector } from '../../hooks/redux';
import { UserData, UserDataNoAuth } from './user-data';
import { memo } from 'react';

interface HeaderProps {
  showUserMenu?: boolean;
}

function HeaderInternal({ showUserMenu = true }: HeaderProps) {
  const { user, authStatus } = useAppSelector((state) => state.auth);
  const isAuth = authStatus === AuthStatus.AUTH;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.ROOT}
              className={cn('header__logo-link', 'header__logo-link--active')}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {showUserMenu && (
            <nav className="header__nav">
              {isAuth ? (
                <UserData email={user!.email} favoriteCount={3} />
              ) : (
                <UserDataNoAuth />
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderInternal);
