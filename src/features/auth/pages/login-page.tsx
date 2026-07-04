import { LoginForm } from "../components/login-form";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { usePlatform } from "@/features/shared/context";
import { eventBus } from "@khinemyaezin/seller-api";
import AuthAlert from "@/features/shared/components/auth-alert";
import { useState } from "react";

export default function LoginPage() {
  const { data } = useIdentityRoot();
  const platform = usePlatform();
  const [error, setError] = useState<{ title: string, description: string } | undefined>(undefined)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm grid gap-6">
        {error && <AuthAlert title={error.title} description={error.description} />}

        {data?.login && (
          <LoginForm
            link={data.login}
            onLoginSuccess={() => {
              (platform?.events ?? eventBus).publish("auth:login-success:v1", {});
            }}
            onLoginError={({ title, description }) => {
              setError({title, description })
            }}
          />
        )}
      </div>
    </div>
  );
}
