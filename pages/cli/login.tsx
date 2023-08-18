import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useAuthorizeWalletWithAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useAddress, useAuth } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { useTrack } from "hooks/analytics/useTrack";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const LoginPage: ThirdwebNextPage = () => {
  // Get state and payload from URL.
  const { payload } = useRouter().query;
  const { mutateAsync: authorizeWallet } = useAuthorizeWalletWithAccount();

  const address = useAddress();
  const trackEvent = useTrack();
  const auth = useAuth();

  const hasCreatedToken = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusTitle, setStatusTitle] = useState<string>("Logging in...");
  const [statusText, setStatusText] = useState<string | ReactNode>(
    "Authorizing your account...",
  );

  useEffect(() => {
    if (!window || !payload) {
      return;
    }

    const state = window.location.hash.replace("#", "");
    const decodedPayload = decodeURIComponent(payload as string);
    const parsedPayload = JSON.parse(decodedPayload);

    console.log("state", state);
    console.log("payload", parsedPayload);

    const generateToken = async () => {
      const token = await auth?.generate(parsedPayload);
      if (!token) {
        return undefined;
      }
      hasCreatedToken.current = true;
      try {
        await authorizeWallet(token);
      } catch (e) {
        console.error(e);
        setStatusTitle("Login failed!");
        return undefined;
      }
      return token;
    };

    const main = async () => {
      if (hasCreatedToken.current) {
        return;
      }

      if (address) {
        try {
          const token = await generateToken();
          if (!token) {
            setStatusTitle("Login failed!");
            setStatusText(
              <>
                Failed to authorize with CLI, please reach out to us on Discord:{" "}
                <Link color="blue.200" href="https://discord.gg/thirdweb">
                  https://discord.gg/thirdweb
                </Link>
              </>,
            );
            setLoading(false);
            console.error(
              `Failed to authorize with CLI, please reach out to us on Discord: discord.gg/thirdweb.`,
            );
            return undefined;
          }
          try {
            const response = await fetch(
              `http://localhost:8976/auth/callback?token=${token}&state=${state}`,
              {
                method: "POST",
              },
            );
            if (response.ok) {
              setStatusTitle("Login successful!");
              setStatusText("You can close this window now.");
              setLoading(false);
            } else {
              // This should never happen, but just in case
              setStatusTitle("Login failed!");
              setStatusText(
                <>
                  Failed to authorize with CLI, please reach out to us on
                  Discord:{" "}
                  <Link color="blue.200" href="https://discord.gg/thirdweb">
                    https://discord.gg/thirdweb
                  </Link>
                </>,
              );
              setLoading(false);
              console.error(
                `Failed to authorize with CLI: ${response.statusText}, please reach out to us on Discord: discord.gg/thirdweb.`,
              );
            }
          } catch (e) {
            console.error(e);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    main();
  }, [address, trackEvent, auth, payload, authorizeWallet]);

  if (!address) {
    return (
      <Container maxW="lg">
        <Card p={6} as={Flex} flexDir="column" gap={2}>
          <Heading as="h2" size="title.sm">
            Connect your wallet to get started
          </Heading>
          <Text>
            In order to create and manage your developer API keys, you need to
            sign-in with a wallet.
          </Text>
          <Divider my={4} />
          <ConnectWallet ecosystem="evm" />
        </Card>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" overflow="hidden" h="full">
      <Flex
        justify="center"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
        gap={4}
      >
        <Heading size="display.sm">{statusTitle}</Heading>
        <Heading textAlign="center" size="label.2xl">
          {statusText}
        </Heading>
        {loading && <Spinner />}
      </Flex>
    </Container>
  );
};

LoginPage.getLayout = (page, props) => (
  <AppLayout layout="custom-contract" {...props}>
    {page}
  </AppLayout>
);
LoginPage.pageId = PageId.CliLoginPage;

export default LoginPage;
