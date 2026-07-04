import { Route, Routes, Navigate } from "react-router";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { routes, type SellerPlatform } from "@khinemyaezin/seller-contracts";
import { EntryLinkProvider, PlatformProvider } from "@/features/shared/context";
import "../styles.css";

export default function AuthRoutes({ link, platform }: {
  link: HateoasLink;
  platform?: SellerPlatform;
}) {
  return (
    <PlatformProvider platform={platform}>
      <EntryLinkProvider link={link}>
        <Routes>
          <Route path="" element={<Navigate to={routes.login} replace />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />
        </Routes>
      </EntryLinkProvider>
    </PlatformProvider>
  );
}
