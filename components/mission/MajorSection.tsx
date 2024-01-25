import { Flex } from "@chakra-ui/react";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import React from "react";
import { Heading } from "tw-components";

const MajorSection = () => {
  return (
    <Flex
      w="full"
      flexDir={{ base: "column", xl: "row" }}
      alignItems={{ base: "center", xl: "flex-start" }}
      gap="60px"
    >
      <Heading
        size="title.2xl"
        fontWeight="semibold"
        flex="1"
        textAlign={{ base: "center", xl: "left" }}
      >
        However, there are two major obstacles to mass adoption.
      </Heading>
      <Flex maxW="2xl">
        <LandingGridSection desktopColumns={2}>
          <LandingIconSectionItem
            icon={require("public/assets/product-pages/mission/icon-key.svg")}
            title="Digital Asset Ownership"
            description="To build a web3 app, developers need to piece together 10+ different tools that don't natively talk to each other — creating a messy, fragmented DX that stifles innovation."
          />

          <LandingIconSectionItem
            icon={require("public/assets/product-pages/mission/icon-simple-click.svg")}
            title="User Experience"
            description="For new users to interact with the blockchain, they need to create a wallet, store their private keys, purchase & transfer crypto, pay gas fees, and sign every action they take on a dApp — creating a daunting onboarding process that stifles adoption."
          />
        </LandingGridSection>
      </Flex>
    </Flex>
  );
};

export default MajorSection;
