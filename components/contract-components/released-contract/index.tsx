import { useReleasedContractInfo } from "../hooks";
import { ReleaserHeader } from "../releaser/releaser-header";
import { Divider, Flex, Icon, List, ListItem } from "@chakra-ui/react";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { IoDocumentOutline } from "react-icons/io5";
import { SiTwitter } from "react-icons/si";
import {
  Card,
  Heading,
  LinkButton,
  Text,
  TrackedIconButton,
} from "tw-components";

interface ReleasedContractProps {
  release: PublishedContract;
}

export const ReleasedContract: React.FC<ReleasedContractProps> = ({
  release,
}) => {
  const releasedContractInfo = useReleasedContractInfo(release);
  const wallet = useSingleQueryParam("wallet");
  const router = useRouter();

  const currentRoute = `https://thirdweb.com${router.asPath}`;

  console.log(router);

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
        <Flex flexDir="column" gap={4}>
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
        <Divider />
        <Flex flexDir="column" gap={4}>
          <Heading size="title.sm">Share</Heading>
          <Flex gap={2} alignItems="center">
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20${releasedContractInfo.data?.name}%20contract%20on%20%40thirdweb_%20!%20Ready%20to%20be%20deployed%20in%20one-click%2C%20awesome!%20&url=${currentRoute}`}
              bg="transparent"
              aria-label="twitter"
              icon={<Icon boxSize={5} as={SiTwitter} />}
              category="tweet-contract"
              label="twitter"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
