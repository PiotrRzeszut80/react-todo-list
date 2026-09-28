import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows an empty state initially', () => {
    render(<App />);

    expect(screen.getByText('No todos yet.')).toBeInTheDocument();
  });

  it('adds a todo from the form and clears the input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText(/new item/i);
    await user.type(input, '  Learn React  ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByLabelText(/new item/i)).toHaveValue('');
  });

  it('toggles and deletes a todo item', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText(/new item/i);
    await user.type(input, 'Write tests');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
  });
});
