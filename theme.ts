import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Source Code Pro', monospace;`,
    body: `'Lato', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.100",
        padding: 0,
        margin: 0,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        lineHeight: 1,
      },
    },
  },
  colors: {
    discord: {
      50: "#e8eeff",
      100: "#c0ccf3",
      200: "#99aae5",
      300: "#7289da",
      400: "#4a67ce",
      500: "#314db5",
      600: "#253c8d",
      700: "#1a2b66",
      800: "#0d1a40",
      900: "#01091b",
    },
  },
});

export default chakraTheme;
