import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};
