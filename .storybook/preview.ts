import "../shared/ui/globals.css";
import { withThemeByDataAttribute } from "@storybook/addon-styling";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";

//import { themes } from "@storybook/theming";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // Set the docs panel as default
  viewMode: "docs",
  previewTabs: {
    "storybook/docs/panel": { index: -1 },
  },
  // FIXME: SB dak mode
  // darkMode: {
  //   // Override the default dark theme
  //   dark: { ...themes.dark, appBg: "black" },
  //   // Override the default light theme
  //   light: { ...themes.normal, appBg: "red" },
  // },
  // docs: {
  //   theme: themes.dark,
  // },
  backgrounds: {
    default: "grey",
    values: [
      {
        name: "grey",
        value: "#EFF1F3",
      },
      {
        name: "dark",
        value: "#0D0F11",
      },
    ],
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Intro", "Base", "Components", ["Typography"]],
    },
  },
};

const preview: Preview = {
  parameters,
  decorators: [
    // @ts-ignore
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
