import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { AuthStatus } from '../../types/auth-status';
import { generateUser, withHistory, withStore } from '../../mocks';

const defaultState = {
  auth: { user: generateUser(), authStatus: AuthStatus.NO_AUTH },
  offers: {
    cards: { all: { ids: [], entities: {} }, nearbyIds: [] },
    loading: false,
    reviews: [],
    city: 'Paris',
  },
};

describe('Header component', () => {
  it('should render logo link', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Header />),
      defaultState
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render user data when authenticated', () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), {
      ...defaultState,
      auth: { ...defaultState.auth, authStatus: AuthStatus.AUTH },
    });

    render(withStoreComponent);

    expect(screen.getByText(defaultState.auth.user.email)).toBeInTheDocument();
  });

  it('should render no auth user data when not authenticated', () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), defaultState);

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
