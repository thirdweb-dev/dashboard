import { useChangelog } from "@3rdweb-sdk/react/hooks/useChangelog";
import { Flex } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { Link, Text } from "tw-components";

export const Changelog = () => {
  const changelogQuery = useChangelog();
  return (
    <Flex flexDir="column" gap={2}>
      {changelogQuery.data?.map((item) => (
        <Flex key={item.title} flexDir="column">
          <Link href={item.url}>{item.title}</Link>
          <Text>
            {formatDistance(new Date(item.published_at), Date.now(), {
              addSuffix: true,
            })}
          </Text>
        </Flex>
      ))}
      <Link href="https://blog.thirdweb.com/changelog/" isExternal>
        <Text>View all changes ➝</Text>
      </Link>
    </Flex>
  );
};
