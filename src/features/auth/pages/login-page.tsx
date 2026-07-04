import { Link } from "react-router";
import { LoginForm } from "../components/login-form";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { routes } from "@khinemyaezin/seller-contracts";
import { usePlatform } from "@/features/shared/context";
import { eventBus } from "@khinemyaezin/seller-api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@khinemyaezin/seller-ui/components/card";
import { Separator } from "@khinemyaezin/seller-ui/components/index";

export default function LoginPage() {
  const { data } = useIdentityRoot();
  const platform = usePlatform();

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
                <CardTitle>Log in</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.login && (
                <LoginForm
                  link={data.login}
                  onLoginSuccess={() => {
                    (platform?.events ?? eventBus).publish("auth:login-success:v1", {});
                  }} />
              )}
            </CardContent>
            <Separator />
            {data?.register && (
              <CardFooter className="flex justify-center gap-3">
                <span>New to Seller Center?</span>
                <Link to={`/${routes.register}`} className="text-primary hover:underline">
                  Create an account
                </Link>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
