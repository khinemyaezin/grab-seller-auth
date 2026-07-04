import { RegisterForm } from "../components/register-form";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { usePlatform } from "@/features/shared/context";
import { eventBus } from "@khinemyaezin/seller-api";
import { useState } from "react";
import AuthAlert from "@/features/shared/components/auth-alert";

export default function RegisterPage() {
  const { data } = useIdentityRoot();
  const platform = usePlatform();
  const [error, setError] = useState<{ title: string, description: string } | undefined>(undefined)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm grid gap-6">
        {error && <AuthAlert title={error.title} description={error.description} />}

        {data?.register && (
          <RegisterForm
            link={data.register}
            onRegisterSuccess={() => {
              (platform?.events ?? eventBus).publish("auth:registration-success:v1", {});
            }}
            onRegisterError={({ title, description }: { title: string; description: string; }) => {
              setError({ title, description })
            }} />
        )}
      </div>
    </div>
  );
}
