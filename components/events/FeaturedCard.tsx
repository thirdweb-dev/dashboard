import { Flex, Icon, Image } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import type { FC } from "react";
import { FiCalendar } from "react-icons/fi";
import { Badge, Heading, LinkButton, Text } from "tw-components";

interface FeaturedCardProps {
  type: string;
  title: string;
  date: string;
  banner: string;
  link: string;
}

export const FeaturedCard: FC<FeaturedCardProps> = ({
  type,
  title,
  date,
  banner,
  link,
}) => {
  const trackEvent = useTrack();

  return (
    <Flex
      pos="relative"
      flexDir="column"
      bg="whiteAlpha.100"
      rounded="lg"
      maxW="500px"
    >
      <Badge
        pos="absolute"
        top={4}
        left={4}
        bg="white"
        color="black"
        p={2}
        rounded="md"
      >
        {type}
      </Badge>
      <Image src={banner} alt={title} roundedTop="lg" />
      <Flex flexDir="column" p={4}>
        <Heading>{title}</Heading>
        <Flex align="center" my={2}>
          <Icon as={FiCalendar} />
          <Text ml={2}>{date}</Text>
        </Flex>

        <LinkButton
          href={link}
          onClick={() =>
            trackEvent({
              category: `events-${title}`,
              action: "click",
              label: "register",
            })
          }
          w={60}
          mx="auto"
          fontSize="20px"
          color="black"
          flexShrink={0}
          background="rgba(255,255,255,1)"
          _hover={{
            background: "rgba(255,255,255,0.9)!important",
          }}
        >
          Register
        </LinkButton>
      </Flex>
    </Flex>
  );
};
