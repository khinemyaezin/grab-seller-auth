import { Link } from "react-router";
import { LoginForm } from "../components/login-form";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { routes } from "@khinemyaezin/seller-contracts";

export default function LoginPage() {
  const { data } = useIdentityRoot();

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-sm">
          {data?.login && <LoginForm link={data.login} />}

          {data?.register && (
            <div className="text-center text-sm mt-4">
              New to Seller Center?{" "}
              <Link to={routes.register} className="text-primary hover:underline">
                Create an account
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
