import { Flex, LinkBox, LinkOverlay, Stack, VStack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Card, Heading, Text } from "tw-components";

interface CommunityCardProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  image,
  link,
  title,
  description,
}) => {
  return (
    <Card
      maxW="80vw"
      mx={{
        base: "auto",
        md: "0",
      }}
      p={0}
    >
      <VStack
        bg="transparent"
        borderRadius="xl"
        _hover={{ textDecor: "none" }}
        as={LinkBox}
      >
        <Stack
          align="center"
          justify="center"
          w="full"
          bg="#181818"
          borderRadius="xl"
          h="11.5rem"
        >
          <ChakraNextImage
            alt={title}
            borderTopRadius="xl"
            boxSize="100%"
            objectFit="cover"
            src={image}
            width={90}
            height={90}
          />
        </Stack>

        <Flex
          w="full"
          p={4}
          gap={4}
          flexDir="column"
          as={LinkOverlay}
          href={link}
        >
          <Heading
            as="h3"
            size="title.sm"
            textAlign="left"
            fontWeight="semibold"
          >
            {title}
          </Heading>
          {description && <Text color="#949494">{description}</Text>}
        </Flex>
      </VStack>
    </Card>
  );
};
