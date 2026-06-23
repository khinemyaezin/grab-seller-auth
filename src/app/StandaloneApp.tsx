import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ThemeProvider, Toaster } from "@khinemyaezin/seller-ui";
import AuthRoutes from "./AuthRoutes";

export default function StandaloneApp() {
  const [client] = useState(() => new QueryClient());
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <main className="flex min-h-screen flex-col bg-background p-8">
            <Toaster />
            <AuthRoutes identityLink={{ href: import.meta.env.VITE_API_IDENTITY_URL, }} />
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
