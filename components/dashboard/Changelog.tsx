import { useChangelog } from "@3rdweb-sdk/react/hooks/useChangelog";
import { Flex } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { Link, Text } from "tw-components";

export const Changelog = () => {
  const changelogQuery = useChangelog();
  return (
    <Flex flexDir="column" gap={2} position="relative">
      <Flex
        position="absolute"
        h="96%"
        borderRight="1px solid"
        borderColor="gray.700"
        left={{ base: "6px", md: "7px" }}
        top="14px"
      />
      {changelogQuery.data?.map((item) => (
        <Flex key={item.title} gap={4}>
          <Text color="gray.700" size="body.2xl">
            &#9679;
          </Text>
          <Flex flexDir="column">
            <Link href={item.url}>{item.title}</Link>
            <Text>
              {formatDistance(new Date(item.published_at), Date.now(), {
                addSuffix: true,
              })}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Link href="https://blog.thirdweb.com/changelog/" isExternal ml={8}>
        <Text>View all changes ➝</Text>
      </Link>
    </Flex>
  );
};
