import "@/styles/globals.css";
import { Inter as interFont } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@/lib/utils";
import { AppRouterProviders } from "./(dashboard)/providers";
import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AppRouterProviders>{children}</AppRouterProviders>
        <NextTopLoader
          color="hsl(var(--primary))"
          height={2}
          shadow={false}
          showSpinner={false}
        />
      </body>
    </html>
  );
}
