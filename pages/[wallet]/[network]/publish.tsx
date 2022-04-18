import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Checkbox,
  Code,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { fetchContractMetadata } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { StorageSingleton } from "components/app-layouts/providers";
import { TransactionButton } from "components/buttons/TransactionButton";
import { Card, CardProps } from "components/layout/Card";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import invariant from "tiny-invariant";
import { parseErrorToMessage } from "utils/errorParser";

function usePublishMetadataQuery(uri?: string) {
  return useQuery(
    ["publish-metadata", uri],
    () => {
      return uri ? fetchContractMetadata(uri, StorageSingleton) : undefined;
    },
    {
      enabled: !!uri,
    },
  );
}

function usePublishMutation() {
  const sdk = useSDK();
  return useMutation((uris: string[]) => {
    invariant(sdk && "publisher" in sdk, "sdk is undefined");
    return Promise.all(uris.map((uri) => sdk.publisher.publish(uri)));
  });
}

const PublishPage: ConsolePage = () => {
  const { Track } = useTrack({
    page: "publish",
  });

  const router = useRouter();

  const uris = useMemo(() => {
    const uri = router.query.uri;
    const ipfs = router.query.ipfs;
    let array: string[] = [];
    // handle both ipfs and uri
    if (ipfs) {
      array = (Array.isArray(ipfs) ? ipfs : [ipfs]).map(
        (hash) => `ipfs://${hash}`,
      );
    } else if (uri) {
      array = Array.isArray(uri) ? uri : [uri];
    }
    return array;
  }, [router.query]);

  const [urisToPublish, setUrisToPublish] = useState(() => uris);

  useEffect(() => {
    setUrisToPublish(uris);
  }, [uris]);

  const toggleUriPublish = useCallback((uri: string) => {
    setUrisToPublish((_prevUris) => {
      if (_prevUris.includes(uri)) {
        return _prevUris.filter((u) => u !== uri);
      }
      return [..._prevUris, uri];
    });
  }, []);

  const publishMutation = usePublishMutation();
  const toast = useToast();
  const wallet = useSingleQueryParam("wallet") || "dashboard";

  return (
    <Track>
      <Container maxW="container.page">
        <Flex flexDirection="column" gap={6}>
          <Heading size="title.md">Publish your contracts</Heading>
          <SimpleGrid
            columns={{
              base: 1,
              sm: Math.min(uris.length, 2),
              md: Math.min(uris.length, 3),
              lg: Math.min(uris.length, 4),
            }}
            gap={8}
          >
            {uris.map((uri) => (
              <Box w="100%" key={uri} gap={2}>
                <Checkbox
                  aria-label="Publish"
                  isChecked={urisToPublish.includes(uri)}
                  onChange={() => toggleUriPublish(uri)}
                />
                <PublishMetadata maxW="100%" flexGrow={1} uri={uri} />
              </Box>
            ))}
          </SimpleGrid>

          <TransactionButton
            width="full"
            colorScheme="primary"
            isDisabled={urisToPublish.length === 0}
            transactionCount={urisToPublish.length}
            isLoading={publishMutation.isLoading}
            onClick={() =>
              publishMutation.mutate(urisToPublish, {
                onSuccess: () => {
                  toast({
                    title: "Success",
                    description: "Successfully published contracts",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  router.push(`/${wallet}/mumbai/new`);
                },
                onError: (err) => {
                  toast({
                    title: "Failed to publish",
                    description: parseErrorToMessage(err),
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                },
              })
            }
          >
            Publish
          </TransactionButton>
        </Flex>
      </Container>
    </Track>
  );
};

PublishPage.Layout = AppLayout;

export default PublishPage;

interface PublishMetadataProps extends CardProps {
  uri?: string;
}

export const PublishMetadata: React.VFC<PublishMetadataProps> = ({
  uri,
  ...restCardProps
}) => {
  const metadataQuery = usePublishMetadataQuery(uri);

  return (
    <Card px={0} flexGrow={1} {...restCardProps}>
      {metadataQuery.isError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Failed to load your contract metadata.
          </AlertDescription>
        </Alert>
      ) : (
        <Flex gap={3} direction="column">
          <Flex px={4} gap={1} direction="column">
            <Heading size="label.sm">Name</Heading>
            <Skeleton isLoaded={metadataQuery.isSuccess}>
              <Text>{metadataQuery.data?.name || "No name"}</Text>
            </Skeleton>
          </Flex>
          {/* <Divider borderColor="borderColor" />
          <Flex px={4} gap={1} direction="column">
            <Heading size="label.sm">Description</Heading>
            <Skeleton isLoaded={metadataQuery.isSuccess}>
              <Text>{metadataQuery.data?.description || "N/A"}</Text>
            </Skeleton>
          </Flex>
          <Divider borderColor="borderColor" />
          <Flex px={4} gap={1} direction="column">
            <Heading size="label.sm">License</Heading>
            <Skeleton isLoaded={metadataQuery.isSuccess}>
              <Text>{metadataQuery.data?.license ?? "Unlicensed"}</Text>
            </Skeleton>
          </Flex>
          <Divider borderColor="borderColor" />
          <Flex px={4} gap={1} direction="column">
            <Heading size="label.sm">Version</Heading>
            <Skeleton isLoaded={metadataQuery.isSuccess}>
              <Text>{metadataQuery.data?.version ?? "Unversioned"}</Text>
            </Skeleton>
          </Flex> */}
          <Divider borderColor="borderColor" />

          <Accordion allowToggle allowMultiple maxW="full">
            <AccordionItem border="none">
              <AccordionButton>
                <Flex flex={1} textAlign="left" direction="column">
                  <Heading size="label.sm">ABI</Heading>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Skeleton isLoaded={metadataQuery.isSuccess}>
                  <Code
                    maxH="66vh"
                    overflow="auto"
                    borderRadius="md"
                    w="full"
                    whiteSpace="pre"
                    p={2}
                  >
                    {metadataQuery.data?.abi
                      ? JSON.stringify(metadataQuery.data.abi, null, 2)
                      : "[]"}
                  </Code>
                </Skeleton>
              </AccordionPanel>
            </AccordionItem>
            <Divider my={3} borderColor="borderColor" />
            <AccordionItem border="none" maxW="full">
              <AccordionButton>
                <Flex flex={1} textAlign="left" direction="column">
                  <Heading size="label.sm">ByteCode</Heading>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel maxW="full">
                <Skeleton isLoaded={metadataQuery.isSuccess}>
                  <Code
                    maxH="66vh"
                    overflow="auto"
                    borderRadius="md"
                    w="full"
                    whiteSpace="pre-wrap"
                    p={2}
                  >
                    {metadataQuery.data?.bytecode ?? "."}
                  </Code>
                </Skeleton>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      )}
    </Card>
  );
};
