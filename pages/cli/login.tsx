import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys, useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Divider, Flex, Spinner } from "@chakra-ui/react";
import { LoginPayload } from "@thirdweb-dev/auth";
import { useAddress, useAuth, useWallet } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const LoginPage: ThirdwebNextPage = () => {
  const { from } = useRouter().query;
  const [loading, setLoading] = useState<boolean>(true);
  const [statusText, setStatusText] = useState<string | ReactNode>(
    "Checking for existing API key...",
  );
  const [loginStatus, setLoginStatus] = useState<string>("Logging in...");
  const address = useAddress();
  const keysQuery = useApiKeys();
  const createKeyMutation = useCreateApiKey();
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "API key created",
    "Failed to create API key",
  );
  const hasCreatedKey = useRef<boolean>(false);
  const hasFailedRequest = useRef<boolean>(false);
  const wallet = useWallet();
  const auth = useAuth();
  const allKeys = useMemo(() => {
    if (!keysQuery?.data) {
      return [];
    }
    return keysQuery.data;
  }, [keysQuery?.data]);

  useEffect(() => {
    const wallet1Payload = window.location.hash.replace("#", "");
    const decoded = decodeURIComponent(wallet1Payload);
    const parsed = JSON.parse(decoded);

    const generateToken = async () => {
      console.log("RUNNING GENERATE TOKEN");
      const token = await auth?.generate(parsed);
      hasCreatedKey.current = true;
      console.log("token", token);
      return token;
    };

    const main = async () => {
      if (hasCreatedKey.current) {
        return;
      }

      if (address && from === "cli") {
        // const formattedValues = {
        //   name: "CLI Auth Key",
        //   domains: ["*"],
        //   services: [
        //     {
        //       name: "storage",
        //       targetAddresses: ["*"],
        //       enabled: true,
        //       actions: ["read", "write"],
        //     },
        //   ],
        // };
        // createKeyMutation.mutate(formattedValues, {
        //   onSuccess: async (data) => {
        //     onSuccess();
        //     trackEvent({
        //       category: "api-keys",
        //       action: "create",
        //       label: "success",
        //       fromCli: true,
        //     });
        //     try {
        //       const response = await fetch(
        //         `http://localhost:8976/auth/callback?id=${data.secret}&state=${state}`,
        //         {
        //           method: "POST",
        //         },
        //       );
        //       if (response.ok) {
        //         setLoginStatus("Login successful!");
        //         setStatusText("You can close this window now.");
        //         setLoading(false);
        //       } else {
        //         // This should never happen, but just in case
        //         setLoginStatus("Login failed!");
        //         setStatusText(
        //           <>
        //             Failed to authorize with CLI, please reach out to us on
        //             Discord:{" "}
        //             <Link color="blue.200" href="https://discord.gg/thirdweb">
        //               https://discord.gg/thirdweb
        //             </Link>
        //           </>,
        //         );
        //         setLoading(false);
        //         console.error(
        //           `Failed to authorize with CLI: ${response.statusText}, please reach out to us on Discord: discord.gg/thirdweb.`,
        //         );
        //       }
        //     } catch (e) {
        //       console.log(e);
        //     }
        //   },
        //   onError: async (err) => {
        //     onError(err);
        //     trackEvent({
        //       category: "api-keys",
        //       action: "create",
        //       label: "error",
        //       error: err,
        //       fromCli: true,
        //     });
        //     setStatusText(
        //       <>
        //         Failed to generate your API key, please reach out to us on
        //         Discord:{" "}
        //         <Link color="blue.200" href="https://discord.gg/thirdweb">
        //           https://discord.gg/thirdweb
        //         </Link>
        //       </>,
        //     );
        //     setLoading(false);
        //     console.error(err);
        //   },
        // });
        try {
          const token = await generateToken();
          const state = encodeURIComponent(JSON.stringify(parsed));
          console.log("token", token);
          console.log("state", state);
          try {
            const response = await fetch(
              `http://localhost:8976/auth/callback?token=${token}&state=${state}`,
              {
                method: "POST",
              },
            );
            if (response.ok) {
              setLoginStatus("Login successful!");
              setStatusText("You can close this window now.");
              setLoading(false);
            } else {
              // This should never happen, but just in case
              setLoginStatus("Login failed!");
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
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }

      const failRequest = async () => {
        if (hasFailedRequest.current) {
          // If the function has already been called, don't call it again.
          return;
        }

        hasFailedRequest.current = true;

        setLoginStatus("Login failed!");
        setStatusText(
          <>
            CLI Auth Key already exists, you must delete it and try again if you
            want to sign in to a new device:{" "}
            <Link color="blue.200" href="/dashboard/settings/api-keys">
              Delete your key here.
            </Link>
          </>,
        );
        try {
          await fetch(`http://localhost:8976/auth/callback`, {
            method: "POST",
          });
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
      };
    };
    main();
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
    auth,
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
    <Container maxW="container.lg" overflow="hidden" h="full">
      <Flex
        justify="center"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
        gap={4}
      >
        <Heading size="display.sm">{loginStatus}</Heading>
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
