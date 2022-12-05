import { Box, Center, Flex } from "@chakra-ui/react";
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
    <Card
      bg="rgba(0,0,0,.5)"
      boxShadow="lg"
      _hover={{ boxShadow: "dark-lg" }}
      transition="box-shadow .2s ease-in-out"
      borderWidth="0px"
      p={0}
      as={Flex}
      overflow="hidden"
      gap={4}
      flexDir="column"
      role="group"
      cursor="pointer"
      onClick={() => {
        setSelectedGame(game.href);
      }}
    >
      <Box position="relative">
        <NextImage
          src={game.image}
          placeholder="blur"
          alt=""
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <Center position="absolute" top={0} bottom={0} left={0} right={0}>
          <Button
            leftIcon={<IoGameControllerOutline />}
            color="white"
            // variant="outline"
            bg="rgba(0,0,0,.5)"
            _groupHover={{ bg: "rgba(0,0,0,.9)" }}
            transition="background .2s ease-in-out"
          >
            Play Game
          </Button>
        </Center>
      </Box>

      <Flex direction="column" gap={2} pb={4}>
        <Heading px={4} as="h3" size="title.sm">
          {game.name}
        </Heading>
        <Text px={4}>{game.description}</Text>
      </Flex>
    </Card>
  );
};
