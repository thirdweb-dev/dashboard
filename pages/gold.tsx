import {
  alchemyUrlMap,
  useBundleDropClaimMutation,
  useBundleDropModule,
} from "@3rdweb-sdk/react";
import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import { ConnectWallet } from "@3rdweb/react";
import { BundleDropModule, ThirdwebSDK } from "@3rdweb/sdk";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Input,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EarlyAccessCard } from "components/early-access/EarlyAccessCard";
import { useEarlyAccessMetadata } from "components/early-access/hook";
import { Resources } from "components/ftux/Resources";
import { AnimatedGradient } from "components/homepage/AnimatedGradient";
import { Logo } from "components/logo";
import { LinkButton } from "components/shared/LinkButton";
import { EARLY_ACCESS_DROP } from "constants/early-access";
import { Signer } from "ethers";
import { NextSeo } from "next-seo";
import React, { useEffect, useMemo, useState } from "react";
import { IoDiamondOutline, IoSwapHorizontal } from "react-icons/io5";
import { sendEmailToConvertkit } from "utils/convertkit";
import { parseErrorToMessage } from "utils/errorParser";
import { isBrowser } from "utils/isBrowser";
import { SupportedChainId } from "utils/network";
import { ConsolePage } from "./_app";

const EarlyAccessPage: ConsolePage = () => {
  const { address, chainId, provider, error } = useWeb3();
  const { switchNetwork, canAttemptSwitch, switchError } = useSwitchNetwork();
  const [canClaim, setCanClaim] = useState(false);

  const actuallyCanAttemptSwitch =
    provider?.connection?.url === "metamask" && canAttemptSwitch;

  const sdk = useMemo(() => {
    if (!isBrowser()) {
      return undefined;
    }
    return new ThirdwebSDK(alchemyUrlMap[SupportedChainId.Polygon], {
      ipfsGatewayUrl: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
      readOnlyRpcUrl: alchemyUrlMap[SupportedChainId.Polygon],
      transactionRelayerUrl: process.env.NEXT_PUBLIC_RELAYER_URL,
    });
  }, []);

  const signer: Signer | undefined = useMemo(() => {
    if (!provider) {
      return undefined;
    }
    const s = provider.getSigner();
    return Signer.isSigner(s) ? s : undefined;
  }, [provider]);

  useEffect(() => {
    if (!sdk || !Signer.isSigner(signer)) {
      return;
    }
    sdk.setProviderOrSigner(signer);
  }, [sdk, signer]);

  const module = useBundleDropModule(EARLY_ACCESS_DROP, sdk);
  const earlyAccessQuery = useEarlyAccessMetadata();

  useEffect(() => {
    const getCanClaim = async () => {
      if (module && address) {
        const claimable = await module?.canClaim("3", 1, address);
        setCanClaim(claimable);
      }
    };

    getCanClaim();
  }, [module, address]);

  const hasEarlyAccess = useMemo(() => {
    return (
      Array.isArray(earlyAccessQuery.data) &&
      earlyAccessQuery.data.some(({ metadata: { id } }) => id === "3")
    );
  }, [earlyAccessQuery]);

  const showNetworkSwitch = useMemo(() => {
    return (
      !earlyAccessQuery.isLoading &&
      ((!hasEarlyAccess && error && error.name === "UnsupportedChainIdError") ||
        (!hasEarlyAccess && chainId && chainId !== SupportedChainId.Polygon))
    );
  }, [chainId, earlyAccessQuery.isLoading, error, hasEarlyAccess]);

  if (showNetworkSwitch) {
    return (
      <Center w="100vw" h="100vh">
        <Container maxW="lg">
          <Stack spacing={12} align="center">
            <Logo />
            <Stack align="center">
              <Heading size="title.md">Network switch required</Heading>
              <Text textAlign="center">
                Your wallet needs to be connected to the Polygon network to be
                able to claim the Supporters Club NFT.
              </Text>
            </Stack>
            <Stack align="center">
              {actuallyCanAttemptSwitch ? (
                <>
                  <Button
                    onClick={() => switchNetwork(SupportedChainId.Polygon)}
                    colorScheme="blue"
                    leftIcon={<IoSwapHorizontal />}
                  >
                    Switch To Polygon
                  </Button>
                  {switchError ? (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      {parseErrorToMessage(switchError)}
                    </Alert>
                  ) : null}
                </>
              ) : (
                <Alert status="warning" borderRadius="md">
                  <AlertIcon />
                  <Stack spacing={1}>
                    <Heading size="label.lg">
                      Automatic network switching not possible
                    </Heading>
                    <Text size="body.sm">
                      Please manually switch networks to the{" "}
                      <strong>Polygon</strong> network in your connected wallet.
                    </Text>
                    <Divider borderColor="orange.700" />
                    <Text size="body.sm">
                      If your wallet does not have the polygon network
                      configured, please follow one of the guides below:
                    </Text>
                    <Text size="label.sm">
                      <Link
                        color="blue.500"
                        href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
                        isExternal
                      >
                        How to configure Polygon on Metamask
                      </Link>
                    </Text>
                    <Text size="label.sm">
                      <Link
                        color="blue.500"
                        isExternal
                        href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-wallet-link"
                      >
                        How to configure Polygon on Wallet Link
                      </Link>
                    </Text>
                  </Stack>
                </Alert>
              )}
            </Stack>
          </Stack>
        </Container>
      </Center>
    );
  }

  if (earlyAccessQuery.isLoading) {
    return (
      <Center w="100vw" h="100vh">
        <Stack spacing={12} align="center">
          <Logo />
          <Stack direction="row" align="center" spacing={4}>
            <Spinner />
            <Heading size="label.md">Checking eligibility...</Heading>
          </Stack>
        </Stack>
      </Center>
    );
  }

  return (
    <Container maxW="container.page" py={{ base: 8, md: 0 }}>
      <NextSeo
        title="Claim your free Supporters Club NFT"
        openGraph={{
          title: "Claim your free Supporters Club NFT | thirdweb",
          description: "Get your free Supporters Club NFT.",
          url: `https://thirdweb.com/gold`,
          images: [
            {
              url: "https://thirdweb.com/early-access-gold.png",
              width: 1200,
              height: 630,
              alt: "Claim your free Supporters Club NFT | thirdweb",
            },
          ],
        }}
      />
      <Center minH="100vh">
        {!hasEarlyAccess ? (
          <ClaimPage address={address} module={module} canClaim={canClaim} />
        ) : (
          <EarlyAccessInternal />
        )}
      </Center>
    </Container>
  );
};

