import { Box, DarkMode, Flex } from "@chakra-ui/react";
import { Guidelines } from "components/hackathon/solana/Guidelines";
import { HackathonFooter } from "components/hackathon/solana/HackathonFooter";
import { Hero } from "components/hackathon/solana/Hero";
import { Judges } from "components/hackathon/solana/Judges";
import { PrizeSection } from "components/hackathon/solana/PrizeSection";
import { Resources } from "components/hackathon/solana/Resources";
import { ScheduleSection } from "components/hackathon/solana/ScheduleSection";
import { Sponsors } from "components/hackathon/solana/Sponsors";
import { NextPage } from "next";

const SolanaHackathon: NextPage = () => {
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
        <Hero />
        <Flex
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
        <HackathonFooter />
      </Flex>
    </DarkMode>
  );
};

export default SolanaHackathon;
