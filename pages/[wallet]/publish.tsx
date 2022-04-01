import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import { useMemo } from "react";
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

  const router = useRouter();

  const uris = useMemo(() => {
    const uri = router.query.uri;
    return uri ? (Array.isArray(uri) ? uri : [uri]) : [];
  }, [router.query]);

  return (
    <Track>
      <Container maxW="xl">
        <Flex flexDirection="column" gap={6}>
          <Heading size="title.md">Publish your contracts</Heading>

          {uris.map((uri) => (
            <PublishMetadata uri={uri} key={uri} />
          ))}

          <TransactionButton
            width="full"
            colorScheme="primary"
            transactionCount={1}
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

interface PublishMetadataProps {
  uri: string;
}

const PublishMetadata: React.VFC<PublishMetadataProps> = ({ uri }) => {
  const metadataQuery = usePublishMetadataQuery(uri);

  return (
    <Card px={0}>
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
          <Divider borderColor="borderColor" />
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
          </Flex>
          <Divider borderColor="borderColor" />

          <Accordion allowToggle allowMultiple>
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
            <AccordionItem border="none">
              <AccordionButton>
                <Flex flex={1} textAlign="left" direction="column">
                  <Heading size="label.sm">ByteCode</Heading>
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
