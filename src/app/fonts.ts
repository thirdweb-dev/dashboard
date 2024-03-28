import {
  IBM_Plex_Mono as ibmPlexMonoConstructor,
  Inter as interConstructor,
} from "next/font/google";

export const inter = interConstructor({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-inter",
});

export const ibmPlexMono = ibmPlexMonoConstructor({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Consolas", "Courier New", "monospace"],
  variable: "--font-ibm-plex-mono",
});
