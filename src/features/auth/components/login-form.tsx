import { FormProvider, useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/use-auth";
import { LoginFormValues } from "../types/auth.form";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import { LoginRequest } from "../types/auth.request";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { FieldGroup, Field, FieldLabel, FieldError } from "@khinemyaezin/seller-ui/components/field";
import { Input } from "@khinemyaezin/seller-ui/components/input";

export type LoginFormProps = {
  link: HateoasLink
}

export function LoginForm({ link }: LoginFormProps) {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>();
  const { handleSubmit, register, formState:{ errors } } = form;

  const onSubmit = (data: LoginFormValues) => {
    const payload: LoginRequest = {
      email: data.email,
      password: data.password
    }
    loginMutation.mutate({ link: link, request: payload }, {
      onSuccess: (res) => {
        console.log("Login successful", res);
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
                <FieldLabel htmlFor="email">Username or email address</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
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
                />
                <FieldError errors={[errors.password]} />
            </Field>
        </FieldGroup>


        <Button
          type="submit"
          variant="default"
          size="default"
          className="w-full mt-6"
          disabled={loginMutation.isPending}
        >
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
