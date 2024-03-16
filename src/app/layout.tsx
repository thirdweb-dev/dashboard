import { Providers } from "./providers";
import { ibmPlexMono, inter } from "./fonts";
import { ColorModeScript } from "@chakra-ui/react";
import chakraTheme from "../../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      // eslint-disable-next-line react/forbid-dom-props
      className={`${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://a.thirdweb.com" />
        <link rel="dns-prefetch" href="https://a.thirdweb.com" />
        <link rel="preconnect" href="https://pg.paper.xyz" />
        <link rel="dns-prefetch" href="https://pg.paper.xyz" />
        <link rel="preconnect" href="https://pl.thirdweb.com" />
        <link rel="dns-prefetch" href="https://pl.thirdweb.com" />
      </head>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
      </body>
    </html>
  );
}
