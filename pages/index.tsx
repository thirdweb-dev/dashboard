import {
  Box,
  Container,
  Flex,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { CodeExamples } from "components/homepage/CodeExamples";
import { HomepageFeatureCard } from "components/homepage/FeatureCard";
import { HomepageFooter } from "components/homepage/Footer";
import { OctopusCard } from "components/homepage/OctopusCard";
import { ProfitCalculator } from "components/homepage/ProfitCalculator";
import { HomepageSection } from "components/homepage/Section";
import { SupportedChain } from "components/homepage/SupportedChain";
import { HomepageTopNav } from "components/homepage/Topnav";
import { UpcomingFeature } from "components/homepage/UpcomingFeatureCard";
import { WhatCanYouBuild } from "components/homepage/WhatCanYouBuild";
import { ChakraNextImage } from "components/Image";
import { GeneralCta } from "components/shared/GeneralCta";
import { LinkButton } from "components/shared/LinkButton";
import { FeaturesBackground } from "components/svgs/FeaturesBackground";
import { useTrack } from "hooks/analytics/useTrack";
// images
import Octopus from "public/assets/landingpage/octopus.png";
// end images
import React from "react";
import { FiCheck } from "react-icons/fi";
import { ConsolePage } from "./_app";

const Home: ConsolePage = () => {
  const { Track } = useTrack({ page: "home" });
  return (
    <Track>
      <Flex justify="center" flexDir="column" as="main">
        <HomepageTopNav />
        <HomepageSection
          id="home"
          hero
          title="Build web3 apps, easily."
          subtitle={
            <>
              Smart contracts you control. Tools that accelerate your workflow.
              <Box display={{ base: "none", md: "block" }} /> Intuitive SDKs and
              widgets for developers.
            </>
          }
          bottomGradient="animated"
          paddingBottom
        >
          <Stack w="100%" spacing={["64px", "64px", "100px"]} pb="30rem">
            <GeneralCta size="lg" />
          </Stack>
        </HomepageSection>
        <Flex
          position="relative"
          zIndex={3}
          overflow="hidden"
          mt={{ base: "-40rem", md: "-48rem" }}
          py={{ base: 0, md: 0 }}
          id="features"
        >
          <FeaturesBackground position="absolute" bottom={0} />
          <Container
            maxW="container.page"
            position="relative"
            pb={["75px", "75px", "150px"]}
          >
            <Stack
              w="100%"
              align="center"
              spacing={{ base: "2.5rem", md: "5.5rem" }}
            >
              <SimpleGrid
                w="100%"
                placeItems="stretch"
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={6}
              >
                <HomepageFeatureCard type="nft" />
                <HomepageFeatureCard type="market" />
                <HomepageFeatureCard type="currency" />
                <HomepageFeatureCard type="pack" />
                <HomepageFeatureCard type="drop" />
                <HomepageFeatureCard type="split" />
              </SimpleGrid>
            </Stack>
          </Container>
        </Flex>

        <WhatCanYouBuild />

        <HomepageSection
          id="permissions"
          title="Permissions for your team"
          subtitle={
            <Box mt={-5}>
              Each module lets you finely tune permissions to control who can
              <br />
              access your modules and modify settings.
            </Box>
          }
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Stack spacing={{ base: 4, md: 20 }} mr={{ base: 0, md: 2 }}>
              <OctopusCard
                title="admin"
                address="0x386...23c2"
                description="Has full permissions for your project"
              />
              <OctopusCard
                title="minter"
                address="0x4F5...61b3"
                description="Can mint new tokens on your modules"
              />
            </Stack>
            <ChakraNextImage
              alt=""
              maxW={96}
              w={96}
              mt={24}
              display={{ base: "none", md: "block" }}
              placeholder="empty"
              src={Octopus}
            />
            <Stack
              spacing={{ base: 4, md: 14 }}
              mt={{ base: 4, md: 0 }}
              ml={{ base: 0, md: 2 }}
            >
              <OctopusCard
                title="pauser"
                address="0x27d...4Eb6"
                description="Can enable and disable external interaction with your modules"
              />
              <OctopusCard
                title="transferrer"
                address="0x4gh...5692"
                description="Can transfer and receive assets through your module"
              />
            </Stack>
          </Flex>
        </HomepageSection>

        <CodeExamples />

        <HomepageSection
          id="networks"
          bottomGradient="animated"
          title="thirdweb supports a multi-chain ecosystem of blockchains"
        >
          <Stack spacing="5rem" align="center">
            <SimpleGrid
              columns={[3, 3, 6]}
              spacing={{ base: "1.5rem", md: "4rem" }}
              mt={8}
            >
              <SupportedChain type="ethereum" />
              <SupportedChain type="polygon" />
              <SupportedChain type="avalanche" />
              <SupportedChain type="fantom" />
              <SupportedChain type="solana" />
              <SupportedChain type="flow" />
            </SimpleGrid>
            <LinkButton
              w="auto"
              flexGrow={0}
              size="lg"
              fontSize={{ base: "md", md: "lg" }}
              colorScheme="primary"
              borderRadius="full"
              href="https://portal.thirdweb.com"
              isExternal
            >
              Learn more
            </LinkButton>
          </Stack>
        </HomepageSection>

        <HomepageSection
          title="Powerful functionality"
          isDark
          topGradient="static"
        >
          <SimpleGrid
            w="100%"
            placeItems="stretch"
            columns={{ base: 1, md: 2, lg: 4 }}
          >
            <UpcomingFeature type="analytics" />
            <UpcomingFeature type="permissions" />
            <UpcomingFeature type="advanced_nfts" />
            <UpcomingFeature type="data" />
          </SimpleGrid>
        </HomepageSection>

        <HomepageSection
          id="fees"
          title="Free to get started. Aligned upside."
          subtitle={
            <List
              spacing={3}
              display="flex"
              flexDirection="column"
              alignItems="start"
              textAlign="left"
              id="fees"
            >
              <ListItem>
                <ListIcon as={FiCheck} color="twurple.500" />
                Get started for free.
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="twurple.500" />
                No hidden costs, ever.
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="twurple.500" />
                Only pay a tiny percentage of your royalties.
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="twurple.500" />
                Not taking royalties? Free.
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="twurple.500" />
                Your success is our mission. You win, we win.
              </ListItem>
            </List>
          }
          titleSm
          subtitleMd
          childrenOnRightSide
          mainAction={{
            MainActionButton: (
              <LinkButton
                display="none"
                href="https://portal.thirdweb.com"
                isExternal
                size="lg"
                flexShrink={0}
                colorScheme="twurple"
                borderRadius="full"
                bg="twurple.500"
              >
                Learn more
              </LinkButton>
            ),
            forceBelow: true,
          }}
        >
          <ProfitCalculator />
        </HomepageSection>

        <HomepageFooter />
      </Flex>
    </Track>
  );
};

export default Home;
