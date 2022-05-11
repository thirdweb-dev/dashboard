import { ConsolePage } from "./_app";
import {
  Box,
  Flex,
  LightMode,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { CaseStudyCard } from "components/homepage/CaseStudyCard";
import { DashboardCard } from "components/homepage/DashboardCard";
import { HomepageSection } from "components/homepage/Section";
import { SupportedChain } from "components/homepage/SupportedChain";
import { HomepageTopNav } from "components/homepage/Topnav";
import { GeneralCta } from "components/shared/GeneralCta";
import { useTrack } from "hooks/analytics/useTrack";
// images
import Analytics from "public/assets/landingpage/analytics.png";
import BoohooLogo from "public/assets/landingpage/boohoo-logo.png";
import Boohoo from "public/assets/landingpage/boohoo.png";
import Contracts from "public/assets/landingpage/contracts.png";
import Hero from "public/assets/landingpage/hero.png";
import ThirdwebTeams from "public/assets/landingpage/thirdweb-teams.png";
// end images
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { BsMenuButtonWide } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { MdOutlineAnalytics } from "react-icons/md";
import { Heading, Text } from "tw-components";

const Home: ConsolePage = () => {
  const { Track } = useTrack({ page: "home" });
  return (
    <LightMode>
      <Track>
        <Flex justify="center" flexDir="column" as="main" bg="#000">
          <HomepageTopNav />
          <HomepageSection
            id="home"
            hero
            title="Build web3 apps, easily."
            isDark
            subtitle={
              <Box color="gray.400">
                <Box mb={12}>
                  Smart contracts you control.{" "}
                  <Box display={{ base: "none", md: "block" }} /> Tools that
                  accelerate your workflow.
                  <Box display={{ base: "none", md: "block" }} /> Intuitive SDKs
                  and embeds for developers.
                </Box>
                <GeneralCta size="lg" />
              </Box>
            }
            topGradient="static"
            childrenOnRightSide
            leftAlignedTitle
            leftAlignedSubtitle
          >
            <Flex justifyContent="end" mr={12}>
              <ChakraNextImage
                alt=""
                maxW={96}
                w={96}
                mt={8}
                display={{ base: "none", md: "block" }}
                placeholder="empty"
                src={Hero}
              />
            </Flex>
          </HomepageSection>
          {/*           <Flex
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
                  <HomepageFeatureCard type={NFTCollection.contractType} />
                  <HomepageFeatureCard type={Marketplace.contractType} />
                  <HomepageFeatureCard type={Token.contractType} />
                  <HomepageFeatureCard type={Pack.contractType} />
                  <HomepageFeatureCard type={NFTDrop.contractType} />
                  <HomepageFeatureCard type={Split.contractType} />
                </SimpleGrid>
              </Stack>
            </Container>
          </Flex> */}

          {/* <WhatCanYouBuild /> */}

          <HomepageSection
            id="dashboard"
            title="Dedicated dashboard to control everything"
            isDark
          >
            <SimpleGrid flexDirection={{ base: "column", md: "row" }} gap={12}>
              <DashboardCard
                headingTitle="thirdweb teams"
                headingIcon={AiOutlineTeam}
                title={
                  <>
                    Deploy contracts with{" "}
                    <Heading
                      bgGradient="linear(to-l, #48BCA8, #A998FF)"
                      bgClip="text"
                      display="inline"
                      size="title.lg"
                    >
                      connected wallets or team
                    </Heading>
                  </>
                }
                subtitle="Team up to move your app forward, faster. Get everyone on the same page."
                rightImage={ThirdwebTeams}
              />
              <DashboardCard
                headingTitle="Contract manager"
                headingIcon={BsMenuButtonWide}
                title={
                  <>
                    <Heading
                      bgGradient="linear(to-l, #E483F4, #FAC588)"
                      bgClip="text"
                      display="inline"
                      size="title.lg"
                    >
                      View and manage
                    </Heading>{" "}
                    all your contracts
                  </>
                }
                subtitle="Team up to move your app forward, faster. Get everyone on the same page."
                rightImage={Contracts}
              />
              <DashboardCard
                headingTitle="thirdweb reports"
                headingIcon={MdOutlineAnalytics}
                title={
                  <>
                    <Heading
                      bgGradient="linear(to-l, #585EE9, #E487D0)"
                      bgClip="text"
                      display="inline"
                      size="title.lg"
                    >
                      Prebuilt reports
                    </Heading>{" "}
                    to learn about contracts usage
                  </>
                }
                subtitle="Team up to move your app forward, faster. Get everyone on the same page."
                rightImage={Analytics}
              />
            </SimpleGrid>
          </HomepageSection>

          {/*           <CodeExamples /> */}

          <HomepageSection
            id="networks"
            middleGradient="static"
            title="We are multi-chain"
            subtitle="thirdweb supports a multi-chain ecosystem of blockchains"
            isDark
          >
            <Box>
              <Text
                size="body.lg"
                textTransform="uppercase"
                fontWeight="700"
                color="gray.400"
              >
                Available now
              </Text>
              <SimpleGrid
                columns={{ base: 2, md: 4 }}
                spacing={{ base: 1, md: 4 }}
                mt={5}
                mb={12}
              >
                <SupportedChain type="ethereum" />
                <SupportedChain type="polygon" />
                <SupportedChain type="avalanche" />
                <SupportedChain type="fantom" />
              </SimpleGrid>

              <Text
                size="body.lg"
                textTransform="uppercase"
                fontWeight="700"
                color="gray.400"
              >
                Coming soon
              </Text>
              <Stack align="center">
                <SimpleGrid
                  columns={{ base: 2 }}
                  spacing={{ base: 1, md: 4 }}
                  mt={5}
                >
                  <SupportedChain type="solana" />
                  <SupportedChain type="flow" />
                </SimpleGrid>
              </Stack>
            </Box>
          </HomepageSection>

          {/*           <HomepageSection
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
          </HomepageSection> */}

          <HomepageSection
            id="fees"
            title="Always know what you'll pay. This time it's $0."
            leftAlignedTitle
            leftAlignedSubtitle
            isDark
            subtitle="In the future, we will introduce advanced features which you can
                decide to pay for. We'll always be clear and transparent
                with how much these features will cost."
            titleSm
            subtitleMd
            childrenOnRightSide
            middleGradient="static"
          >
            <Box
              border=".5px solid"
              borderColor="#FF63C8"
              p={12}
              borderRadius="lg"
              backgroundColor="#0000004d"
            >
              <Heading
                bgGradient="linear(to-r, #FFB8E6, #8689E3)"
                bgClip="text"
                size="display.lg"
                mb={6}
              >
                Free.
              </Heading>
              <List
                spacing={3}
                display="flex"
                flexDirection="column"
                alignItems="start"
                textAlign="left"
                color="gray.400"
                mb={16}
              >
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  We take zero fees on any smart contracts deployed
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  You keep 100% of the money you make
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Gain access to fresh features each month{" "}
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Only pay blockchain-specific gas fees
                </ListItem>
              </List>
              <GeneralCta
                title="Start building today"
                size="lg"
                py={8}
                w="100%"
              />
            </Box>
          </HomepageSection>

          <HomepageSection
            id="case-studies"
            title="See how game-changing companies are making the most of web3 with thirdweb."
            titleSm
            isDark
            bottomGradient="static"
          >
            <SimpleGrid
              flexDirection={{ base: "column", md: "row" }}
              gap={12}
              columns={{ base: 1, md: 2 }}
              w="full"
            >
              <CaseStudyCard
                title="100thieves"
                description="100Thieves launched an NFT to commemorate their historic 2021 LCS Championship win, with over 700k NFTs claimed."
              />
              <CaseStudyCard
                title="boohoo"
                description="boohoo launches their entry into web3 with boohooverse using thirdweb to make it easy for a non crypto-native audience."
              />
              <CaseStudyCard
                title="yestheory"
                description="Yes Theory created a tiered digital ticket NFT drop to crowdfund the biggest documentary ever made and released on YouTube."
              />
              <CaseStudyCard
                title="fnatic"
                description="Fnatic launched their free and paid digital membership program using thirdweb, with over 400k NFTs claimed on the free tier."
              />
            </SimpleGrid>
          </HomepageSection>

          {/* <HomepageFooter /> */}
        </Flex>
      </Track>
    </LightMode>
  );
};

export default Home;
