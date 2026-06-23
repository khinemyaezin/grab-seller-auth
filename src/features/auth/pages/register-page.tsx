import { RegisterForm } from "../components/register-form";
import { Link } from "react-router";
import { getIdentityRoot } from "../hooks/use-identity-root";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@khinemyaezin/seller-ui/components/card";
import { Button } from "@khinemyaezin/seller-ui/components/button";

export default function RegisterPage() {
  const { data } = getIdentityRoot();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle> Register as a Seller</CardTitle>
          <CardAction>
            <Button variant="link">
              <Link to="/login">
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
  );
}
