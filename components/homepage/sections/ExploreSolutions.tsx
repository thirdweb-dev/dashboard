import React, { Fragment, useState } from "react";
import AnimatedHoveredCard from "../AnimatedHoveredCard/AnimatedHoveredCard";
import { Container, Flex } from "@chakra-ui/react";

const sections = [
  {
    title: "Coinbase Brings Onchain Experiences to the Real World",
    description:
      "Onboard users with wallets, build & deploy smart contracts, accept fiat with payments, and scale apps.",
    initialImage: require("public/assets/landingpage/coinbase-vertical.png"),
    image: require("public/assets/landingpage/coinbase.png"),
  },
  {
    title: "Tally Builds DAO Platform for the Decentralized Web",
    description:
      "Onboard users with wallets, build & deploy smart contracts, accept fiat with payments, and scale apps.",
    initialImage: require("public/assets/landingpage/tally-vertical.png"),
    image: require("public/assets/landingpage/coinbase.png"),
  },
  {
    title:
      "Decent Launches Interactive NFT Mint — with Uniswap, Arbitrum, & Disco",
    description:
      "Onboard users with wallets, build & deploy smart contracts, accept fiat with payments, and scale apps.",
    initialImage: require("public/assets/landingpage/nft-vertical.png"),
    image: require("public/assets/landingpage/coinbase.png"),
  },
];

const ExploreSolutions = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  return (
    <Container
      position="relative"
      maxW={"container.page"}
      mt={20}
      mb={{ base: 12, md: 40 }}
      zIndex={10}
    >
      <Flex alignItems="stretch" gap={5}>
        {sections.map((section, idx) => {
          const lastIndex = sections.length - 1;
          const isLastIndexSelected = lastIndex === selectedIndex;

          // Determine if the current card should be hidden
          const isHidden =
            (isLastIndexSelected && idx === 0) ||
            (idx === selectedIndex + 1 && idx !== 0);

          return (
            <AnimatedHoveredCard
              isHidden={isHidden}
              key={idx}
              title={section.title}
              description={section.description}
              initalImage={section.initialImage}
              image={section.image}
              content={<Fragment>Hey</Fragment>}
              onMouseEnter={() => {
                if (selectedIndex === idx) {
                  return;
                }
                setSelectedIndex(idx);
              }}
              onMouseLeave={() => setSelectedIndex(-1)}
              isActive={idx === selectedIndex}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default ExploreSolutions;
