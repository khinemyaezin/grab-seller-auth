import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { RegisterForm } from './register-form';
import { useRegisterMutation } from '../hooks/use-auth';

vi.mock('../hooks/use-auth', () => ({
  useRegisterMutation: vi.fn(),
}));

describe('RegisterForm', () => {
  const mockMutate = vi.fn();
  const mockLink = { href: '/api/v1/auth/register', rel: 'register', method: 'POST' };
  const mockOnRegisterSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    (useRegisterMutation as Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('calls the register mutation with correct payload on valid submission', async () => {
    mockMutate.mockImplementation((payload, options) => {
      options.onSuccess();
    });

    render(<RegisterForm link={mockLink} onRegisterSuccess={mockOnRegisterSuccess} />);

    fireEvent.change(screen.getByLabelText(/^Email$/i), { 
      target: { value: 'seller@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { 
      target: { value: 'password123' } 
    });
    
    const form = screen.getByRole('button', { name: /^Register$/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { 
          link: mockLink, 
          request: { email: 'seller@example.com', password: 'password123', role: 'SELLER' } 
        },
        expect.any(Object)
      );
    });
    
    expect(mockOnRegisterSuccess).toHaveBeenCalled();
  });

  it('shows error if passwords do not match and does not submit', async () => {
    render(<RegisterForm link={mockLink} onRegisterSuccess={mockOnRegisterSuccess} />);

    fireEvent.change(screen.getByLabelText(/^Email$/i), { 
      target: { value: 'seller@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { 
      target: { value: 'different123' } 
    });
    
    const form = screen.getByRole('button', { name: /^Register$/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
