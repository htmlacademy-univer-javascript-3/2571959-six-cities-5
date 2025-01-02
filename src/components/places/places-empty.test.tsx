import { render } from '@testing-library/react';
import { PlacesEmpty } from './places-empty';

describe('PlacesEmpty component', () => {
  it('should render correctly with the given city', () => {
    const { getByText } = render(<PlacesEmpty selectedCity="Paris" />);
    expect(getByText('No places to stay available')).toBeInTheDocument();
    expect(getByText('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});