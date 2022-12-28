import { Flex, Grid, LinkBox } from "@chakra-ui/react";
import { Badge, Button, Heading, Text, TrackedLink } from "tw-components";

interface ScheduleItemDetail {
  title: string;
  time: string;
  link: string;
  irl?: string;
}

interface ScheduleItem {
  day: number;
  items: ScheduleItemDetail[];
}

interface ScheduleSectionProps {
  scheduleItems: ScheduleItem[];
  month: string;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  scheduleItems,
  month,
}) => {
  return (
    <Flex
      flexDir="column"
      mt={{ base: 4, md: 12 }}
      px={{ base: 0, md: 20 }}
      alignItems="center"
    >
      <Flex align="center" justify="space-between" w="full">
        <Heading size="title.2xl">Schedule</Heading>
        <Button
          _hover={{
            bg: "#B7FD18",
            opacity: 0.8,
          }}
          _active={{
            bg: "#B7FD18",
            opacity: 0.9,
          }}
          bg="#B7FD18"
          color="black"
        >
          Add to calendar
        </Button>
      </Flex>

      <Grid
        gap={6}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        mt="4"
      >
        {scheduleItems.map(({ day, items }) => (
          <Flex
            role="group"
            align="center"
            w="full"
            p={{ base: 4, md: 8 }}
            gap={4}
            flexDir="column"
            key={day}
            bg="whiteAlpha.100"
            _hover={{
              bg: "whiteAlpha.200",
            }}
          >
            <Heading>
              {day} {month}
            </Heading>
            {items.map(({ title, time, link, irl }) => (
              <LinkBox key={title} w="full" p={4} borderRadius="md">
                <TrackedLink
                  category="Hackathon"
                  href={link}
                  isExternal
                  label={title}
                >
                  <Text fontWeight="bold">{title}</Text>
                  <Text fontSize="sm">{time}</Text>
                  {irl && (
                    <Badge
                      colorScheme="green"
                      fontSize="xs"
                      mt={2}
                      px={2}
                      py={1}
                    >
                      In Real Life
                    </Badge>
                  )}
                </TrackedLink>
              </LinkBox>
            ))}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};
