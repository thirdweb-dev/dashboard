"use client";
import { Box, ButtonGroup, Container, Flex, Icon } from "@chakra-ui/react";
import { Link, TrackedLink } from "tw-components/link";
import { Text } from "tw-components/text";
import { Logo } from "../../../components/logo";
import {
  Button,
  LinkButton,
  TrackedIconButton,
} from "../../../tw-components/button";
import { usePathname } from "next/navigation";
// import { CmdKSearch } from "../../../components/cmd-k-search";
// import { CreditsButton } from "../../../components/settings/Account/Billing/CreditsButton";
// import { UpgradeButton } from "components/settings/Account/Billing/UpgradeButton";
import { FiHelpCircle } from "react-icons/fi";
import { ColorModeToggle } from "../../../components/color-mode/color-mode-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      minH="calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
      direction="column"
      backgroundColor="backgroundBody"
    >
      <AppHeader />

      <Box
        minH={{ base: "100vh", md: "unset" }}
        pt={{ base: 6, md: 10 }}
        pb={{ base: 6, md: 20 }}
        as="main"
      >
        {children}
      </Box>

      <AppFooter />
    </Flex>
  );
}

const AppHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <Box background="backgroundHighlight" zIndex="sticky" boxShadow="sm" pb={2}>
      <Container
        maxW="100%"
        display="flex"
        py={3}
        as="header"
        alignItems="center"
      >
        <Flex align="center" gap={4}>
          <Link href="/dashboard">
            <Logo hideWordmark />
          </Link>
          {/* <CmdKSearch /> */}
        </Flex>
        <Flex align="center" gap={4} marginLeft="auto">
          <Flex display={{ base: "none", md: "flex" }} gap={2}>
            {/* <CreditsButton /> */}
            {/* <UpgradeButton /> */}
          </Flex>
          <Button
            as={TrackedLink}
            variant="link"
            href="https://portal.thirdweb.com"
            isExternal
            category="header"
            label="docs"
            color="bgBlack"
            display={{ base: "none", md: "block" }}
            size="sm"
            mx={1.5}
          >
            Docs
          </Button>
          <Button
            as={TrackedLink}
            variant="link"
            href="/support"
            category="header"
            label="docs"
            color="bgBlack"
            display={{ base: "none", md: "block" }}
            size="sm"
            mx={1.5}
          >
            Support
          </Button>

          <Flex display={{ base: "flex", md: "none" }}>
            <TrackedIconButton
              bg="transparent"
              size="sm"
              aria-label="get-help"
              icon={<Icon as={FiHelpCircle} />}
              category="header"
              label="support"
              as={LinkButton}
              href="/support"
            />
          </Flex>

          <ColorModeToggle />

          {/* <CustomConnectWallet ml={{ base: 0, md: 2 }} colorScheme="blue" /> */}
        </Flex>
      </Container>
      <Container
        maxW="100%"
        display="flex"
        py={2}
        as="nav"
        alignItems="center"
        overflowX={{ base: "auto", md: "hidden" }}
      >
        <ButtonGroup size="sm" variant="ghost" spacing={{ base: 0.5, md: 2 }}>
          <LinkButton
            href="/dashboard"
            isActive={pathname === "/dashboard"}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Home
          </LinkButton>
          <LinkButton
            href="/dashboard/connect/playground"
            isActive={
              pathname?.startsWith("/dashboard/connect") ||
              pathname?.startsWith("/dashboard/payments")
            }
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Connect
          </LinkButton>
          <LinkButton
            href="/dashboard/contracts/deploy"
            isActive={pathname?.startsWith("/dashboard/contracts")}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Contracts
          </LinkButton>
          <LinkButton
            href="/dashboard/engine"
            isActive={pathname?.startsWith("/dashboard/engine")}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Engine
          </LinkButton>
          <LinkButton
            href="/dashboard/settings/api-keys"
            isActive={pathname?.startsWith("/dashboard/settings")}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Settings
          </LinkButton>
        </ButtonGroup>
      </Container>
    </Box>
  );
};

const AppFooter: React.FC = () => {
  return (
    <Flex
      as="footer"
      w="full"
      py={4}
      gap={4}
      mt="auto"
      alignItems="center"
      flexDir={{ base: "column", md: "row" }}
      justifyContent="center"
      bg="backgroundHighlight"
      zIndex="sticky"
    >
      <Link isExternal href="https://feedback.thirdweb.com">
        <Text>Feedback</Text>
      </Link>
      <Link isExternal href="/privacy">
        <Text>Privacy Policy</Text>
      </Link>
      <Link isExternal href="/tos">
        <Text>Terms of Service</Text>
      </Link>

      <Link href="/gas" bg="transparent" display={{ base: "none", md: "flex" }}>
        <Text>Gas Estimator</Text>
      </Link>
      <Link
        href="/chainlist"
        bg="transparent"
        display={{ base: "none", md: "flex" }}
      >
        <Text>Chainlist</Text>
      </Link>
      <Text alignSelf="center" order={{ base: 2, md: 0 }} opacity={0.5}>
        thirdweb &copy; {new Date().getFullYear()}
      </Text>
    </Flex>
  );
};
