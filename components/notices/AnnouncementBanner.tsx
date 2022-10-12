import { Box, Container, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useLocalStorage } from "hooks/useLocalStorage";
import { FiArrowRight, FiX } from "react-icons/fi";
import { Heading, TrackedLink } from "tw-components";

export const AnnouncementBanner = () => {
  const [hasDismissedAnnouncement, setHasDismissedAnnouncement] =
    useLocalStorage("dismissed-solana-announcement", false);

  if (hasDismissedAnnouncement.data || hasDismissedAnnouncement.isLoading) {
    return null;
  }

  return (
    <Box
      position="sticky"
      zIndex="10"
      py={3}
      bgImage="linear-gradient(44.76deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 88.00%, #19FB9B 95.01%)"
    >
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Box ml={4} />
        <TrackedLink
          href="https://twitter.com/thirdweb/status/1562842674679652352"
          category="landingpage"
          label="announcement-tweet"
          isExternal
        >
          <Container maxW="container.page" display="flex">
            <Flex
              cursor="pointer"
              mx="auto"
              align="center"
              gap={{ base: 0.5, md: 2 }}
              color="white"
            >
              <Heading
                size="label.lg"
                as="p"
                lineHeight={{ base: 1.5, md: undefined }}
                color="white"
              >
                We&apos;e excited to announce that the thirdweb developer tool
                suite is now available on <strong>Solana!</strong>
              </Heading>
              <Icon as={FiArrowRight} />
            </Flex>
          </Container>
        </TrackedLink>
        <IconButton
          size="xs"
          mr={4}
          aria-label="Close announcement"
          icon={<FiX />}
          color="white"
          variant="ghost"
          onClick={() => setHasDismissedAnnouncement(true)}
        />
      </Flex>
    </Box>
  );
};
