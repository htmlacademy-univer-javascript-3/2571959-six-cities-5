import { UserData, UserDataNoAuth } from './user-data';

interface UserMenuProps {
  isAuthorized: boolean;
}

export function UserMenu({ isAuthorized }: UserMenuProps) {
  const userData = {
    email: 'Oliver.conner@gmail.com',
    favoriteCount: 3,
  };
  return (
    <nav className="header__nav">
      {isAuthorized ? <UserData {...userData} /> : <UserDataNoAuth />}
    </nav>
  );
}
