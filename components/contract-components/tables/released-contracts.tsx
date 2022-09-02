import { DeployableContractTable } from "../contract-table";
import { usePublishedContractsQuery } from "../hooks";
import { Box, Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useMemo } from "react";
import { Heading, LinkButton, Text } from "tw-components";

export const ReleasedContracts = () => {
  const trackEvent = useTrack();
  const walletAddress = useAddress();
  const releasedContractsQuery = usePublishedContractsQuery(walletAddress);

  const releasedContracts = useMemo(
    () =>
      (releasedContractsQuery.data || [])?.map((d) =>
        d.metadataUri.replace("ipfs://", ""),
      ),
    [releasedContractsQuery],
  );

  return (
    <>
      <Flex
        justify="space-between"
        align="top"
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        <Flex gap={2} direction="column">
          <Heading size="title.md">Released contracts</Heading>
          <Text fontStyle="italic" maxW="container.md">
            The list of contract instances that you have released with thirdweb
          </Text>
        </Flex>
        <LinkButton
          colorScheme="primary"
          href="https://portal.thirdweb.com/release"
          isExternal
          onClick={() => {
            trackEvent({
              category: "dashboard",
              action: "click",
              label: "learn-more-about-release",
            });
          }}
        >
          Learn more about Release
        </LinkButton>
      </Flex>
      {releasedContractsQuery.data &&
      releasedContractsQuery.data?.length > 0 ? (
        <DeployableContractTable
          isFetching={releasedContractsQuery.isFetching}
          contractIds={releasedContracts}
          context="view_release"
        />
      ) : (
        <Box>You haven&apos;t released any contracts yet.</Box>
      )}
    </>
  );
};
