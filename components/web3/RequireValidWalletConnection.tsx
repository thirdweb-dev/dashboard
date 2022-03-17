import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChainId, useEthers } from "@usedapp/core";
import { Logo } from "components/layout/app-shell/Sidebar/Logo";
import { Card } from "components/layout/Card";
import { useErrorMessage } from "hooks/web3/useErrorMessage";
import { useNetworkSwitch } from "hooks/web3/useNetworkSwitch";
import React from "react";
import { isBrowser } from "utils/isBrowser";
import { AccountConnector } from "./AccountConnector";
import { NetworkStatus } from "./NetworkStatus";

export const RequireValidWalletConnection: React.FC = ({ children }) => {
  const { account, error } = useEthers();
  const networkSwitch = useNetworkSwitch();
  const parsedError = useErrorMessage(error);

  if (!isBrowser()) {
    return <></>;
  }

  if (parsedError) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        height="100vh"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <Stack spacing={0.5} my={3}>
          <AlertTitle size="md" as={Heading} mt={2} mb={1}>
            {parsedError.title}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {parsedError.message}
          </AlertDescription>
        </Stack>

        <Text>Please switch your wallet to supported network:</Text>
        {networkSwitch.canSwitch ? <NetworkStatus /> : null}
      </Alert>
    );
  }

  if (!account) {
    return (
      <Center
        w="100vw"
        h="100vh"
        bgColor="#171923"
        backgroundPosition="0 0, 10px 10px"
        backgroundSize="20px 20px"
        backgroundImage="radial-gradient(rgba(255,255,255,.3) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,.3) 0.5px, #171923 0.5px)"
        color="white"
      >
        <Container>
          <Stack spacing={6}>
            <Logo noPadding />
            <Card color="#000">
              <Stack>
                <Heading>No wallet connected</Heading>
                <Text>Please connect your wallet to get started.</Text>
                <AccountConnector />
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Center>
    );
  }

  return <>{children}</>;
};