export default EarlyAccessPage;

const EarlyAccessInternal: React.FC = () => {
  return (
    <Box position="relative">
      <Stack zIndex={2} position="relative" align="center" spacing={16}>
        <Logo />
        <Stack spacing={10}>
          <Heading textAlign="center" size="title.lg" fontSize="title.xl">
            It&apos;s official!
            <br />
            Welcome to the thirdweb supporters club.
          </Heading>
          <LinkButton size="lg" colorScheme="blue" href="/start">
            Get started now
          </LinkButton>
          <EarlyAccessCard tokenId="3" />
        </Stack>
        <Resources />
      </Stack>
      <AnimatedGradient hero w="100%" position="absolute" top={0} left={0} />
    </Box>
  );
};

interface ClaimPageProps {
  module?: BundleDropModule;
  address?: string;
  canClaim?: boolean;
}

const ClaimPage: React.FC<ClaimPageProps> = ({ module, address, canClaim }) => {
  const claimMutation = useBundleDropClaimMutation(module, "3");

  const _email = useMemo(() => {
    if (isBrowser()) {
      const urlParams = new URL(window.location.toString()).searchParams;
      return urlParams.get("email") || "";
    }
    return "";
  }, []);

  const [email, setEmail] = useState(() => _email);
  const [error, setError] = useState<Error>();

  const onClaim = async () => {
    if (!canClaim) {
      return;
    }

    setError(undefined);

    if (email) {
      try {
        await sendEmailToConvertkit(email);
      } catch (err) {
        console.error("failed to send email to convertkit", err);
      }
    }
    if (!address) {
      setError(new Error("No wallet connected"));
      return;
    }
    const currentBalance = await module?.balanceOf(address, "3");
    if (currentBalance === undefined) {
      setError(
        new Error("Unable to check early-access status, please try again."),
      );
      return;
    }
    if (currentBalance.eq(0)) {
      claimMutation.mutate();
    } else {
      setError(new Error("You already have the Supporters Club NFT!"));
    }
  };

  return (
    <SimpleGrid
      gap={{ base: "2.3125rem", md: "4.625rem" }}
      columns={{ base: 1, md: 2 }}
    >
      <Stack spacing={8}>
        <Logo />
        <Heading size="title.lg" fontSize="title.xl">
          Claim your exclusive Supporters Club NFT
        </Heading>
        <Stack spacing={5}>
          <Text fontSize="body.lg" fontWeight={500}>
            If you were one of our first supporters, we cannot express our
            appreciation enough. Please accept this Early Supporter NFT as a
            token (lmao) of our thanks!
          </Text>
          <List spacing={5}>
            <ListItem>
              <Stack
                fontWeight={500}
                fontSize="body.xl"
                as={Text}
                direction="row"
                spacing={3}
              >
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  📦
                </Text>
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  Receive exclusive airdrops and perks
                </Text>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack
                fontWeight={500}
                fontSize="body.xl"
                as={Text}
                direction="row"
                spacing={3}
              >
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  ⚡
                </Text>
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  Gain immediate access to our platform
                </Text>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack
                fontWeight={500}
                fontSize="body.xl"
                as={Text}
                direction="row"
                spacing={3}
              >
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  🔓
                </Text>
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  A skeleton key to an exclusive discord channel
                </Text>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack
                fontWeight={500}
                fontSize="body.xl"
                as={Text}
                direction="row"
                spacing={3}
              >
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  🔮
                </Text>
                <Text fontWeight="inherit" fontSize="inherit" as="span">
                  Become an honorary member of our team
                </Text>
              </Stack>
            </ListItem>
          </List>
        </Stack>
        {address ? (
          <Stack spacing={3}>
            <Input
              id="email"
              fontSize="md"
              bg="white"
              boxShadow="md"
              _placeholder={{ color: "#8282A6" }}
              placeholder="Email address (optional)"
              _focus={{
                boxShadow: "0px 4px 4px var(--chakra-colors-primary-100)",
              }}
              type="email"
              borderRadius="full"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Text size="body.sm" w="100%" textAlign="center" color="gray.600">
              We&apos;ll never share your data, you can expect weekly product
              updates
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              isDisabled={!canClaim}
              isLoading={claimMutation.isLoading}
              onClick={onClaim}
              leftIcon={<IoDiamondOutline />}
            >
              {!canClaim
                ? "Ineligible to claim"
                : "Mint Supporters Club NFT (Free)"}
            </Button>
            {!canClaim && (
              <Heading textAlign="center" fontSize="label.md" color="gray.700">
                You are ineligible to claim this NFT.
              </Heading>
            )}
            <Text fontSize="body.md" color="gray.600">
              Please note that the thirdweb Supporters Club NFTs are{" "}
              <em>non-transferrable</em> and <em>non-sellable</em>. You may see
              them listed for sale on OpenSea but any attempt to buy them{" "}
              <em>will fail.</em>{" "}
              <b>Please do not waste your money on gas fees.</b>
            </Text>
            {error ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error.message}
              </Alert>
            ) : claimMutation.error ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {parseErrorToMessage(claimMutation.error)}
              </Alert>
            ) : null}
          </Stack>
        ) : (
          <ConnectWallet size="lg" colorScheme="blue" borderRadius="full" />
        )}
      </Stack>

      <Box position="relative">
        <Box
          position="relative"
          zIndex={2}
          borderRadius="40px"
          maxW="100%"
          as="video"
          bg="black"
          src="/assets/videos/early-access-gold.mp4"
          autoPlay
          muted
          playsInline
          loop
        />
        <AnimatedGradient hero w="100%" position="absolute" top={0} left={0} />
      </Box>
    </SimpleGrid>
  );
};
