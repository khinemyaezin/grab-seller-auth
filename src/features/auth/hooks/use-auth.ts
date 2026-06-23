import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { LoginRequest, RegisterUserRequest } from "../types/auth.request";
import { LoginResponse, RegisterUserReponse } from "../types/auth.response";

export const useLoginMutation = () => {
  return useMutation<LoginResponse,Error, {link: HateoasLink, request: LoginRequest}>({
    mutationFn: (vars: {link: HateoasLink, request: LoginRequest}) => authService.login(vars.link,vars.request),
  });
};

export const useRegisterMutation = () => {
  return useMutation<RegisterUserReponse, Error, { link: HateoasLink, request: RegisterUserRequest}>({
    mutationFn: ({link, request})=> authService.registerUser(link, request)
  });
}
