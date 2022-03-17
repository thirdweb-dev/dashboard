import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { EarlyAccessBanner } from "components/banners/early-access";
import { EarlyAccessBadge } from "components/early-access/EarlyAccessBadge";
import { Logo } from "components/logo";
import { InsufficientFunds } from "components/notices/InsufficientFunds";
import { NetworkMismatchNotice } from "components/notices/NetworkMismatch";
import { LinkButton } from "components/shared/LinkButton";
import { NextLink } from "components/shared/NextLink";
import { AccountConnector } from "components/web3/AccountConnector";
import { useTrack } from "hooks/analytics/useTrack";
import { useRouter } from "next/router";
import React from "react";
import { SiDiscord, SiGithub, SiTwitter } from "react-icons/si";
import { Breadcrumbs } from "./Breadcrumbs";
import { FeedbackModal } from "./FeedbackModal";

export const AppShell: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { trackEvent } = useTrack();
  const feedback = useDisclosure();

  return (
    <Flex
      h="calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
      w="calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))"
      position="relative"
      overflow="hidden"
    >
      <Flex
        transition="margin 350ms ease"
        zIndex="docked"
        width="100%"
        flexGrow={1}
        flexShrink={0}
        flexDir="column"
        overflowY="auto"
        bg="backgroundLight"
      >
        <Box
          background="white"
          zIndex="banner"
          shadow="sm"
          position="sticky"
          top={0}
        >
          <Container
            maxW="container.page"
            display="flex"
            py={2}
            as="header"
            alignItems="center"
          >
            <NextLink href="/dashboard">
              <Logo />
            </NextLink>
            <Stack
              direction="row"
              align="center"
              spacing={{ base: 3, md: 4 }}
              marginLeft="auto"
            >
              <NextLink
                href="https://portal.thirdweb.com"
                isExternal
                variant="link"
                color="inherit"
                fontWeight="inherit"
                textDecoration={undefined}
                display={{ base: "none", md: "block" }}
              >
                Guides
              </NextLink>
              <ButtonGroup
                variant="ghost"
                color="gray.600"
                display={{ base: "none", md: "block" }}
              >
                <IconButton
                  as={LinkButton}
                  isExternal
                  noIcon
                  href="https://twitter.com/thirdweb_"
                  color="gray.700"
                  bg="transparent"
                  aria-label="twitter"
                  icon={<Icon boxSize="1rem" as={SiTwitter} />}
                  onClick={() =>
                    trackEvent({
                      category: "footer",
                      action: "click",
                      label: "twitter",
                    })
                  }
                />
                <IconButton
                  as={LinkButton}
                  isExternal
                  noIcon
                  href="https://discord.gg/thirdweb"
                  bg="transparent"
                  color="gray.700"
                  aria-label="discord"
                  icon={<Icon boxSize="1rem" as={SiDiscord} />}
                  onClick={() =>
                    trackEvent({
                      category: "footer",
                      action: "click",
                      label: "discord",
                    })
                  }
                />
                <IconButton
                  as={LinkButton}
                  isExternal
                  noIcon
                  href="https://github.com/thirdweb-dev"
                  bg="transparent"
                  color="gray.700"
                  aria-label="github"
                  icon={<Icon boxSize="1rem" as={SiGithub} />}
                  onClick={() =>
                    trackEvent({
                      category: "footer",
                      action: "click",
                      label: "github",
                    })
                  }
                />
              </ButtonGroup>
              {/*               <LinkButton
                href="/gas-grants"
                colorScheme="blue"
                size="sm"
                display={{ base: "none", md: "flex" }}
              >
                Apply for gas grants
              </LinkButton> */}
              <AccountConnector />
            </Stack>
          </Container>
        </Box>
        <EarlyAccessBanner />
        <Container flexGrow={1} as="main" maxW="container.page" py={8}>
          <Breadcrumbs />
          {children}
        </Container>
        <Divider />
        <Container as="footer" maxW="container.page" w="100%" py={4}>
          <Stack>
            <Stack direction="row" spacing="4" align="center" justify="center">
              <Text alignSelf="center" fontSize="sm">
                thirdweb &copy; {new Date().getFullYear()}
              </Text>
              <EarlyAccessBadge />
              <Link
                onClick={feedback.onOpen}
                variant="link"
                color="inherit"
                fontWeight="inherit"
                textDecoration={undefined}
              >
                Feedback
              </Link>
            </Stack>
          </Stack>
        </Container>
        <FeedbackModal isOpen={feedback.isOpen} onClose={feedback.onClose} />
        {pathname !== "/dashboard" && (
          <>
            <NetworkMismatchNotice />
            <InsufficientFunds />
          </>
        )}
      </Flex>
    </Flex>
  );
};
