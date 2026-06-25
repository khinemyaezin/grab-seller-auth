import { createContext, ReactNode, useContext } from "react";
import { HateoasLink } from "@khinemyaezin/seller-api";

const EntryLinkContext = createContext<HateoasLink | null>(null);

function EntryLinkProvider({ link, children }: { link: HateoasLink, children: ReactNode }) {
  return (
    <EntryLinkContext.Provider value={link}>
      {children}
    </EntryLinkContext.Provider>
  );
}

function useEntryLink() {
  const context = useContext(EntryLinkContext);
  if (!context) {
    throw new Error("useIdentityLink must be used within an IdentityLinkProvider");
  }
  return context;
}
export { EntryLinkProvider, useEntryLink };
