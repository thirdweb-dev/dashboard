import { useClaimBlankDrop } from "@3rdweb-sdk/react/hooks/useClaimBlankDrop";
import { Box, Flex } from "@chakra-ui/react";
import { getChainBySlug } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useNFTBalance,
  useUser,
  useWallet,
} from "@thirdweb-dev/react";
import {
  BlankDropAllowedNetworksSlugs,
  blankDropNetworkMapping,
} from "components/blank-drop/allowedNetworks";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { Button, Heading, LinkButton, Text } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useTrack } from "hooks/analytics/useTrack";
import React from "react";
import { BigNumber } from "ethers";

interface BlankDropNetworkLogicProps {
  slug: BlankDropAllowedNetworksSlugs;
}

export const BlankDropNetworkLogic: React.FC<BlankDropNetworkLogicProps> = ({
  slug,
}) => {
  const wallet = useWallet();
  const user = useUser();
  const trackEvent = useTrack();

  const claimDrop = useClaimBlankDrop();
  const network = getChainBySlug(slug as string);

  const { onSuccess, onError } = useTxNotifications(
    "Successfully claimed NFT",
    "Failed to claim NFT",
  );

  const networkData =
    blankDropNetworkMapping[slug as BlankDropAllowedNetworksSlugs];

  const { contract } = useContract(networkData?.contractAddress);
  const { data: balance } = useNFTBalance(contract, user?.user?.address || "");

  const hasMinted = BigNumber.from(balance || 0)?.toNumber() > 0;

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mx="auto"
      mt={-8}
      pb={8}
      overflowX="hidden"
    >
      <HomepageSection>
        <Flex mt={24} flexDir="column" mx="auto" gap={8}>
          <Heading size="display.sm" textAlign="center">
            {hasMinted ? "Mint Complete" : `Claim this NFT on ${network.name}`}
          </Heading>
          <Flex mx="auto">
            <MediaRenderer src={networkData.image} />
          </Flex>

          {wallet?.walletId !== "paper" || !user.isLoggedIn ? (
            <>
              <Text textAlign="center" size="body.lg">
                You need to connect and sign with your email to claim this NFT.
                If you&apos;re already connected with a different wallet, you
                can disconnect and connect with your email.
              </Text>
              <Box mx="auto">
                <ConnectWallet modalTitle="Connect with your email" />
              </Box>
            </>
          ) : !hasMinted ? (
            <Box mx="auto">
              <Button
                onClick={() => {
                  trackEvent({
                    category: "blank-drop",
                    action: "claim-nft",
                    label: "attempt",
                    network: slug,
                  });
                  claimDrop.mutate(
                    {
                      network: slug,
                      address: user.user?.address || "",
                    },
                    {
                      onSuccess: () => {
                        onSuccess();
                        trackEvent({
                          category: "blank-drop",
                          action: "claim-nft",
                          label: "success",
                          network: slug,
                        });
                      },
                      onError: (err) => {
                        onError(err);
                        trackEvent({
                          category: "blank-drop",
                          action: "claim-nft",
                          label: "error",
                          error: err,
                          network: slug,
                        });
                      },
                    },
                  );
                }}
              >
                Claim
              </Button>
            </Box>
          ) : (
            <Flex mx="auto" flexDir="column" gap={4}>
              <Text textAlign="center">
                The NFT has been minted to your email wallet:{" "}
                {user.user?.address}
              </Text>
              <Box mx="auto">
                <LinkButton href="/dashboard" colorScheme="primary">
                  Explore thirdweb dashboard
                </LinkButton>
              </Box>
            </Flex>
          )}
        </Flex>
      </HomepageSection>
    </Flex>
  );
};
