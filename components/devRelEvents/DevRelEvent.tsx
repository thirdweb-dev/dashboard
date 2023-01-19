import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Badge, Heading, LinkButton, Text } from "tw-components";

interface EventProps {
  type: string;
  title: string;
  timestamp: string;
  location: string;
  description: string;
  link: string;
}

export const DevRelEvent: React.FC<EventProps> = ({
  type,
  title,
  timestamp,
  location,
  description,
  link,
}) => {
  const trackEvent = useTrack();

  return (
    <AccordionItem
      _hover={{
        bg: "whiteAlpha.50",
        transition: "all 0.2",
      }}
      bg="whiteAlpha.100"
      py={10}
      px={{
        base: 2,
        md: 10,
      }}
      my={4}
      rounded="lg"
      border={0}
    >
      <AccordionButton
        gap={6}
        _hover={{
          bg: "transparent",
        }}
        display="flex"
        flexDir={{
          base: "column",
          md: "row",
        }}
        rounded="lg"
      >
        <Badge
          h="min"
          alignSelf={{
            base: "flex-start",
          }}
        >
          {type}
        </Badge>
        <Flex flexDir="column" w="full">
          <Heading textAlign="left" size="title.md">
            {title}
          </Heading>

          <Flex
            justify="flex-start"
            gap={4}
            mt={2}
            flexDir={{
              base: "column",
              md: "row",
            }}
          >
            <Flex align="center" gap={1} wrap="wrap">
              <Icon as={FiCalendar} color="gray.300" />
              <Text color="gray.300">
                {new Date(timestamp).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Flex>
            <Flex align="center" gap={1}>
              <Icon as={FiClock} color="gray.300" />
              <Text color="gray.300">
                {new Date(timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
            </Flex>

            <Flex align="center" gap={1}>
              <Icon as={FaMapMarkerAlt} color="gray.300" />
              <Text color="gray.300">{location}</Text>
            </Flex>
          </Flex>
        </Flex>
      </AccordionButton>

      <AccordionPanel
        pb={4}
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        gap={4}
        ml={{
          base: 0,
          md: "7.5rem",
        }}
        justifyContent="left"
      >
        <Text textAlign="left">{description}</Text>
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
      </AccordionPanel>
    </AccordionItem>
  );
};
