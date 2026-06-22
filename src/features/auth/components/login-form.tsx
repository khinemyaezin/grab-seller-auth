import { FormProvider, useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/use-auth";

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>();
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
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
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
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
            placeholder="seller@example.com"
          />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="submit-button"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <div className="submit-error" role="alert">
            Failed to login. Please check your credentials.
          </div>
        )}
      </form>
    </FormProvider>
  );
}
