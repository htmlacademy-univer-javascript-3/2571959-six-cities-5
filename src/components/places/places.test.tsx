import { render, screen } from '@testing-library/react';
import { Places } from './places';

import { SortingOrder } from '../../utils/constants';
import { generateOffer, withStore, withHistory } from '../../mocks';
import { AuthStatus } from '../../types/auth-status';

describe('Component: Places', () => {
  const mockOffers = Array.from({ length: 3 }, generateOffer);
  const selectedCity = 'Amsterdam';

  it('should render all offers in the list', () => {
    const { withStoreComponent } = withStore(
      <Places selectedCity={selectedCity} offers={mockOffers} />,
      { auth: { authStatus: AuthStatus.Auth } }
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(`${mockOffers.length} places to stay in ${selectedCity}`)).toBeInTheDocument();

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });

  it('should render PlacesEmpty when there are no offers', () => {
    const { withStoreComponent } = withStore(
      <Places selectedCity={selectedCity} offers={[]} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should change sorting order', () => {
    const { withStoreComponent } = withStore(
      <Places selectedCity={selectedCity} offers={mockOffers} />,
      { auth: { authStatus: AuthStatus.Auth } }
    );
    const preparedComponent = withHistory(withStoreComponent);
    const { getByTestId, rerender } = render(preparedComponent);

    let sortingButton = getByTestId('sorting-button');
    sortingButton.click();
    getByTestId(`sorting-option-${SortingOrder.HighToLow}`).click();
    rerender(preparedComponent);
    sortingButton = getByTestId('sorting-button');

    expect(sortingButton).toHaveTextContent(SortingOrder.HighToLow);
  });
});
