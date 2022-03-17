import { extendTheme, Theme } from "@chakra-ui/react";
import { StepsStyleConfig } from "chakra-ui-steps";
import { colors } from "./colors";
import { Heading } from "./components/heading";
import { Text } from "./components/text";
import {
  chakraFontsizeConfig,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "./typography";

const Steps = {
  ...StepsStyleConfig,
  baseStyle: {
    ...StepsStyleConfig.baseStyle,
    steps: {
      maxWidth: "100%",
    },
    connector: {
      borderColor: "gray.200",
      transitionProperty: "border-color",
      transitionDuration: "normal",
      _highlighted: {
        borderColor: "gray.100",
      },
    },

    stepIconContainer: {
      bg: "transparent",
      borderColor: "gray.100",
      _activeStep: {
        bg: "gray.100",
      },
      _highlighted: {
        bg: "teal.700",
        borderColor: "teal.700",
      },
    },
  },
};

const chakraTheme: Theme = extendTheme(
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    } as Theme["config"],
    fonts: {
      heading: `"Inter", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
      body: `"Inter", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
      mono: `'IBM Plex Mono', monospace`,
    },
    styles: {
      global: {
        "html, body": {
          backgroundColor: "backgroundLight",
          padding: 0,
          margin: 0,
          fontFeatureSettings: `'zero' 1`,
        },
      },
    },
    components: {
      Steps,
      Heading,
      Text,
      Button: {
        baseStyle: {
          borderRadius: "full",
        },
      },
      Input: {
        sizes: {
          xl: {
            field: {
              fontSize: "lg",
              px: 4,
              h: 14,
              borderRadius: "md",
            },
            addon: {
              fontSize: "lg",
              px: 4,
              h: 14,
              borderRadius: "md",
            },
          },
        },
      },
    },
    colors,
    fontSizes: chakraFontsizeConfig,
    fontWeights,
    lineHeights,
    letterSpacings,
    sizes: {
      container: {
        page: "1170px",
      },
    },
  },
  // withDefaultColorScheme({ colorScheme: "primary" }),
) as Theme;

export default chakraTheme;
