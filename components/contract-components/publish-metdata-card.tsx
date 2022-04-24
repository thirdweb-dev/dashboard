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
  Divider,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useContractPublishMetadataFromURI } from "components/contract-components/contract-table/hooks";
import { Card, CardProps } from "components/layout/Card";

interface PublishMetadataProps extends CardProps {
  uri?: string;
}

export const PublishMetadata: React.VFC<PublishMetadataProps> = ({
  uri,
  ...restCardProps
}) => {
  const metadataQuery = useContractPublishMetadataFromURI(uri || "");

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
