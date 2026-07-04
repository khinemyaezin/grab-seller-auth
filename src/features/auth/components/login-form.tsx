import { FormProvider, useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/use-auth";
import { LoginFormValues } from "../types/auth.form";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import { LoginRequest } from "../types/auth.request";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { FieldGroup, Field, FieldLabel, FieldError } from "@khinemyaezin/seller-ui/components/field";
import { Input } from "@khinemyaezin/seller-ui/components/input";
import { ButtonStatus } from "@khinemyaezin/seller-ui/components/index";

export type LoginFormProps = {
  link: HateoasLink;
  onLoginSuccess: () => void;
}

export function LoginForm({ link, onLoginSuccess }: LoginFormProps) {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>();
  const { handleSubmit, register, formState: { errors } } = form;

  const onSubmit = (data: LoginFormValues) => {
    const payload: LoginRequest = {
      email: data.email,
      password: data.password,
    };
    loginMutation.mutate({ link: link, request: payload }, {
      onSuccess: () => {
        window.setTimeout(onLoginSuccess, 700);
      },
      onError: (err) => {
        console.error("Login failed", err);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
               placeholder="m@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              required
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              aria-invalid={Boolean(errors.password)}
              required
            />
            <FieldError errors={[errors.password]} />
          </Field>
        </FieldGroup>

        <Field>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full mt-6"
            disabled={loginMutation.isPending || loginMutation.isSuccess}
          >
            <ButtonStatus
              status={
                loginMutation.isPending
                  ? "pending"
                  : loginMutation.isSuccess
                    ? "success"
                    : "idle"
              }
              pendingLabel="Signing in..."
              successLabel="Success"
            >
              Sign in
            </ButtonStatus>
          </Button>
        </Field>

      </form>
    </FormProvider>
  );
}
