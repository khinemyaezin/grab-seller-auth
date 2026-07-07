import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterPage from './register-page';
import { eventBus } from '@khinemyaezin/seller-api';
import { useIdentityGet } from '@/features/shared/hook/use-identity';
import { usePlatform } from '@khinemyaezin/seller-ui';

vi.mock('react-router', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

vi.mock('@/features/shared/hook/use-identity-root', () => ({
  default: vi.fn(),
}));

vi.mock('@/features/shared/hook/use-identity', () => ({
  useIdentityGet: vi.fn(),
}));

vi.mock('@khinemyaezin/seller-ui', () => ({
  usePlatform: vi.fn(),
}));

vi.mock('../components/register-form', () => ({
  RegisterForm: ({ onRegisterSuccess }: any) => (
    <button onClick={onRegisterSuccess} data-testid="mock-register-success">
      Trigger Register Success
    </button>
  ),
}));

describe('RegisterPage', () => {
  const mockPublish = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useIdentityGet as any).mockReturnValue({
      data: {
        register: { href: '/api/register', method: 'POST', rel: 'register' }
      }
    });

    (usePlatform as any).mockReturnValue({
      events: {
        publish: mockPublish
      }
    });

    vi.spyOn(eventBus, 'publish').mockImplementation(vi.fn());
  });

  it('publishes auth:registration-success:v1 event via platform.events when registration succeeds', () => {
    render(<RegisterPage />);

    fireEvent.click(screen.getByTestId('mock-register-success'));

    expect(mockPublish).toHaveBeenCalledWith('auth:registration-success:v1', {});
    expect(eventBus.publish).not.toHaveBeenCalled();
  });

  it('publishes auth:registration-success:v1 event via eventBus fallback when platform is not available', () => {
    (usePlatform as any).mockReturnValue(null);

    render(<RegisterPage />);

    // Simulate successful registration
    fireEvent.click(screen.getByTestId('mock-register-success'));

    expect(eventBus.publish).toHaveBeenCalledWith('auth:registration-success:v1', {});
  });
});
