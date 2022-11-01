import { Inter } from "@next/font/google";

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // eslint-disable-next-line react/forbid-dom-props
    <html className={inter.className}>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
