import { Route, Routes, Navigate } from "react-router";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import UserAdminPage from "../features/user-admin/pages/user-admin-page";
import UserDetailPage from "../features/user-admin/pages/user-detail-page";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { routes } from "@khinemyaezin/seller-contracts";
import { IdentityLinkProvider } from "@/features/shared/context";
import "../styles.css";

export default function AuthRoutes({ identityLink }: { identityLink: HateoasLink }) {
  return (
    <IdentityLinkProvider link={identityLink}>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.admin.users} element={<UserAdminPage />} />
        <Route path={routes.admin.editUser(":userId")} element={<UserDetailPage />} />
      </Routes>
    </IdentityLinkProvider>
  );
}