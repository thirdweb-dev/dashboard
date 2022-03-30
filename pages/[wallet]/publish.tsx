import {
  Alert,
  AlertDescription,
  AlertIcon,
  Code,
  Container,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { StorageSingleton } from "components/app-layouts/providers";
import { TransactionButton } from "components/buttons/TransactionButton";
import { Card } from "components/layout/Card";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import { useQuery } from "react-query";

function usePublishMetadataQuery(uri?: string) {
  return useQuery(
    ["publish-metadata", uri],
    () => {
      return uri ? StorageSingleton.get(uri) : undefined;
    },
    {
      enabled: !!uri,
    },
  );
}

const PublishPage: ConsolePage = () => {
  const { Track } = useTrack({
    page: "publish",
  });

  const publishUri = useSingleQueryParam("uri");

  const metadataQuery = usePublishMetadataQuery(publishUri);

  return (
    <Track>
      <Container maxW="xl">
        <Flex flexDirection="column" gap={6}>
          <Heading size="title.md">Publish your contract</Heading>
          <Card
            overflow={"hidden"}
            as={Flex}
            p={0}
            gap={3}
            flexDirection="column"
          >
            {metadataQuery.isError ? (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  Failed to your contract metadata.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <Flex gap={1} mt={4} px={4} direction="column">
                  <Heading size="label.sm">Name</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Text>{metadataQuery.data?.name || "No name"}</Text>
                  </Skeleton>
                </Flex>
                <Divider borderColor="borderColor" />
                <Flex gap={1} px={4} direction="column">
                  <Heading size="label.sm">Description</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Text>{metadataQuery.data?.description || "N/A"}</Text>
                  </Skeleton>
                </Flex>
                <Divider borderColor="borderColor" />
                <Flex gap={1} px={4} direction="column">
                  <Heading size="label.sm">License</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Text>{metadataQuery.data?.license ?? "Unlicensed"}</Text>
                  </Skeleton>
                </Flex>
                <Divider borderColor="borderColor" />
                <Flex gap={1} px={4} direction="column">
                  <Heading size="label.sm">Version</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Text>{metadataQuery.data?.version ?? "Unversioned"}</Text>
                  </Skeleton>
                </Flex>
                <Divider borderColor="borderColor" />
                <Flex gap={1} px={4} direction="column">
                  <Heading size="label.sm">ABI</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Code w="full" whiteSpace="pre" p={2}>
                      {metadataQuery.data?.abi
                        ? JSON.stringify(metadataQuery.data.abi, null, 2)
                        : "[]"}
                    </Code>
                  </Skeleton>
                </Flex>
                <Divider borderColor="borderColor" />
                <Flex gap={1} px={4} direction="column">
                  <Heading size="label.sm">ByteCode</Heading>
                  <Skeleton isLoaded={metadataQuery.isSuccess}>
                    <Code w="full" whiteSpace="pre-wrap" p={2}>
                      {metadataQuery.data?.bytecode ?? "."}
                    </Code>
                  </Skeleton>
                </Flex>
              </>
            )}

            <TransactionButton
              borderTopRadius={0}
              width="full"
              colorScheme="primary"
              transactionCount={1}
              isDisabled={!metadataQuery.isSuccess}
            >
              Publish
            </TransactionButton>
          </Card>
        </Flex>
      </Container>
    </Track>
  );
};

PublishPage.Layout = AppLayout;

export default PublishPage;
