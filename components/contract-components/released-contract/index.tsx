import { useReleasedContractInfo } from "../hooks";
import { ReleaserHeader } from "../releaser-header";
import { Flex } from "@chakra-ui/react";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Card } from "tw-components";

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
      <Card w="full">hi</Card>
      <Flex w="30vw">{wallet && <ReleaserHeader wallet={wallet} />}</Flex>
    </Flex>
  );
};
