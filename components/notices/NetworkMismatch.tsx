import { useActiveChainId } from "@3rdweb-sdk/react";
import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import { DarkMode } from "@chakra-ui/color-mode";
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { useNetworkMismatch } from "hooks/useNetworkMismatch";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import {
  getNetworkFromChainId,
  SupportedChainId,
  SupportedChainIdToNetworkMap,
} from "utils/network";

export const NetworkMismatchNotice: React.FC = () => {
  const { chainId, getNetworkMetadata, provider } = useWeb3();
  const activeChainId = useActiveChainId();
  const signerChainId = chainId as SupportedChainId | undefined;

  const networkSwitch = useSwitchNetwork();

  const actuallyCanAttemptSwitch =
    provider?.connection?.url === "metamask" && networkSwitch.canAttemptSwitch;

  const onSwitchWallet = useCallback(() => {
    if (actuallyCanAttemptSwitch && activeChainId) {
      networkSwitch.switchNetwork(activeChainId);
    }
  }, [activeChainId, actuallyCanAttemptSwitch, networkSwitch]);

  const [mismatchDelayExpired, setMismatchDelayExpired] = useState(false);

  const [dismissedForChain, setDismissedForChain] = useState(false);

  useEffect(() => {
    if (chainId) {
      setDismissedForChain(false);
    }
  }, [chainId]);

  const misMatchExists = useNetworkMismatch();

  useEffect(() => {
    if (!misMatchExists) {
      setMismatchDelayExpired(false);
      return;
    }
    const t = setTimeout(() => {
      if (misMatchExists) {
        setMismatchDelayExpired(true);
      }
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [misMatchExists]);

  if (!misMatchExists || !mismatchDelayExpired) {
    return null;
  }
  if (!signerChainId || !activeChainId) {
    return null;
  }
  if (dismissedForChain) {
    return null;
  }

  const signerNetworkIsSupported =
    signerChainId in SupportedChainIdToNetworkMap;

  const walletNetwork = (
    signerNetworkIsSupported
      ? getNetworkFromChainId(signerChainId)
      : getNetworkMetadata(signerChainId as unknown as number).chainName
  )
    .split("")
    .map((s, idx) => (idx === 0 ? s.toUpperCase() : s))
    .join("");

  const twNetwork = getNetworkFromChainId(activeChainId)
    .split("")
    .map((s, idx) => (idx === 0 ? s.toUpperCase() : s))
    .join("");

  return (
    <DarkMode>
      <Card pb={6} position="fixed" m={4} bottom={0} right={0} bg="gray.900">
        <Container as={Stack} spacing={4}>
          <Heading variant="light" size="label.2xl">
            <Stack direction="row" align="center">
              <Icon boxSize={6} as={AiOutlineWarning} />
              <span>Network Mismatch</span>
            </Stack>
          </Heading>

          <Text variant="light">
            You are connected to the <strong>{walletNetwork}</strong> network
            but you are exploring the dashboard on the{" "}
            <strong>{twNetwork}</strong> network. They need to match if you want
            to interact with the dashboard.
          </Text>
          <ButtonGroup size="sm">
            <Button
              onClick={onSwitchWallet}
              isLoading={networkSwitch.isSwitching}
              isDisabled={!actuallyCanAttemptSwitch}
              colorScheme="tworange"
            >
              Switch wallet to {twNetwork}
            </Button>
            {signerNetworkIsSupported && (
              <Button
                isLoading={networkSwitch.isSwitching}
                variant="outline"
                colorScheme="tworange"
                onClick={() => setDismissedForChain(true)}
              >
                Dismiss warning
              </Button>
            )}
          </ButtonGroup>
          {!actuallyCanAttemptSwitch && (
            <Text size="body.sm" variant="light" fontStyle="italic">
              Your connected wallet does not support programatic switching.
              <br />
              Please manually switch the network in your wallet.
            </Text>
          )}
        </Container>
      </Card>
    </DarkMode>
  );
};
