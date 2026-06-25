import { api, HateoasLink } from "@khinemyaezin/seller-api";
import { LoginRequest, RegisterUserRequest } from "../types/auth.request";
import { LoginResponse, RegisterUserReponse } from "../types/auth.response";

export const authService = {
  login: (link: HateoasLink, request: LoginRequest, headers?: Record<string, string>): Promise<LoginResponse> => 
    api.followLink<LoginResponse>(link, "POST", request, undefined, headers, { retryOnUnauthorized: false }),

  registerUser: (link: HateoasLink, request: RegisterUserRequest, headers?: Record<string, string>): Promise<RegisterUserReponse> => 
    api.followLink<RegisterUserReponse>(link, "POST", request, undefined, headers, { retryOnUnauthorized: false })
};
