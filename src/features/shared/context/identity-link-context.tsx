import { createContext, ReactNode, useContext } from "react";
import { HateoasLink } from "@khinemyaezin/seller-api";

const IdentityLinkContext = createContext<HateoasLink | null>(null);

function IdentityLinkProvider({ link, children }: { link: HateoasLink, children: ReactNode }) {
  return (
    <IdentityLinkContext.Provider value={link}>
      {children}
    </IdentityLinkContext.Provider>
  );
}

function useIdentityLink() {
  const context = useContext(IdentityLinkContext);
  if (!context) {
    throw new Error("useIdentityLink must be used within an IdentityLinkProvider");
  }
  return context;
}

export { IdentityLinkProvider, useIdentityLink };