import { LoginForm } from "../components/login-form";
import { Link } from "react-router";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@grab/seller-ui/components/card";


export default function LoginPage() {
  return (
    <main className="container mx-auto max-w-xl">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            Sign in to Seller Center
          </CardTitle>
          <CardAction className="auth-switch">
            Or{" "}
            <Link to="/register">
              create a new account
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
