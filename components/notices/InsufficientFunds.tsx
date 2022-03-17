import { useWeb3 } from "@3rdweb/hooks";
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
import { LinkButton } from "components/shared/LinkButton";
import { useNetworkMismatch } from "hooks/useNetworkMismatch";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const FAUCETS: Record<number, string> = {
  4: "https://faucets.chain.link/rinkeby",
  80001: "https://faucet.polygon.technology/",
};

export const InsufficientFunds: React.FC = () => {
  const mismatchExists = useNetworkMismatch();
  const { address, balance, chainId, getNetworkMetadata } = useWeb3();
  const [dismissed, setDismissed] = useState(false);
  const [delayExpired, setDelayExpired] = useState(false);

  useEffect(() => {
    if (!chainId || !address) {
      setDelayExpired(false);
      return;
    }
    const t = setTimeout(() => {
      setDelayExpired(true);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [chainId, address]);

  useEffect(() => {
    if (address) {
      setDismissed(false);
    }
  }, [chainId, address]);

  if (mismatchExists) {
    return null;
  }

  if (!delayExpired) {
    return null;
  }

  if (balance?.value?.gt(0)) {
    return null;
  }

  if (dismissed) {
    return null;
  }

  const { symbol, isTestnet } = getNetworkMetadata(chainId || 0);

  return (
    <DarkMode>
      <Card pb={6} position="fixed" m={4} bottom={0} right={0} bg="gray.900">
        <Container as={Stack} spacing={4}>
          <Heading variant="light" size="label.2xl">
            <Stack direction="row" align="center">
              <Icon boxSize={6} as={AiOutlineWarning} />
              <span>Insufficient Funds</span>
            </Stack>
          </Heading>

          <Text variant="light">
            You don&apos;t have any funds on this network. You&apos;ll need some{" "}
            {symbol} to get started.
            {isTestnet && "You can get some from the faucet below."}
          </Text>

          <ButtonGroup size="sm">
            {isTestnet && (
              <LinkButton
                colorScheme="orange"
                href={FAUCETS[chainId as number]}
                isExternal
              >
                Get {symbol} from faucet
              </LinkButton>
            )}
            <Button
              variant="outline"
              colorScheme="orange"
              onClick={() => setDismissed(true)}
            >
              Dismiss warning
            </Button>
          </ButtonGroup>
        </Container>
      </Card>
    </DarkMode>
  );
};
