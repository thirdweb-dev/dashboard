import { GameCard } from "./GameCard";
import { ProductSection } from "./ProductSection";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { Heading } from "tw-components";

const games = [
  {
    name: "3D Racer",
    description:
      "Purchase Vehicle NFTs from an in-game marketplace and start earning ERC20 tokens used to buy upgrades.",
    image: require("public/assets/solutions-pages/gaming/3d-racer.png"),
    href: "https://unity-karting-game.thirdweb-example.com/",
  },
  {
    name: "2D RPG",
    description:
      "Complete quests to earn in-game currency and buy NFTs from a marketplace that you can view in your inventory.",
    image: require("public/assets/solutions-pages/gaming/2d-rpg.png"),
    href: "https://unity-rpg-game.thirdweb-example.com/",
  },
  {
    name: "NFT Lootbox",
    description:
      "Purchase NFT loot boxes from a marketplace and open them to reveal randomly selected NFTs inside!",
    image: require("public/assets/solutions-pages/gaming/nft-lootbox.png"),
    href: "https://game3.com",
  },
];

export const GameShowcase = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <ProductSection>
      <Flex
        flexDir="column"
        py={{ base: 24, lg: 36 }}
        align="center"
        gap={{ base: 6, lg: 8 }}
      >
        <Heading as="h2" size="display.sm" fontWeight={700} textAlign="center">
          Get started with our templates
        </Heading>
        <Heading
          as="h3"
          maxW="820px"
          textAlign="center"
          color="whiteAlpha.600"
          size="subtitle.md"
        >
          Try out our prebuilt games and start building your own!
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {games.map((game) => (
            <GameCard
              key={game.name}
              game={game}
              setSelectedGame={setSelectedGame}
            />
          ))}
        </SimpleGrid>
        {selectedGame && (
          <Flex justifyContent="center">
            <iframe
              src={selectedGame}
              width={isMobile ? "100%" : "800px"}
              height="450px"
            />
          </Flex>
        )}
      </Flex>
    </ProductSection>
  );
};
