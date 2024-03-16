"use client";
import { ChakraProvider } from "@chakra-ui/react";

import { Global, css } from "@emotion/react";
import chakraTheme from "../../theme";
import { generateBreakpointTypographyCssVars } from "../../tw-components/utils/typography";
import PlausibleProvider from "next-plausible";

const chakraThemeWithFonts = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
    mono: "--font-ibm-plex-mono",
  },
};

const fontSizeCssVars = generateBreakpointTypographyCssVars();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      domain="thirdweb.com"
      customDomain="https://pl.thirdweb.com"
      selfHosted
    >
      <Global
        styles={css`
          #walletconnect-wrapper {
            color: #000;
          }
          .walletconnect-search__input::placeholder {
            color: inherit;
            opacity: 0.7;
          }
          ${fontSizeCssVars}

          .emoji {
            height: 1em;
            width: 1em;
            margin: 0 0.05em 0 0.1em;
            vertical-align: -0.1em;
            display: inline;
          }
          body {
            font-variant-ligatures: none !important;
          }
          .chakra-checkbox__control > div > svg {
            font-size: 10px !important;
          }
        `}
      />
      <ChakraProvider theme={chakraThemeWithFonts}>{children}</ChakraProvider>
    </PlausibleProvider>
  );
}
