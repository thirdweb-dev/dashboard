import { Stack, useColorMode } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Heading } from "tw-components";

export const EngineOverviewDescription = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack spacing={2} maxW={600} p={4}>
      <Heading size="title.xs" p={1} opacity={0.4}>
        Treasury
      </Heading>
      <ChakraNextImage
        src={
          colorMode === "dark"
            ? require("public/assets/engine/hero-backendwallets-dark.webp")
            : require("public/assets/engine/hero-backendwallets-light.webp")
        }
        alt="Transactions"
      />
      <Heading size="title.xs" p={1} opacity={0.4}>
        Team Members
      </Heading>
      <ChakraNextImage
        src={
          colorMode === "dark"
            ? require("public/assets/engine/hero-backendwallets-dark.webp")
            : require("public/assets/engine/hero-backendwallets-light.webp")
        }
        alt="Backend wallets"
      />
    </Stack>
  );
};
