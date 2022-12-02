import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Button, Card, Heading, Text } from "tw-components";

interface GameCardProps {
  game: { name: string; description: string; href: string; image: string };
  setSelectedGame: (game: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  setSelectedGame,
}) => {
  return (
    <Card p={4} as={Flex} gap={4} flexDir="column">
      <ChakraNextImage src={game.image} alt="" />
      <Heading as="h3" size="title.sm">
        {game.name}
      </Heading>
      <Text>{game.description}</Text>
      <Button
        onClick={() => {
          setSelectedGame(game.href);
        }}
        color="white"
      >
        Play Game
      </Button>
    </Card>
  );
};
