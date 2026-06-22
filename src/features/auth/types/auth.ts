export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  role: "SELLER";
}

export interface EntityModelAuthResponse {
  accessToken?: string;
  refreshToken?: string;
  expiresInMs?: number;
  userId?: string;
  email?: string;
  roles?: string[];
  status?: string;
  _links?: Record<string, { href: string }>;
}
