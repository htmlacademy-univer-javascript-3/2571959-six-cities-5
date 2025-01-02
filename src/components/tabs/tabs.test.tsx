import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './tabs';
import { locations } from '../../utils/constants';

const getTestId = (city: string) => `tab-${city}`;

describe('Tabs component', () => {
  const mockOnCityChange = vi.fn();

  it('should render all city tabs', () => {
    render(<Tabs selectedCity={locations[0]} onCityChange={mockOnCityChange} />);
    locations.forEach((city) => {
      expect(screen.getByTestId(getTestId(city))).toBeInTheDocument();
    });
  });

  it('should highlight the selected city tab', () => {
    render(<Tabs selectedCity={locations[1]} onCityChange={mockOnCityChange} />);
    const selectedTab = screen.getByTestId(getTestId(locations[1]));
    expect(selectedTab).toHaveClass('tabs__item--active');
  });

  it('should call onCityChange when a tab is clicked', () => {
    render(<Tabs selectedCity={locations[0]} onCityChange={mockOnCityChange} />);
    const tab = screen.getByTestId(getTestId(locations[1]));
    fireEvent.click(tab);
    expect(mockOnCityChange).toHaveBeenCalledWith(locations[1]);
  });

  it('should not highlight non-selected city tabs', () => {
    render(<Tabs selectedCity={locations[0]} onCityChange={mockOnCityChange} />);
    locations.slice(1).forEach((city) => {
      const tab = screen.getByTestId(getTestId(city));
      expect(tab).not.toHaveClass('tabs__item--active');
    });
  });
});
