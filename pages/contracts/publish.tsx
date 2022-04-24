import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { Badge } from "components/badges/badge";
import { TransactionButton } from "components/buttons/TransactionButton";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { usePublishMutation } from "components/contract-components/contract-table/hooks";
import { ContractId } from "components/contract-components/contract-table/types";
import { Card } from "components/layout/Card";
import { NetworkMismatchNotice } from "components/notices/NetworkMismatch";
import { UrlMap } from "constants/mappings";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import { useMemo, useState } from "react";

const ContractsPublishPageWrapped: React.VFC = () => {
  const { Track, trackEvent } = useTrack({
    page: "publish",
  });

  const router = useRouter();

  const ipfsHashes = useMemo(() => {
    const uri = router.query.uri;
    const ipfs = router.query.ipfs;
    let array: string[] = [];
    // handle both ipfs and uri
    if (ipfs) {
      array = Array.isArray(ipfs) ? ipfs : [ipfs];
    } else if (uri) {
      array = (Array.isArray(uri) ? uri : [uri]).map((hash) =>
        hash.replace("ipfs://", ""),
      );
    }
    return array;
  }, [router.query]);

  const [selectedContractIds, setSelectedContractIds] = useState<ContractId[]>(
    [],
  );

  const publishContractNo = selectedContractIds.length;

  const { onSuccess, onError } = useTxNotifications(
    `Successfully published ${publishContractNo} contract$publishContractNo === 1 ? "" : "s"`,
    "Failed to publish contracts",
  );
  const publishMutation = usePublishMutation();

  const publishableContractIds = useMemo(() => {
    return selectedContractIds.filter((id) => !(id in UrlMap));
  }, [selectedContractIds]);

  const uris = useMemo(() => {
    return selectedContractIds.map((id) =>
      id.startsWith("ipfs://") ? id : `ipfs://${id}`,
    );
  }, [selectedContractIds]);

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">
            Publish Contracts{" "}
            <Badge py={0.5} variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Heading>
          <Text>
            Welcome to the thirdweb contract publishing & deployment flow.
          </Text>
        </Flex>
        <Card overflowX="auto">
          <DeployableContractTable
            contractIds={ipfsHashes}
            selectable={{
              selected: publishableContractIds,
              onChange: setSelectedContractIds,
            }}
          />
        </Card>
        <Flex justify="space-between">
          <Box />
          <TransactionButton
            colorScheme="primary"
            isDisabled={!publishContractNo}
            transactionCount={1}
            isLoading={publishMutation.isLoading}
            onClick={() => {
              trackEvent({
                category: "publish",
                action: "click",
                label: "attempt",
                uris,
              });
              publishMutation.mutate(uris, {
                onSuccess: () => {
                  onSuccess();
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "success",
                    uris,
                  });
                  router.push(`/dashboard/mumbai/new`);
                },
                onError: (err) => {
                  onError(err);
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "error",
                    uris,
                  });
                },
              });
            }}
          >
            Publish {publishContractNo} contract
            {publishContractNo === 1 ? "" : "s"}
          </TransactionButton>
        </Flex>
      </Flex>
      {/* TODO remove this somehow */}
      <NetworkMismatchNotice />
    </Track>
  );
};

const ContractsPublishPage: ConsolePage = () => {
  return (
    <CustomSDKContext desiredChainId={ChainId.Mumbai}>
      <ContractsPublishPageWrapped />
    </CustomSDKContext>
  );
};

ContractsPublishPage.Layout = AppLayout;

export default ContractsPublishPage;
