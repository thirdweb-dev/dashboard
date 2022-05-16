import { ConsolePage } from "./_app";
import {
  Box,
  Center,
  DarkMode,
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
import { CodeSelector } from "components/homepage/CodeSelector";
import { ContractCard } from "components/homepage/ContractCard";
import { DashboardCard } from "components/homepage/DashboardCard";
import { HomepageFooter } from "components/homepage/Footer";
import { Partner } from "components/homepage/Partner";
import { HomepageSection } from "components/homepage/Section";
import { SupportedChain } from "components/homepage/SupportedChain";
import { HomepageTopNav } from "components/homepage/Topnav";
import { GeneralCta } from "components/shared/GeneralCta";
import { useTrack } from "hooks/analytics/useTrack";
// images
import Analytics from "public/assets/landingpage/analytics.png";
import Contracts from "public/assets/landingpage/contracts.png";
import Hero from "public/assets/landingpage/hero.png";
import ListImage from "public/assets/landingpage/list.png";
import Statistics from "public/assets/landingpage/statistics.png";
import ThirdwebTeams from "public/assets/landingpage/thirdweb-teams.png";
import WhiteLogo from "public/assets/landingpage/white-logo.png";
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
    <DarkMode>
      <Track>
        <Flex
          sx={{
            // overwrite the theme colors because the home page is *always* in "dark mode"
            "--chakra-colors-heading": "#F2F2F7",
            "--chakra-colors-paragraph": "#AEAEB2",
            "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
          }}
          justify="center"
          flexDir="column"
          as="main"
          bg="#000"
        >
          <HomepageTopNav />
          <HomepageSection id="home" topGradient union>
            <SimpleGrid
              pb={{ base: 12, md: 24 }}
              pt={{
                base: 24,
                md: 48,
              }}
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 6, md: 8 }}
            >
              <Flex
                flexDir="column"
                gap={{ base: 6, md: 8 }}
                align={{ base: "center", md: "start" }}
              >
                <Heading as="h2" size="display.md">
                  Build web3 apps, easily.
                </Heading>
                <Heading
                  as="h3"
                  size="subtitle.lg"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Smart contracts you control. Tools that accelerate your
                  workflow. Intuitive SDKs and embeds for developers.
                </Heading>
                <LightMode>
                  <GeneralCta size="lg" subtitle="It's free!" />
                </LightMode>
              </Flex>
              <Flex justify={{ base: "center", md: "end" }}>
                <ChakraNextImage alt="" maxW={96} w={96} mt={8} src={Hero} />
              </Flex>
            </SimpleGrid>
          </HomepageSection>

          <HomepageSection id="contracts" middleGradient>
            <Flex
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              py={{ base: 12, md: 24 }}
            >
              <Heading size="display.sm" as="h2" textAlign="center">
                Get started with{" "}
                <Heading
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                  bgClip="text"
                  fontSize="inherit"
                >
                  pre-built contracts.
                </Heading>
              </Heading>
              <SimpleGrid
                border="1px solid"
                borderColor="#4953AF"
                p={{ base: 8, md: 14 }}
                borderRadius="lg"
                backgroundColor="#0000004d"
                flexDir="column"
                justifyContent="space-between"
                w="100%"
                columns={{ base: 1, md: 3 }}
                gap={6}
              >
                <Stack justifyContent="center">
                  <Text size="label.sm" textTransform="uppercase">
                    BRING YOUR OWN CONTRACT
                  </Text>
                  <Heading size="title.2xl">thirdweb deploy</Heading>
                </Stack>
                <Stack spacing={4}>
                  <ChakraNextImage src={ListImage} alt="" w={10} />
                  <Heading size="title.sm">Manage and deploy contracts</Heading>
                  <Text size="body.lg">
                    From the dashboard without dealing with proper private keys.
                  </Text>
                </Stack>
                <Stack spacing={4}>
                  <ChakraNextImage src={Statistics} alt="" w={10} />
                  <Heading size="title.sm">Easily import key features</Heading>
                  <Text size="body.lg">
                    NFT royalties, claim conditions, platform fees, delayed
                    reveal & more.
                  </Text>
                </Stack>
              </SimpleGrid>
              <SimpleGrid
                columns={{ base: 1, md: 4 }}
                spacing={{ base: 5, md: 4 }}
                mt={5}
                mb={12}
              >
                <ContractCard type="nft" />
                <ContractCard type="drop" />
                <ContractCard type="marketplace" />
                <ContractCard type="governance" />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="developers" union middleGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.sm">
                Powerful SDKs. Easy integrations.
              </Heading>
              <Heading as="h3" size="subtitle.lg">
                Intuitive SDK for websites, mobiles, backend servers, games,
                etc.
              </Heading>
              <CodeSelector />
            </Flex>
          </HomepageSection>

          <HomepageSection id="features" bottomGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.sm" textAlign="center">
                Dedicated dashboard to
                <br />
                <Heading
                  as="span"
                  bgGradient="linear(to-r, #E483F4, #FAC588)"
                  bgClip="text"
                  fontSize="inherit"
                >
                  control everything
                </Heading>
                .
              </Heading>
              <SimpleGrid
                flexDirection={{ base: "column", md: "row" }}
                gap={12}
              >
                <DashboardCard
                  headingTitle="thirdweb teams"
                  headingIcon={AiOutlineTeam}
                  title={
                    <>
                      Deploy contracts with{" "}
                      <Heading
                        as="span"
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
                  gradientBGs={{
                    topGradient:
                      "linear-gradient(135.89deg, #E21E12 17.67%, #00FFE0 59.03%)",
                    bottomGradient: "#C512E2",
                  }}
                />
                <DashboardCard
                  headingTitle="Contract manager"
                  headingIcon={BsMenuButtonWide}
                  title={
                    <>
                      <Heading
                        as="span"
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
                  gradientBGs={{
                    rightGradient: "#E28F12",
                    leftGradient: "#C512E2",
                  }}
                />
                <DashboardCard
                  headingTitle="thirdweb reports"
                  headingIcon={MdOutlineAnalytics}
                  title={
                    <>
                      <Heading
                        as="span"
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
                  gradientBGs={{
                    rightGradient: "#C512E2",
                    bottomGradient: "#00FFE0",
                  }}
                />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="networks">
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.sm" textAlign="center">
                We are multi-chain
              </Heading>
              <Heading size="subtitle.lg" as="h3">
                thirdweb supports a multi-chain ecosystem of blockchains
              </Heading>
              <Box w="full">
                <Text size="label.lg" textTransform="uppercase">
                  Available now
                </Text>
                <SimpleGrid
                  columns={{ base: 2, md: 4 }}
                  spacing={4}
                  mt={5}
                  mb={12}
                >
                  <SupportedChain type="ethereum" />
                  <SupportedChain type="polygon" />
                  <SupportedChain type="avalanche" />
                  <SupportedChain type="fantom" />
                </SimpleGrid>

                <Text size="label.lg" textTransform="uppercase">
                  Coming soon
                </Text>

                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={5}>
                  <SupportedChain type="solana" />
                  <SupportedChain type="flow" />
                </SimpleGrid>
              </Box>
            </Flex>
          </HomepageSection>

          <HomepageSection id="fees" middleGradient>
            <SimpleGrid
              py={{ base: 12, md: 24 }}
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 6, md: 8 }}
            >
              <Flex gap={{ base: 6, md: 8 }} flexDir="column">
                <Heading size="display.sm">
                  Always know what you&apos;ll pay.
                  <br />
                  This time it&apos;s $0.
                </Heading>
                <Text size="body.xl" fontStyle="italic">
                  We may introduce advanced features which you can decide to pay
                  for in the future. We will always be transparent and clear
                  about any paid features up-front.
                </Text>
              </Flex>
              <Box
                border=".5px solid"
                borderColor="#4953AF"
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
                <LightMode>
                  <GeneralCta
                    title="Start building today"
                    size="lg"
                    py={8}
                    w="100%"
                  />
                </LightMode>
              </Box>
            </SimpleGrid>
          </HomepageSection>

          <HomepageSection id="partners" middleGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.md" textAlign="center">
                <Heading
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                  bgClip="text"
                  fontSize="inherit"
                >
                  37,000 builders.
                </Heading>
                100k+ contracts deployed.
              </Heading>

              <SimpleGrid
                w="full"
                columns={{ base: 2, md: 4 }}
                spacing={4}
                mt={5}
                mb={12}
              >
                <Partner type="paper" />
                <Partner type="whop" />
                <Partner type="filta" />
                <Partner type="daocentral" />
                <Partner type="presearch" />
                <Partner type="citydao" />
                <Partner type="paper" />
                <Partner type="whop" />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="case-studies">
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading
                maxW="container.lg"
                as="h2"
                size="display.sm"
                textAlign="center"
              >
                Success stories
              </Heading>
              <Heading size="subtitle.lg" as="h3">
                See how game-changing companies are making the most of web3 with
                thirdweb.
              </Heading>
              <SimpleGrid
                flexDirection={{ base: "column", md: "row" }}
                gap={12}
                columns={{ base: 1, md: 2 }}
                w="full"
              >
                <CaseStudyCard
                  title="100thieves"
                  description="100Thieves launched an NFT to commemorate their historic 2021 LCS Championship win, with over 700k NFTs claimed."
                  href="https://twitter.com/thirdweb_/status/1488987923978588160"
                />
                <CaseStudyCard
                  title="boohoo"
                  description="boohoo launches their entry into web3 with boohooverse using thirdweb to make it easy for a non crypto-native audience."
                  href="https://twitter.com/thirdweb_/status/1518591454326702081"
                />
                <CaseStudyCard
                  title="yestheory"
                  description="Yes Theory created a tiered digital ticket NFT drop to crowdfund the biggest documentary ever made and released on YouTube."
                  href="https://twitter.com/thirdweb_/status/1516460620798963713"
                />
                <CaseStudyCard
                  title="fnatic"
                  description="Fnatic launched their free and paid digital membership program using thirdweb, with over 400k NFTs claimed on the free tier."
                  href="https://twitter.com/thirdweb_/status/1509180723978252303"
                />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="get-started" bottomGradient union>
            <Flex
              flexDir="column"
              pt={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Center mb={6} pt={24}>
                <Center p={2} position="relative" mb={6}>
                  <Box
                    position="absolute"
                    bgGradient="linear(to-r, #F213A4, #040BBF)"
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    borderRadius="3xl"
                    overflow="visible"
                    filter="blur(15px)"
                  />

                  <ChakraNextImage
                    alt=""
                    w={20}
                    placeholder="empty"
                    src={WhiteLogo}
                  />
                </Center>
              </Center>
              <Heading as="h2" size="display.sm">
                Get started with thirdweb
              </Heading>
              <Heading
                as="h3"
                maxW="600px"
                textAlign="center"
                size="subtitle.lg"
              >
                thirdweb helps you build web3 apps with ease. Explore our tools
                and build something magical.
              </Heading>
              <LightMode>
                <GeneralCta
                  title="Start building for free"
                  size="lg"
                  py={8}
                  px={14}
                />
              </LightMode>
            </Flex>
          </HomepageSection>

          <HomepageFooter />
        </Flex>
      </Track>
    </DarkMode>
  );
};

export default Home;
