import { RegisterForm } from "../components/register-form";
import { Link } from "react-router";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@khinemyaezin/seller-ui/components/card";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { routes } from "@khinemyaezin/seller-contracts";

export default function RegisterPage() {
  const { data } = useIdentityRoot();

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle> Register as a Seller</CardTitle>
            <CardAction>
              <Button variant="link">
                <Link to={routes.login}>
                  Sign in
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {data?.register && <RegisterForm link={data.register} />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
