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
    <Card p={6} bg="bgBlack">
      <Flex w="full" justifyContent="space-between" gap={{ base: 1, md: 2 }}>
        <Container maxW="container.page" display="flex" px={0}>
          <Flex gap={4} color="white" flexDir="column">
            <Flex flexDir="column" gap={3}>
              <Heading size="label.lg" as="p" color="bgWhite">
                thirdweb services now require an API key
              </Heading>
              <Text color="bgWhite">
                Action <strong>required</strong> for all users: use of client
                API keys <strong>mandatory</strong> by August 1st to continue
                using thirdweb infrastructure services.
              </Text>
            </Flex>
            <Box>
              <TrackedLinkButton
                href="https://blog.thirdweb.com/changelog/api-keys-to-access-thirdweb-infra"
                category="announcement"
                label="api-keys"
                colorScheme="blackAlpha"
                bg="bgBlack"
                color="bgWhite"
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
          color="bgWhite"
          onClick={() => setHasDismissedAnnouncement(true)}
        />
      </Flex>
    </Card>
  );
};
