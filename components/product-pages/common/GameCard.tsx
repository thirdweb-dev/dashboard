import { AspectRatio, Flex } from "@chakra-ui/react";
import NextImage, { StaticImageData } from "next/image";
import { IoGameControllerOutline } from "react-icons/io5";
import { Button, Card, Heading, Text } from "tw-components";

interface GameCardProps {
  game: {
    name: string;
    description: string;
    href: string;
    image: StaticImageData;
  };
  setSelectedGame: (game: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  setSelectedGame,
}) => {
  return (
    <Card p={0} as={Flex} overflow="hidden" gap={4} flexDir="column">
      <AspectRatio ratio={16 / 9} w="100%">
        <NextImage fill src={game.image} placeholder="blur" alt="" />
      </AspectRatio>
      <Flex direction="column" gap={2}>
        <Heading px={4} as="h3" size="title.sm">
          {game.name}
        </Heading>
        <Text px={4}>{game.description}</Text>
      </Flex>
      <Button
        leftIcon={<IoGameControllerOutline />}
        borderTopRadius="none"
        mt="auto"
        onClick={() => {
          setSelectedGame(game.href);
        }}
        color="white"
        colorScheme="blue"
      >
        Play Game
      </Button>
    </Card>
  );
};
