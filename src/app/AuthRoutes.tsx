import { Route, Routes, Navigate } from "react-router";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { IdentityLinkProvider } from "../features/auth/context";

export default function AuthRoutes({ identityLink }: { identityLink: HateoasLink }) {
  return (
    <IdentityLinkProvider link={identityLink}>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </IdentityLinkProvider>
  );
}