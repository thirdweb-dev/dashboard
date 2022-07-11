import { useReleasedContractInfo } from "../hooks";
import { ReleaserHeader } from "../releaser-header";
import { Flex } from "@chakra-ui/react";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
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
      <Flex w="30vw">{wallet && <ReleaserHeader wallet={wallet} />}</Flex>
    </Flex>
  );
};
