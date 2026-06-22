import type { LoginRequest, RegisterUserRequest, EntityModelAuthResponse } from "../types/auth";

export const authService = {
  login: async (request: LoginRequest): Promise<EntityModelAuthResponse> => {
    const response = await fetch("/api/v1/identity/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    
    return response.json();
  },

  register: async (request: RegisterUserRequest): Promise<EntityModelAuthResponse> => {
    const response = await fetch("/api/v1/identity/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error("Failed to register");
    }
    
    return response.json();
  }
};
