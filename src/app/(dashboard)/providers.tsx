"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { DashboardThirdwebProviderSetup } from "../../components/app-layouts/provider-setup";
import { AllChainsProvider } from "../../contexts/all-chains";
import { ChainsProvider } from "../../contexts/configured-chains";

const queryClient = new QueryClient();

export function AppRouterProviders(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AllChainsProvider>
        <ChainsProvider>
          <DashboardThirdwebProviderSetup>
            <ThemeProvider attribute="class" enableSystem>
              {props.children}
            </ThemeProvider>
          </DashboardThirdwebProviderSetup>
        </ChainsProvider>
      </AllChainsProvider>
    </QueryClientProvider>
  );
}
