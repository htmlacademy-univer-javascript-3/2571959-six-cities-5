import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { SortingOrderSelect } from './sorting-order';
import { SortingOrder } from '../../utils/constants';

describe('SortingOrderSelect', () => {
  const mockOnChangeOrder = vi.fn();

  it('should render correctly', () => {
    const { getByText, getAllByText } = render(
      <SortingOrderSelect
        order={SortingOrder.TopRatedFirst}
        onChangeOrder={mockOnChangeOrder}
      />
    );
    expect(getByText('Sort by')).toBeInTheDocument();
    getAllByText(SortingOrder.TopRatedFirst).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should open and close options list when clicked', () => {
    render(
      <SortingOrderSelect
        order={SortingOrder.TopRatedFirst}
        onChangeOrder={mockOnChangeOrder}
      />
    );
    const sortingButton = screen.getByTestId('sorting-button');
    fireEvent.click(sortingButton);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
    fireEvent.click(sortingButton);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should call onChangeOrder with correct order when an option is clicked', () => {
    render(
      <SortingOrderSelect
        order={SortingOrder.TopRatedFirst}
        onChangeOrder={mockOnChangeOrder}
      />
    );
    const sortingButton = screen.getByTestId('sorting-button');
    fireEvent.click(sortingButton);
    const option = screen.getByTestId(
      `sorting-option-${SortingOrder.LowToHigh}`
    );
    fireEvent.click(option);
    expect(mockOnChangeOrder).toHaveBeenCalledWith(SortingOrder.LowToHigh);
  });

  it('should close options list when an option is clicked', () => {
    render(
      <SortingOrderSelect
        order={SortingOrder.TopRatedFirst}
        onChangeOrder={mockOnChangeOrder}
      />
    );
    const sortingButton = screen.getByTestId('sorting-button');
    fireEvent.click(sortingButton);
    const option = screen.getByTestId(
      `sorting-option-${SortingOrder.LowToHigh}`
    );
    fireEvent.click(option);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should highlight the active sorting option', () => {
    render(
      <SortingOrderSelect
        order={SortingOrder.TopRatedFirst}
        onChangeOrder={mockOnChangeOrder}
      />
    );
    const sortingButton = screen.getByTestId('sorting-button');
    fireEvent.click(sortingButton);
    const activeOption = screen.getByTestId(
      `sorting-option-${SortingOrder.TopRatedFirst}`
    );
    expect(activeOption).toHaveClass('places__option--active');
  });
});
