import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { LoginForm } from './login-form';
import { useLoginMutation } from '../hooks/use-auth';
import { eventBus } from '@khinemyaezin/seller-api';

vi.mock('../hooks/use-auth', () => ({
  useLoginMutation: vi.fn(),
}));

vi.mock('@khinemyaezin/seller-api', () => ({
  eventBus: {
    publish: vi.fn(),
  },
}));

describe('LoginForm', () => {
  const mockMutate = vi.fn();
  const mockLink = { href: '/api/v1/auth/login', rel: 'login', method: 'POST' };

  beforeEach(() => {
    vi.clearAllMocks();
    
    (useLoginMutation as Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('calls the login mutation with correct payload and publishes success event', async () => {
    mockMutate.mockImplementation((payload, options) => {
      options.onSuccess({ userId: 'user-123' });
    });

    render(<LoginForm link={mockLink} onLoginSuccess={()=>{}} />);

    fireEvent.change(screen.getByLabelText(/username or email address/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { 
          link: mockLink, 
          request: { email: 'test@example.com', password: 'password123' } 
        },
        expect.any(Object)
      );
    });

  });
});
