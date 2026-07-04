import { RegisterForm } from "../components/register-form";
import { Link } from "react-router";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@khinemyaezin/seller-ui/components/card";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { routes } from "@khinemyaezin/seller-contracts";
import { usePlatform } from "@/features/shared/context";
import { eventBus } from "@khinemyaezin/seller-api";
import { Separator } from "@khinemyaezin/seller-ui/components/index";

export default function RegisterPage() {
  const { data } = useIdentityRoot();
  const platform = usePlatform();

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex items-center">
            <CardTitle className="grow">Start your journey with Grab</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.register && (
              <RegisterForm
                link={data.register}
                onRegisterSuccess={() => {
                  (platform?.events ?? eventBus).publish("auth:registration-success:v1", {});
                }}
              />
            )}
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-center gap-3">
            <span>Already have an account?</span>
            <Link to={`/${routes.login}`} className="text-primary hover:underline">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
