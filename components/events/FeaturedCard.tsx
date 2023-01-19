import { Flex, Icon, Image } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { FiCalendar } from "react-icons/fi";
import { Badge, Heading, LinkButton, Text } from "tw-components";

interface FeaturedCardProps {
  type: string;
  title: string;
  date: string;
  banner: string;
  link: string;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
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
      <Flex flexDir="column" p={4} align="center">
        <Heading>{title}</Heading>
        <Flex align="center" my={2}>
          <Icon as={FiCalendar} color="gray.300" />
          <Text ml={2} color="gray.300">
            {date}
          </Text>
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
          mt={4}
          fontSize="20px"
          color="black"
          flexShrink={0}
          background="white"
          _hover={{
            background: "whiteAlpha.900",
          }}
        >
          Register
        </LinkButton>
      </Flex>
    </Flex>
  );
};
