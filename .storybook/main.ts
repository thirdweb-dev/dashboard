import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../shared/ui/stories/**/*.stories.@(mdx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-styling",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-styling",
      options: {
        postcss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  // FIXME: When extracted to own package: Remove
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
};
export default config;
