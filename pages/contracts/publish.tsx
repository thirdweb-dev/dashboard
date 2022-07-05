import { Box, Flex, Link } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { TransactionButton } from "components/buttons/TransactionButton";
import { usePublishMutation } from "components/contract-components/hooks";
import { UrlMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { Badge, Heading, Text } from "tw-components";

const ContractsPublishPageWrapped: React.FC = () => {
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

  const { onSuccess, onError } = useTxNotifications(
    "Successfully published contract",
    "Failed to publish contracts",
  );
  const publishMutation = usePublishMutation();

  const publishableContractId = useMemo(() => {
    return ipfsHashes.find((id) => !(id in UrlMap));
  }, [ipfsHashes]);

  const uri = useMemo(
    () =>
      publishableContractId?.startsWith("ipfs://")
        ? publishableContractId
        : `ipfs://${publishableContractId}`,
    [publishableContractId],
  );

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">
            Publish Contracts{" "}
            <Badge variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Heading>
          <Text fontStyle="italic" maxW="container.md">
            Publishing contracts lets you make your contracts available to be
            deployed later, across multiple chains. You can even share your
            published contracts with others, letting them deploy instances of
            your contracts.
            <br />
            <Link
              color="primary.500"
              isExternal
              href="https://portal.thirdweb.com/thirdweb-deploy"
            >
              Learn more about publishing contracts
            </Link>
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Box />
          <TransactionButton
            colorScheme="primary"
            transactionCount={1}
            isLoading={publishMutation.isLoading}
            onClick={() => {
              trackEvent({
                category: "publish",
                action: "click",
                label: "attempt",
                uris: uri,
              });
              publishMutation.mutate(uri, {
                onSuccess: () => {
                  onSuccess();
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "success",
                    uris: uri,
                  });
                  router.push(`/contracts`);
                },
                onError: (err) => {
                  onError(err);
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "error",
                    uris: uri,
                  });
                },
              });
            }}
          >
            Publish contract
          </TransactionButton>
        </Flex>
      </Flex>
    </Track>
  );
};

export default function ContractsPublishPage() {
  return (
    <PublisherSDKContext>
      <ContractsPublishPageWrapped />
    </PublisherSDKContext>
  );
}

ContractsPublishPage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
