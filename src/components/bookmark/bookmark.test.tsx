import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { withStore, withHistory, extractActionsTypes } from '../../mocks';
import { PlaceCardBookmarkButton } from './bookmark';
import userEvent from '@testing-library/user-event';
import { toggleFavorite } from '../../store/offers/api-actions';
import { AppRoute } from '../../routing/routing';
import { AuthStatus } from '../../types/auth-status';

describe('Component: BookmarkButton', () => {
  const buttonId = 'bookmark-button';
  const defaultStore = { auth: { authStatus: AuthStatus.Auth } };

  it('should render BookmarkButton with correct text when isFavorite is false', async () => {
    const { withStoreComponent } = withStore(
      <PlaceCardBookmarkButton offerId="123" isFavorite={false} />,
      defaultStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const button = screen.getByTestId(buttonId);
    await userEvent.hover(button);

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render BookmarkButton with correct text when isFavorite is true', () => {
    const { withStoreComponent } = withStore(
      <PlaceCardBookmarkButton offerId="123" isFavorite />,
      defaultStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should call toggleFavorite function when button is clicked', async () => {
    const offerId = '123';
    const isFavorite = false;
    const { withStoreComponent, mockStore } = withStore(
      <PlaceCardBookmarkButton offerId={offerId} isFavorite={isFavorite} />,
      defaultStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(buttonId));
    const actions = mockStore.getActions();
    const actionsTypes = extractActionsTypes(actions);
    const toggleFavoritePendingAction = actions.at(0) as ReturnType<
      typeof toggleFavorite.pending
    >;

    expect(actionsTypes).toContainEqual(toggleFavorite.pending.type);
    expect(toggleFavoritePendingAction.meta.arg.params).toEqual({
      offerId: offerId,
      status: Number(!isFavorite).toString(),
    });
  });

  it('should navigate to login route if user not authenticated', async () => {
    const offerId = '123';
    const isFavorite = false;
    const { withStoreComponent } = withStore(
      <PlaceCardBookmarkButton offerId={offerId} isFavorite={isFavorite} />,
      { auth: { authStatus: AuthStatus.NoAuth } }
    );
    const history = createMemoryHistory();
    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(buttonId));

    expect(history.location.pathname).toEqual(AppRoute.Login);
  });
});
