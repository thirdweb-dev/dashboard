import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Card } from "components/layout/Card";
import { AccountConnector } from "components/web3/AccountConnector";
import * as React from "react";

export const ConnectWalletButton: React.FC = () => {
  return (
    <Center w="100%">
      <Container as={Card}>
        <Stack py={7} align="center" spacing={7} w="100%">
          <ChakraNextImage
            src={require("public/assets/illustrations/no-apps-cube.png")}
            alt="no apps"
            boxSize={20}
            maxW="200px"
            mb={3}
          />
          <Heading size="title.lg" textAlign="center">
            Connect your wallet
          </Heading>
          <Text size="subtitle.lg">
            You need to connect your wallet to continue
          </Text>
          <AccountConnector />
        </Stack>
      </Container>
    </Center>
  );
};
