import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/routes';
import { UserMenu } from './user-menu';
import { AuthStatus } from '../../types/auth-status';

interface HeaderProps {
  authStatus?: AuthStatus;
  showUserMenu?: boolean;
}

export function Header({ authStatus = AuthStatus.AUTH, showUserMenu = true }: HeaderProps) {
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
          {showUserMenu && <UserMenu isAuthorized={isAuth} />}
        </div>
      </div>
    </header>
  );
}
