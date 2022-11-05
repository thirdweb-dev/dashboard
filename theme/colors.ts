import color from "color";

const config = {
  darkest: {
    lightness: 10,
    rotate: 0,
    saturate: 0,
  },
  lightest: {
    lightness: 95,
    rotate: 0,
    saturate: 0,
  },
};

function createShades(centerColor: string): Record<number, string> {
  const _color = centerColor;
  const darkSteps = 4;
  const lightSteps = 5;

  const lightnessStep = (config.lightest.lightness - 50) / lightSteps;
  const darknessStep = (50 - config.darkest.lightness) / darkSteps;

  const lightRotateStep = config.lightest.rotate / lightSteps;
  const darkRotateStep = config.darkest.rotate / darkSteps;

  const lightSaturateStep = config.lightest.saturate / lightSteps;
  const darkSaturateStep = config.darkest.saturate / darkSteps;

  return {
    50: color(_color)
      .lightness(50 + lightnessStep * 5)
      .rotate(lightRotateStep * 5)
      .saturate(lightSaturateStep * 5)
      .hex(),
    100: color(_color)
      .lightness(50 + lightnessStep * 4)
      .rotate(lightRotateStep * 4)
      .saturate(lightSaturateStep * 4)
      .hex(),
    200: color(_color)
      .lightness(50 + lightnessStep * 3)
      .rotate(lightRotateStep * 3)
      .saturate(lightSaturateStep * 3)
      .hex(),
    300: color(_color)
      .lightness(50 + lightnessStep * 2)
      .rotate(lightRotateStep * 2)
      .saturate(lightSaturateStep * 2)
      .hex(),
    400: color(_color)
      .lightness(50 + Number(lightnessStep))
      .rotate(Number(lightRotateStep))
      .saturate(Number(lightSaturateStep))
      .hex(),
    500: centerColor,
    600: color(_color)
      .lightness(50 - Number(darknessStep))
      .rotate(Number(darkRotateStep))
      .saturate(Number(darkSaturateStep))
      .hex(),
    700: color(_color)
      .lightness(50 - darknessStep * 2)
      .rotate(darkRotateStep * 2)
      .saturate(darkSaturateStep * 2)
      .hex(),
    800: color(_color)
      .lightness(50 - darknessStep * 3)
      .rotate(darkRotateStep * 3)
      .saturate(darkSaturateStep * 3)
      .hex(),
    900: color(_color)
      .lightness(50 - darknessStep * 4)
      .rotate(darkRotateStep * 4)
      .saturate(darkSaturateStep * 4)
      .hex(),
  };
}

const themeColors = {
  transparent: "transparent",
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  orange: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#F97316",
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
  },
  yellow: {
    50: "#FEFCE8",
    100: "#FEF9C3",
    200: "#FEF08A",
    300: "#FDE047",
    400: "#FACC15",
    500: "#EAB308",
    600: "#CA8A04",
    700: "#A16207",
    800: "#854D0E",
    900: "#713F12",
  },
  green: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },
  teal: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6",
    600: "#0D9488",
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
  },

  pink: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    200: "#FBCFE8",
    300: "#F9A8D4",
    400: "#F472B6",
    500: "#EC4899",
    600: "#DB2777",
    700: "#BE185D",
    800: "#9D174D",
    900: "#831843",
  },
  cyan: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    200: "#A5F3FC",
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#06B6D4",
    600: "#0891B2",
    700: "#0E7490",
    800: "#155E75",
    900: "#164E63",
  },
  blackAlpha: {
    50: "rgba(0,0,0,0.05)",
    100: "rgba(0,0,0,0.1)",
    200: "rgba(0,0,0,0.2)",
    300: "rgba(0,0,0,0.3)",
    400: "rgba(0,0,0,0.4)",
    500: "rgba(0,0,0,0.5)",
    600: "rgba(0,0,0,0.6)",
    700: "rgba(0,0,0,0.7)",
    800: "rgba(0,0,0,0.8)",
    900: "rgba(0,0,0,0.9)",
  },
  whiteAlpha: {
    50: "rgba(255,255,255,0.05)",
    100: "rgba(255,255,255,0.1)",
    200: "rgba(255,255,255,0.2)",
    300: "rgba(255,255,255,0.3)",
    400: "rgba(255,255,255,0.4)",
    500: "rgba(255,255,255,0.5)",
    600: "rgba(255,255,255,0.6)",
    700: "rgba(255,255,255,0.7)",
    800: "rgba(255,255,255,0.8)",
    900: "rgba(255,255,255,0.9)",
  },
  gray: {
    100: "#fafafa",
    200: "#eaeaea",
    300: "#999",
    400: "#888",
    500: "#666",
    600: "#444",
    700: "#333",
    800: "#111",
  },
  // primary
  primary: {
    100: "#e4e9ff",
    200: "#cbd4ff",
    300: "#94a3ff",
    400: "#647eff",
    500: "#475fff",
    600: "#334bff",
    700: "#253dca",
    800: "#1d31a8",
  },
};

export const colors = {
  // generated
  discord: createShades("#314db5"),
  opensea: createShades("#3191e8"),

  // theme colors
  ...themeColors,

  blue: themeColors.primary,
  purple: themeColors.primary,
};
