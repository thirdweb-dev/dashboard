import {
  Button,
  Center,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { ChainId, DAppProvider, isTestChain, useEthers } from "@usedapp/core";
import { AppShell } from "components/layout/app-shell";
import { Logo } from "components/layout/app-shell/Sidebar/Logo";
import { Card } from "components/layout/Card";
import Head from "components/shared/Head";
import { NetworkStatus } from "components/web3/NetworkStatus";
import { RequireValidWalletConnection } from "components/web3/RequireValidWalletConnection";
import { ALLOW_LIST_MAINNET } from "constants/allowlist";
import { ChainIdExt } from "constants/networks";
import { NFTLabsContext } from "context/nftlabs-context";
import type { AppProps } from "next/app";
import React from "react";
import { SiDiscord, SiTwitter } from "react-icons/si";
import chakraTheme from "theme";

import posthog from "posthog-js";

function ConsoleApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <ChakraProvider theme={chakraTheme}>
        <DAppProvider
          config={{
            supportedChains: [
              ChainId.Mainnet,
              ChainId.Polygon,
              ChainIdExt.Avalanche,
              ChainIdExt.Fantom,
              ChainId.Mumbai,
              ChainId.Rinkeby,
              ChainId.Localhost,
            ],
            multicallAddresses: {
              [ChainIdExt.Fantom]: AddressZero,
              [ChainIdExt.Avalanche]: AddressZero,
              [ChainId.Localhost]: AddressZero,
            },
          }}
        >
          <RequireValidWalletConnection>
            <RequireAllowList>
              <NFTLabsContext>
                <AppShell>
                  <Component {...pageProps} />
                </AppShell>
              </NFTLabsContext>
            </RequireAllowList>
          </RequireValidWalletConnection>
        </DAppProvider>
      </ChakraProvider>
    </>
  );
}
export default ConsoleApp;
const RequireAllowList: React.FC = ({ children }) => {
  const { account, chainId } = useEthers();

  posthog.init("phc_hKK4bo8cHZrKuAVXfXGpfNSLSJuucUnguAgt2j6dgSV", {
    api_host: "https://console-a.nftlabs.co",
  });

  if (account && posthog.get_distinct_id() !== account) {
    posthog.identify(account, {
      chainId,
      name: account,
    });
  }

  if (
    !account ||
    (!ALLOW_LIST_MAINNET.includes(account.toLowerCase()) &&
      !isTestChain(chainId || 1))
  ) {
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
              <Stack spacing={4}>
                <Heading>Ready for Mainnet?🚀</Heading>
                <Text>
                  Your wallet is only authorized to access Console on testnets.
                </Text>
                <Text>
                  Reach out to our team in our Discord. We&apos;ll make sure all
                  the integrations and parameters are properly configured before
                  the mainnet launch!
                </Text>
                <Flex alignItems="center">
                  <Text marginRight={2}>Switch to any supported testnet:</Text>
                  <NetworkStatus />
                </Flex>
                <Stack direction={["column", "column", "row"]}>
                  <Button
                    as={Link}
                    textDecor="none!important"
                    leftIcon={<Icon as={SiDiscord} />}
                    colorScheme="discord"
                    href="https://discord.gg/HNVGKq32GX"
                    isExternal
                  >
                    Join our Discord
                  </Button>
                  <Button
                    as={Link}
                    textDecor="none!important"
                    leftIcon={<Icon as={SiTwitter} />}
                    colorScheme="twitter"
                    href="https://twitter.com/nftlabshq"
                    isExternal
                  >
                    Follow us on Twitter
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Center>
    );
  }

  return <>{children}</>;
};
