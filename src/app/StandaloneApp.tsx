import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ThemeProvider, Toaster } from "@grab/seller-ui";
import AuthRoutes from "./AuthRoutes";

export default function StandaloneApp() {
  const [client] = useState(() => new QueryClient());
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <main className="min-h-screen bg-background p-8">
            <Toaster />
            <AuthRoutes />
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
