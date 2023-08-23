import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useAuthorizeWalletWithAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Flex, VStack } from "@chakra-ui/react";
import { useAddress, useAuth } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ReactNode, useState } from "react";
import { Button, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const LoginPage: ThirdwebNextPage = () => {
  const { payload } = useRouter().query;
  const { mutateAsync: authorizeWallet } = useAuthorizeWalletWithAccount();

  const address = useAddress();
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | ReactNode | undefined>(
    undefined,
  );
  const [success, setSuccess] = useState<boolean>(false);

  const generateToken = async () => {
    if (!payload) {
      console.error("**** Payload not detected from the url! ****");
      return null;
    }
    const decodedPayload = decodeURIComponent(payload as string);
    const parsedPayload = JSON.parse(decodedPayload);
    let token;
    try {
      token = await auth?.generate(parsedPayload);
    } catch (e) {
      console.error("Failed at generate", e);
    }
    if (!token) {
      return null;
    }
    try {
      await authorizeWallet(token);
      return token;
    } catch (e) {
      setLoading(false);
      console.error(e);
      return null;
    }
  };

  const createToken = async () => {
    const state = window.location.hash.replace("#", "");
    setLoading(true);

    try {
      const token = await generateToken();
      if (!token) {
        setErrorText(
          <Text color="red" fontSize="lg">
            Failed to authorize with CLI, please reach out to us on Discord:{" "}
            <Link color="blue.200" href="https://discord.gg/thirdweb">
              https://discord.gg/thirdweb
            </Link>
          </Text>,
        );
        setLoading(false);
        console.error(
          `Failed to authorize with CLI, please reach out to us on Discord: discord.gg/thirdweb.`,
        );
        return null;
      }
      const response = await fetch(
        `http://localhost:8976/auth/callback?token=${token}&state=${state}`,
        {
          method: "POST",
        },
      );
      if (response.ok) {
        setSuccess(true);
        setErrorText(undefined);
        setLoading(false);
      } else {
        // This should never happen, but just in case
        setErrorText(
          <Text color="red" fontSize="lg">
            Failed to authorize with CLI, please reach out to us on Discord:{" "}
            <Link color="blue.200" href="https://discord.gg/thirdweb">
              https://discord.gg/thirdweb
            </Link>
          </Text>,
        );
        setLoading(false);
        console.error(
          `Failed to authorize with CLI: ${response.statusText}, please reach out to us on Discord: discord.gg/thirdweb.`,
        );
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setErrorText(
        <Text color="red" fontSize="lg">
          Failed to authorize with CLI, please reach out to us on Discord:{" "}
          <Link color="blue.200" href="https://discord.gg/thirdweb">
            https://discord.gg/thirdweb
          </Link>
        </Text>,
      );
    }
  };

  if (success) {
    <Container maxW="container.lg" overflow="hidden" h="full">
      <Flex
        justify="center"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
        gap={8}
      >
        <VStack>
          <Heading>Your device is now linked to your account.</Heading>
          <Text>You may close this tab now.</Text>
        </VStack>
      </Flex>
    </Container>;
  }

  return (
    <Container maxW="container.lg" overflow="hidden" h="full">
      <Flex
        justify="center"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
        gap={8}
      >
        <VStack>
          <Heading>
            Select the account you want to authorize the CLI with
          </Heading>
          <small>
            Note: By doing this, you are authorizing the CLI to bill you for
            usage on the selected account.
          </small>
        </VStack>
        <ConnectWallet ecosystem="evm" />
        <Button
          isDisabled={!address}
          isLoading={loading}
          onClick={createToken}
          colorScheme="green"
        >
          Link CLI to Account
        </Button>
        {errorText}
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
