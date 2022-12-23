import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import type { FC } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Badge, Heading, LinkButton, Text } from "tw-components";

interface EventProps {
  type: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  link: string;
}

const Event: FC<EventProps> = ({
  type,
  title,
  date,
  time,
  location,
  description,
  link,
}) => {
  const trackEvent = useTrack();

  return (
    <AccordionItem bg="whiteAlpha.100" p={10} my={4}>
      <AccordionButton
        gap={6}
        _hover={{
          bg: "transparent",
        }}
      >
        <Badge h="min">{type}</Badge>
        <Flex flexDir="column" w="full">
          <Heading textAlign="left">{title}</Heading>

          <Flex justify="space-between" mt={2}>
            <Flex align="center" gap={1}>
              <Icon as={FiCalendar} />
              <Text>{date}</Text>
            </Flex>
            <Flex align="center" gap={1}>
              <Icon as={FiClock} />
              <Text>{time}</Text>
            </Flex>

            <Flex align="center" gap={1}>
              <Icon as={FaMapMarkerAlt} />
              <Text>{location}</Text>
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
        ml={32}
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
          background="rgba(255,255,255,1)"
          _hover={{
            background: "rgba(255,255,255,0.9)!important",
          }}
        >
          Register
        </LinkButton>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default Event;
