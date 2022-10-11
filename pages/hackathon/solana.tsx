import { Box, DarkMode, Flex, Icon } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { ChakraNextImage } from "components/Image";
import { Guidelines } from "components/hackathon/solana/Guidelines";
import { HackathonFooter } from "components/hackathon/solana/HackathonFooter";
import { Hero } from "components/hackathon/solana/Hero";
import { Judges } from "components/hackathon/solana/Judges";
import { PrizeSection } from "components/hackathon/solana/PrizeSection";
import { Resources } from "components/hackathon/solana/Resources";
import { ScheduleSection } from "components/hackathon/solana/ScheduleSection";
import { Sponsors } from "components/hackathon/solana/Sponsors";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { GeneralCta } from "components/shared/GeneralCta";
import { useTrack } from "hooks/analytics/useTrack";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Heading, LinkButton } from "tw-components";

const Timer = dynamic(() => import("components/hackathon/solana/Timer"), {
  ssr: false,
});

const SolanaHackathon: NextPage = () => {
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
        bg="#030A1A"
      >
        <HomepageTopNav />

        <HomepageSection id="header">
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
            <Heading fontSize={{ base: "40px", md: "72px" }}>
              $10,000 in prizes.
              <br /> Hack it your way.
            </Heading>

            <Timer />

            <LinkButton
              href="/dashboard"
              onClick={() =>
                trackEvent({
                  category: "solana-faucet",
                  action: "click",
                  label: "start",
                  title: "Start building",
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
            >
              Register now
            </LinkButton>
          </Flex>
        </HomepageSection>
        {/*         <Flex
          flexDir="column"
          w="full"
          align="center"
          bg='url("/assets/hackathon/mid-section-bg.svg") no-repeat center'
          py={10}
        >
          <Sponsors />
          <PrizeSection />
          <ScheduleSection />
        </Flex>
        <Guidelines />
        <Resources />
        <Box
          w="full"
          h="250px"
          background="linear-gradient(90deg, rgba(20, 253, 169, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
          filter="blur(100px)"
          transform="matrix(-1, 0, 0, 1, 0, 0)"
          mt="-100px"
        />
        <Judges />
        <HackathonFooter /> */}
      </Flex>
    </DarkMode>
  );
};

export default SolanaHackathon;
