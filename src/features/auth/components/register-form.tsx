import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../hooks/use-auth";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const registerMutation = useRegisterMutation();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      role: "SELLER"
    }, {
      onSuccess: (res) => {
        console.log("Registration successful", res);
        // Handle success
      },
      onError: (err) => {
        console.error("Registration failed", err);
      }
    });
  };

  return (
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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword" 
          type="password" 
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === getValues("password") || "Passwords don't match",
          })}
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={registerMutation.isPending}
        className="submit-button"
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </button>
      
      {registerMutation.isError && (
        <div className="submit-error" role="alert">
          Failed to register. Please try again.
        </div>
      )}
    </form>
  );
}
