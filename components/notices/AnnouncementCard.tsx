import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import { useLocalStorage } from "hooks/useLocalStorage";
import { FiX } from "react-icons/fi";
import { Card, Heading, Text, TrackedLinkButton } from "tw-components";

export const AnnouncementCard = () => {
  const [hasDismissedAnnouncement, setHasDismissedAnnouncement] =
    useLocalStorage("dismissed-api-keys", false, true);

  if (hasDismissedAnnouncement) {
    return null;
  }

  return (
    <Card p={6}>
      <Flex w="full" justifyContent="space-between" gap={{ base: 1, md: 2 }}>
        <Container maxW="container.page" display="flex" px={0}>
          <Flex mx="auto" gap={4} color="white" flexDir="column">
            <Flex flexDir="column" gap={3}>
              <Heading size="label.lg" as="p">
                thirdweb services now require an API key
              </Heading>
              <Text>
                Action <strong>required</strong> for all users: use of client
                API keys <strong>mandatory</strong> by August 1st to continue
                using thirdweb infrastructure services.
              </Text>
            </Flex>
            <Box>
              <TrackedLinkButton
                href="/"
                category="announcement"
                label="api-keys"
                colorScheme="blackAlpha"
              >
                Learn More
              </TrackedLinkButton>
            </Box>
          </Flex>
        </Container>

        <IconButton
          size="xs"
          aria-label="Close announcement"
          icon={<FiX />}
          variant="ghost"
          onClick={() => setHasDismissedAnnouncement(true)}
        />
      </Flex>
    </Card>
  );
};
