import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ChainId, KNOWN_CONTRACTS_MAP } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { Badge } from "components/badges/badge";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { usePublishedContractsQuery } from "components/contract-components/hooks";
import { Card } from "components/layout/Card";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { ConsolePage } from "pages/_app";

const ContractsHomepageWrapped: React.VFC = () => {
  const { Track } = useTrack({
    page: "contracts",
  });

  const publishedContracts = usePublishedContractsQuery();

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">Built-in contracts</Heading>
          <Text>
            Contracts created by the thirdweb team that you can deploy
          </Text>
        </Flex>
        <Card overflowX="auto">
          <DeployableContractTable
            contractIds={Object.keys(KNOWN_CONTRACTS_MAP)}
          />
        </Card>
        <Box />
        <Flex gap={2} direction="column">
          <Heading size="title.md">
            Custom contracts{" "}
            <Badge py={0.5} variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Heading>
          <Text>Contracts that you have published via the thirdweb cli</Text>
        </Flex>
        <Card overflowX="auto">
          <DeployableContractTable
            contractIds={(publishedContracts.data || [])?.map((d) =>
              d.metadataUri.replace("ipfs://", ""),
            )}
          />
        </Card>
      </Flex>
    </Track>
  );
};

const ContractsHomepage: ConsolePage = () => {
  return (
    <CustomSDKContext desiredChainId={ChainId.Mumbai}>
      <ContractsHomepageWrapped />
    </CustomSDKContext>
  );
};

ContractsHomepage.Layout = AppLayout;

export default ContractsHomepage;
