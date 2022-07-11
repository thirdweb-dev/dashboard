import { useReleasedContractInfo } from "../hooks";
import { ReleaserHeader } from "../releaser/releaser-header";
import { Divider, Flex, Icon, List, ListItem } from "@chakra-ui/react";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { IoDocumentOutline } from "react-icons/io5";
import { Card, Heading, Text } from "tw-components";

interface ReleasedContractProps {
  release: PublishedContract;
}

export const ReleasedContract: React.FC<ReleasedContractProps> = ({
  release,
}) => {
  const releasedContractInfo = useReleasedContractInfo(release);
  const wallet = useSingleQueryParam("wallet");
  console.log({ releasedContractInfo: releasedContractInfo.data });

  return (
    <Flex gap={12} w="full">
      <Flex w="full" flexDir="column" gap={6}>
        {releasedContractInfo.data?.publishedMetadata?.readme && (
          <Card w="full" as={Flex} flexDir="column" gap={2}>
            <Heading size="title.sm">Readme</Heading>
            <Text>{releasedContractInfo.data?.publishedMetadata.readme}</Text>
          </Card>
        )}
        {releasedContractInfo.data?.publishedMetadata?.changelog && (
          <Card w="full" as={Flex} flexDir="column" gap={2}>
            <Heading size="title.sm">
              {releasedContractInfo.data?.publishedMetadata?.version} Release
              Notes
            </Heading>
            <Text>
              {releasedContractInfo.data?.publishedMetadata?.changelog}
            </Text>
          </Card>
        )}
      </Flex>
      <Flex w="30vw" flexDir="column" gap={6}>
        {wallet && <ReleaserHeader wallet={wallet} />}
        <Divider />
        <Heading size="title.sm">Contract details</Heading>
        <List>
          <ListItem>
            <Flex gap={2} alignItems="center">
              <Icon as={IoDocumentOutline} boxSize={5} />
              <Text size="label.md">
                {releasedContractInfo.data?.publishedMetadata.license ||
                  "No license found"}
              </Text>
            </Flex>
          </ListItem>
        </List>
      </Flex>
    </Flex>
  );
};
