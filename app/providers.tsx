"use-client";

import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { CacheProvider } from '@chakra-ui/next-js';
import { IBM_Plex_Mono, Inter } from "next/font/google";
import chakraTheme from "theme";
import { generateBreakpointTypographyCssVars } from "tw-components/utils/typography";
import { ComponentWithChildren } from "types/component-with-children";

// eslint-disable-next-line new-cap
const inter = Inter({
  subsets: ["latin"],
});

// eslint-disable-next-line new-cap
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const chakraThemeWithFonts = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
    mono: ibmPlexMono.style.fontFamily,
  },
};

const fontSizeCssVars = generateBreakpointTypographyCssVars();

export const Providers: ComponentWithChildren = ({ children }) => {
  return (
    <>
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
              margin: 0 .05em 0 .1em;
              vertical-align: -0.1em;
              display: inline;
          }
            
            #nprogress {
              pointer-events: none;
            }
            
            #nprogress .bar {
              background: ${chakraTheme.colors.purple[500]};
            
              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;
            
              width: 100%;
              height: 2px;
            }
            
            /* Fancy blur effect */
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px ${chakraTheme.colors.purple[500]}, 0 0 5px ${chakraTheme.colors.purple[500]};
              opacity: 1.0;
            
              -webkit-transform: rotate(3deg) translate(0px, -4px);
                  -ms-transform: rotate(3deg) translate(0px, -4px);
                      transform: rotate(3deg) translate(0px, -4px);
          `}
      />
      <CacheProvider>
        <ChakraProvider theme={chakraThemeWithFonts}>{children}</ChakraProvider>
      </CacheProvider>
    </>
  );
};