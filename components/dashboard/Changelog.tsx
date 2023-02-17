import { useChangelog } from "@3rdweb-sdk/react/hooks/useChangelog";
import { Flex } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { Link, Text } from "tw-components";

export const Changelog = () => {
  const changelogQuery = useChangelog();
  return (
    <Flex flexDir="column" gap={4} position="relative">
      <Flex
        position="absolute"
        h="96%"
        borderRight="1px solid"
        borderColor="gray.800"
        _light={{
          borderColor: "gray.300",
        }}
        left={{ base: "5px", md: "6px" }}
        top="14px"
      />
      {changelogQuery.data?.map((item) => (
        <Flex key={item.title} gap={4}>
          <Text
            color="gray.800"
            _light={{
              color: "gray.300",
            }}
            size="body.xl"
          >
            &#9679;
          </Text>
          <Flex flexDir="column">
            <Link href={item.url} _hover={{ textDecor: "none" }} role="group">
              <Text _groupHover={{ color: "blue.500" }}>{item.title}</Text>
            </Link>
            <Text color="gray.700">
              {formatDistance(new Date(item.published_at), Date.now(), {
                addSuffix: true,
              })}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Link
        href="https://blog.thirdweb.com/changelog/"
        isExternal
        ml={8}
        _hover={{ textDecor: "none" }}
        role="group"
      >
        <Text color="gray.700" _groupHover={{ color: "blue.500" }}>
          View all changes ➝
        </Text>
      </Link>
    </Flex>
  );
};
