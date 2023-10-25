import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_PAYMENTS_API,
  // this is annoying, would be better if all of our code was in src/
  documents: [
    "components/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "contract-ui/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "@3rdweb-sdk/**/*.{ts,tsx}",
  ],
  generates: {
    "./lib/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
