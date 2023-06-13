module.exports = {
  preset: "jest-playwright-preset",
  testPathIgnorePatterns: ["/node_modules/", "/tests/playwright/"],
  testEnvironmentOptions: {
    "jest-playwright": {
      // Specify options, for example:
      // browsers: ['chromium', 'firefox'],
      // launchOptions: {
      //   headless: false,
      // },
    },
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
