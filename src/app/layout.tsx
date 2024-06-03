import "@/styles/globals.css";
import { Inter as interFont } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = interFont({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
        <ThemeProvider attribute="class">{children}</ThemeProvider>
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
