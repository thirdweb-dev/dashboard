import "@/styles/globals.css";
import { Inter as interFont } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { cn } from "@/lib/utils";
import { AppRouterProviders } from "./(dashboard)/providers";
import { Metadata } from "next";
import { PostHogProvider } from "./components/root-providers";
import dynamic from "next/dynamic";

const fontSans = interFont({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "hirdweb: The complete web3 development platform",
  description:
    "Build web3 apps easily with thirdweb's powerful SDKs, audited smart contracts, and developer tools—for Ethereum & 700+ EVM chains. Try now.",
  openGraph: {
    title: "thirdweb: The complete web3 development platform",
    description:
      "Build web3 apps easily with thirdweb's powerful SDKs, audited smart contracts, and developer tools—for Ethereum & 700+ EVM chains. Try now.",
    type: "website",
    locale: "en_US",
    url: "https://thirdweb.com",
    siteName: "thirdweb",
    images: [
      {
        url: "https://thirdweb.com/thirdweb.png",
        width: 1200,
        height: 630,
        alt: "thirdweb",
      },
    ],
  },
  twitter: {
    creator: "@thirdweb",
    site: "@thirdweb",
    card: "summary_large_image",
  },
};

const PostHogPageView = dynamic(() => import("./components/posthog-pageview"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain="thirdweb.com"
          customDomain="https://pl.thirdweb.com"
          selfHosted
        />
      </head>
      <PostHogProvider>
        <body
          className={cn(
            "h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <PostHogPageView />
          <AppRouterProviders>{children}</AppRouterProviders>
        </body>
      </PostHogProvider>
    </html>
  );
}
