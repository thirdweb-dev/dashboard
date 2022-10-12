import { Box, DarkMode, Divider, Flex, Icon } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { ChakraNextImage } from "components/Image";
import { HackathonFooter } from "components/hackathon/solana/HackathonFooter";
import { Judges } from "components/hackathon/solana/Judges";
import { PrizeSection } from "components/hackathon/solana/PrizeSection";
import { ScheduleSection } from "components/hackathon/solana/ScheduleSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import dynamic from "next/dynamic";
import { Heading, LinkButton, Text } from "tw-components";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";

const Timer = dynamic(() => import("components/hackathon/solana/Timer"), {
  ssr: false,
});

const SolanaHackathon: ThirdwebNextPage = () => {
  const trackEvent = useTrack();
  return (
    <DarkMode>
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

        <HomepageSection id="header" topGradient>
          <Flex
            flexDir="column"
            align="center"
            gap={12}
            mt={{ base: 12, md: 24 }}
          >
            <ChakraNextImage
              src="/assets/hackathon/tw-solana.svg"
              alt="Solana Hackathon"
              width={300}
              height={30}
              w={{ base: "300px", md: "600px" }}
              objectFit="contain"
            />
            <Heading size="display.lg" textAlign="center">
              $10,000 in prizes.
              <br /> Hack it your way.
            </Heading>

            <Timer />

            <LinkButton
              href="https://thirdweb.typeform.com/to/zfrq8Jx0"
              onClick={() =>
                trackEvent({
                  category: "solana-hackathon",
                  action: "click",
                  label: "register-now",
                })
              }
              h="68px"
              w={{ base: "100%", md: 96 }}
              fontSize="20px"
              leftIcon={<Icon as={ImMagicWand} />}
              color="black"
              flexShrink={0}
              background="rgba(255,255,255,1)"
              _hover={{
                background: "rgba(255,255,255,0.9)!important",
              }}
              isExternal
              noIcon
            >
              Register now
            </LinkButton>
          </Flex>
        </HomepageSection>

        {/*           <Sponsors /> */}
        <Divider mt={16}  />
        <PrizeSection />

        <HomepageSection>
          <ScheduleSection />
        </HomepageSection>

        <HomepageSection mt={{base: 12, md: 24}}>
          <Flex flexDir="column" alignItems="center" gap={8}>
            <Heading size="title.2xl" textStyle="center">
              Guidelines
            </Heading>
            <Flex flexDir="column" gap={4}>
              <Text size="body.lg">
                To qualify for this hackathon, participants must use a thirdweb
                pre-built program or an existing program on Solana and interface
                with the thirdweb SDKs. Submissions must be submitted through
                GitHub with a descriptive ReadMe file detailing any information.
                The submission must be deployed to Solana mainnet or devnet in
                order to be eligible. Additionally, valid participants will be
                asked to provide their Github repo, a link to their thirdweb
                dashboard project, a written/video breakdown of the project and
                tech stack used published to a dev forum like stackoverflow,
                dev.to or youtube, depending on what format you choose.
              </Text>
              <Text size="body.lg">
                To submit, participants will link their decentralized app
                repository from GitHub in the submission form with the
                corresponding track(s) that they are competing for.
              </Text>
            </Flex>
          </Flex>
        </HomepageSection>
        {/*          <Resources /> */}
        <Box
          w="full"
          h={{base: "200px", md: "250px"}}
          background="linear-gradient(90deg, rgba(20, 253, 169, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
          filter="blur(100px)"
          transform="matrix(-1, 0, 0, 1, 0, 0)"
          mt="-150px"
        />
        <Judges />
        <HackathonFooter />
      </Flex>
    </DarkMode>
  );
};

SolanaHackathon.pageId = PageId.SolanaHackathonLanding;

export default SolanaHackathon;
