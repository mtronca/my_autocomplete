import { render, fireEvent, waitFor } from '@testing-library/react';
import Autocomplete from './Autocomplete';

const mockFetchData = jest.fn();

describe('Autocomplete', () => {
 beforeEach(() => {
    jest.clearAllMocks();
 });

 it('renders without crashing', () => {
    render(<Autocomplete fetchData={mockFetchData} />);
 });

 it('calls fetchData on input change', async () => {
    const { getByPlaceholderText } = render(<Autocomplete fetchData={mockFetchData} />);
    const input = getByPlaceholderText('Type something...');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(mockFetchData).toHaveBeenCalledWith('test'));
 });

 it('displays options when fetchData returns data', async () => {
    mockFetchData.mockResolvedValue([{ id: 1, value: 'Option 1' }, { id: 2, value: 'Option 2' }]);

    const { getByText, getByPlaceholderText } = render(<Autocomplete fetchData={mockFetchData} />);
    const input = getByPlaceholderText('Type something...');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(getByText('Option 1')).toBeInTheDocument();
      expect(getByText('Option 2')).toBeInTheDocument();
    });
 });

 it('handles option click', async () => {
    mockFetchData.mockResolvedValue([{ id: 1, value: 'Option 1' }]);

    const { getByText, getByPlaceholderText } = render(<Autocomplete fetchData={mockFetchData} />);
    const input = getByPlaceholderText('Type something...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      const option = getByText('Option 1');
      fireEvent.click(option);
      expect(input.value).toBe('Option 1');
    });
 });

 it('clears input and options on clear icon click', async () => {
    mockFetchData.mockResolvedValue([{ id: 1, value: 'Option 1' }]);

    const { getByPlaceholderText, queryByText, getByTestId } = render(<Autocomplete fetchData={mockFetchData} />);
    const input = getByPlaceholderText('Type something...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      const clearIcon = getByTestId('clear');
      fireEvent.click(clearIcon);
      expect(input.value).toBe('');
      expect(queryByText('Option 1')).not.toBeInTheDocument();
    });
 });
});