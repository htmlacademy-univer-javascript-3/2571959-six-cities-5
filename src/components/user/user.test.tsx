import { render } from '@testing-library/react';
import { UserAvatar, OfferUserAvatar, ReviewUserAvatar } from './user';
import { generateUser } from '../../mocks';

const mockUser = generateUser();

describe('UserAvatar', () => {
  it('renders user avatar with correct props', () => {
    const { getByAltText, getByText } = render(
      <UserAvatar
        user={mockUser}
        type="offer"
        alt="User Avatar"
        size={74}
        wrapperClassName="wrapper-class"
        imageClassName="image-class"
        userNameClassName="name-class"
        statusClassName="status-class"
      />
    );

    expect(getByAltText('User Avatar')).toHaveAttribute('src', mockUser.avatarUrl);
    expect(getByText(mockUser.name)).toBeInTheDocument();
    expect(getByText('Pro')).toBeInTheDocument();
  });

  it('does not render Pro status if user is not a pro', () => {
    const nonProUser = { ...mockUser, isPro: false };
    const { queryByText } = render(
      <UserAvatar
        user={nonProUser}
        type="offer"
        alt="User Avatar"
        size={74}
        wrapperClassName="wrapper-class"
        imageClassName="image-class"
        userNameClassName="name-class"
        statusClassName="status-class"
      />
    );

    expect(queryByText('Pro')).not.toBeInTheDocument();
  });
});

describe('OfferUserAvatar', () => {
  it('renders OfferUserAvatar with correct props', () => {
    const { getByAltText, getByText } = render(
      <OfferUserAvatar user={mockUser} alt="Offer User Avatar" />
    );

    expect(getByAltText('Offer User Avatar')).toHaveAttribute('src', mockUser.avatarUrl);
    expect(getByText(mockUser.name)).toBeInTheDocument();
    expect(getByText('Pro')).toBeInTheDocument();
  });
});

describe('ReviewUserAvatar', () => {
  it('renders ReviewUserAvatar with correct props', () => {
    const { getByAltText, getByText } = render(
      <ReviewUserAvatar user={mockUser} alt="Review User Avatar" />
    );

    expect(getByAltText('Review User Avatar')).toHaveAttribute('src', mockUser.avatarUrl);
    expect(getByText(mockUser.name)).toBeInTheDocument();
  });

  it('does not render Pro status for ReviewUserAvatar even if user is a pro', () => {
    const { queryByText } = render(
      <ReviewUserAvatar user={mockUser} alt="Review User Avatar" />
    );

    expect(queryByText('Pro')).not.toBeInTheDocument();
  });
});
