import { Box, Container, Flex, Icon } from "@chakra-ui/react";
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import { SiYoutube } from "@react-icons/all-files/si/SiYoutube";
import { Logo } from "components/logo";
import { MobileMenu } from "components/product-pages/common/nav/MobileMenu";
import React from "react";
import { LinkButton, TrackedIconButton, TrackedLink } from "tw-components";

export const HackathonNav: React.FC<{}> = () => {
  return (
    <>
      <Box
        transition="all 100ms ease"
        position="sticky"
        top={0}
        left={0}
        w="100%"
        zIndex={0}
        as="header"
        bg="transparent"
      >
        <Container
          as={Flex}
          py={4}
          maxW="container.page"
          justify="space-between"
          align="center"
          flexDir="row"
        >
          <TrackedLink href="/" category="topnav" label="home">
            <Logo color="#fff" />
          </TrackedLink>
          <Flex
            display={{ base: "none", md: "flex" }}
            direction="row"
            align="center"
          >
            <TrackedLink
              isExternal
              // TODO: update this
              href="https://thirdweb.com"
              category="solana-hackathon"
              label="features"
              mx={4}
              fontWeight="semibold"
            >
              Features
            </TrackedLink>{" "}
            <TrackedLink
              isExternal
              // TODO: update this
              href="https://thirdweb.com"
              category="solana-hackathon"
              label="use-cases"
              mx={4}
              fontWeight="semibold"
            >
              Use cases
            </TrackedLink>{" "}
            <TrackedLink
              isExternal
              href="https://portal.thirdweb.com"
              category="solana-hackathon"
              label="docs"
              mx={4}
              fontWeight="semibold"
            >
              Docs
            </TrackedLink>
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href="https://twitter.com/thirdweb"
              color="gray.50"
              bg="transparent"
              aria-label="twitter"
              icon={<Icon boxSize="1rem" as={SiTwitter} />}
              category="topnav"
              label="twitter"
            />
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href="https://discord.gg/thirdweb"
              bg="transparent"
              color="gray.50"
              aria-label="discord"
              icon={<Icon boxSize="1rem" as={SiDiscord} />}
              category="topnav"
              label="discord"
            />
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href="https://www.youtube.com/channel/UCdzMx7Zhy5va5End1-XJFbA"
              bg="transparent"
              color="gray.50"
              aria-label="YouTube"
              icon={<Icon boxSize="1rem" as={SiYoutube} />}
              category="topnav"
              label="youtube"
            />
          </Flex>

          <MobileMenu
            aria-label="Homepage Menu"
            display={{ base: "inherit", md: "none" }}
          />
        </Container>
      </Box>
      <Box h="35px" w="100%" display={["block", "block", "none"]} />
    </>
  );
};
