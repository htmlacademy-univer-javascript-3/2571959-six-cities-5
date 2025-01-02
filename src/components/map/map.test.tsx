import { render, screen } from '@testing-library/react';
import { Map } from './map';
import { generateCity } from '../../mocks';

describe('Component: Map', () => {
  const mapContainerId = 'map';

  it('should render correctly with given city and points', () => {
    const mockCity = generateCity();
    const mockPoints = Array.from({ length: 3 }, generateCity);

    render(<Map city={mockCity} places={mockPoints} />);

    const mapContainer = screen.getByTestId(mapContainerId);
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render correctly with selected location', () => {
    const mockCity = generateCity();
    const mockPoints = Array.from({ length: 3 }, generateCity);
    const mockSelected = generateCity();

    render(
      <Map city={mockCity} places={mockPoints} selectedCity={mockSelected} />
    );

    const mapContainer = screen.getByTestId(mapContainerId);
    expect(mapContainer).toBeInTheDocument();
  });
});
