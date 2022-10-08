import { DarkMode, Flex } from "@chakra-ui/react";
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
        <Sponsors />
        <PrizeSection />
        <ScheduleSection />
        <Guidelines />
        <Resources />
        <Judges />
        <HackathonFooter />
      </Flex>
    </DarkMode>
  );
};

export default SolanaHackathon;
