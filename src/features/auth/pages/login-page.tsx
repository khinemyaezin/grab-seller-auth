import { Link } from "react-router";
import { LoginForm } from "../components/login-form";
import { getIdentityRoot } from "../hooks/use-identity-root";

export default function LoginPage() {
  const { data } = getIdentityRoot();
  
  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden">
      <div className="w-full sm:w-[340px]">
        {data?.login && <LoginForm link={data.login} />}

        {data?.register && (
          <div className="text-center text-sm mt-4">
            New to Seller Center?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
          )}
      </div>
    </div>
  );
}
