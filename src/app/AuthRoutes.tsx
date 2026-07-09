import { Route, Routes, Navigate } from "react-router";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { routes, type SellerPlatform } from "@khinemyaezin/seller-contracts";
import "../styles.css";
import { EntryLinkProvider, PlatformProvider } from "@khinemyaezin/seller-ui";
import AccessContextSelectionPage from "@/features/access/pages/access-context-selection-page";
import AccessContextMenu from "@/features/access/components/access-context-menu";

export default function AuthRoutes({ link, platform }: {
  link: HateoasLink;
  platform?: SellerPlatform;
}) {
  return (
    <div className="seller-auth-mfe">
      <PlatformProvider platform={platform}>
        <EntryLinkProvider link={link}>
          <Routes>
            <Route path="" element={<Navigate to={routes.login} replace />} />
            <Route path="menu" element={<AccessContextMenu />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
            <Route path={routes.contextSelection} element={<AccessContextSelectionPage />} />
          </Routes>
        </EntryLinkProvider>
      </PlatformProvider>
    </div>
  );
}
