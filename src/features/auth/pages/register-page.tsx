import { RegisterForm } from "../components/register-form";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div>
          <h1>
            Register as a Seller
          </h1>
          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
