import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlaceCardFavorites, PlaceCardCities, PlaceCardNear } from './card';
import { generateOffer, withStore, withHistory } from '../../mocks';
import { AuthStatus } from '../../types/auth-status';

const cardId = 'place-card';

describe('Component: PlaceCardFavorites', () => {
  const mockOffer = generateOffer();

  it('should render PlaceCardFavorites with correct information', () => {
    const { withStoreComponent } = withStore(<PlaceCardFavorites offer={mockOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should render Premium mark when offer isPremium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const { withStoreComponent } = withStore(<PlaceCardFavorites offer={premiumOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

describe('Component: PlaceCardCities', () => {
  const mockOffer = generateOffer();

  it('should render PlaceCardCities with correct information', () => {
    const { withStoreComponent } = withStore(<PlaceCardCities offer={mockOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should call onHover callback when mouse enters and leaves', async () => {
    const mockHoverCallback = vi.fn();
    const { withStoreComponent } = withStore(<PlaceCardCities offer={mockOffer} onHover={mockHoverCallback} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const article = screen.getByTestId(cardId);
    await userEvent.hover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(1);
    expect(mockHoverCallback).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(2);
    expect(mockHoverCallback).toHaveBeenCalledWith(null);
  });

  it('should render Premium mark when offer isPremium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const { withStoreComponent } = withStore(<PlaceCardCities offer={premiumOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

describe('Component: PlaceCardNear', () => {
  const mockOffer = generateOffer();

  it('should render PlaceCardNear with correct information', () => {
    const { withStoreComponent } = withStore(<PlaceCardNear offer={mockOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should call onHover callback when mouse enters and leaves', async () => {
    const mockHoverCallback = vi.fn();
    const { withStoreComponent } = withStore(<PlaceCardNear offer={mockOffer} onHover={mockHoverCallback} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const article = screen.getByTestId(cardId);
    await userEvent.hover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(1);
    expect(mockHoverCallback).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(2);
    expect(mockHoverCallback).toHaveBeenCalledWith(null);
  });

  it('should render Premium mark when offer isPremium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const { withStoreComponent } = withStore(<PlaceCardNear offer={premiumOffer} />, { auth: { authStatus: AuthStatus.AUTH } });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
