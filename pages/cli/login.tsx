import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys, useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const LoginPage: ThirdwebNextPage = () => {
  const { from } = useRouter().query;
  const [loading, setLoading] = useState<boolean>(true);
  const [statusText, setStatusText] = useState<string>("Generating API key...");
  const address = useAddress();
  const keysQuery = useApiKeys();
  const createKeyMutation = useCreateApiKey();
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "API key created",
    "Failed to create API key",
  );
  const hasCreatedKey = useRef<boolean>(false);
  const allKeys = useMemo(() => {
    if (!keysQuery?.data) {
      return [];
    }
    return keysQuery.data;
  }, [keysQuery?.data]);

  useEffect(() => {
    if (
      !window ||
      !allKeys ||
      keysQuery.isFetching ||
      keysQuery.isLoading ||
      hasCreatedKey.current
    ) {
      // setLoading(false);
      // setStatusText("You can close this window now.");
      return;
    }
    const cliKeyAlreadyExists =
      allKeys.filter((k) => k.name === "CLI Auth Key").length > 0;

    if (address && from === "cli" && !cliKeyAlreadyExists) {
      hasCreatedKey.current = true;
      const formattedValues = {
        name: "CLI Auth Key",
        domains: ["*"],
        // FIXME: Enable when wallets restrictions is in use
        // walletAddresses: toArrFromList(values.walletAddresses),
        services: [
          {
            name: "storage",
            targetAddresses: ["*"],
            enabled: true,
            actions: ["read", "write"],
          },
        ],
      };
      createKeyMutation.mutate(formattedValues, {
        onSuccess: async (data) => {
          onSuccess();
          trackEvent({
            category: "api-keys",
            action: "create",
            label: "success",
            fromCli: true,
          });
          try {
            await fetch(
              `http://localhost:8976/secretKey/callback?id=${data.secret}`,
              {
                method: "POST",
              },
            );
            setTimeout(() => {
              setStatusText(
                "API key generated successfully, you can close this window now.",
              );
              setLoading(false);
            }, 2000);
          } catch (err) {
            console.log("error", err);
            setTimeout(() => {
              setStatusText("Failed to log in, please try again later.");
              setLoading(false);
            }, 2000);
          }
        },
        onError: (err) => {
          onError(err);
          trackEvent({
            category: "api-keys",
            action: "create",
            label: "error",
            error: err,
            fromCli: true,
          });
          setTimeout(() => {
            setStatusText(
              "Failed to generate API key, please try again later.",
            );
            setLoading(false);
          }, 2000);
        },
      });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [
    address,
    allKeys,
    createKeyMutation,
    keysQuery.isFetching,
    keysQuery.isLoading,
    from,
    onError,
    onSuccess,
    trackEvent,
  ]);

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
    <Flex
      justify="center"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      h="full"
    >
      {loading && <Spinner />}
      <Heading size="display.sm">
        {loading ? "Logging in..." : "Login successful!"}
      </Heading>
      <Heading textAlign="center" size="label.2xl">
        {statusText}
      </Heading>
    </Flex>
  );
};

LoginPage.getLayout = (page, props) => (
  <AppLayout layout="custom-contract" {...props}>
    {page}
  </AppLayout>
);
LoginPage.pageId = PageId.CliLoginPage;

export default LoginPage;
