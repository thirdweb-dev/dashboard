import { Box, Flex, LinkOverlay, VStack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Heading, Text } from "tw-components";

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
    <VStack
      bg="transparent"
      borderRadius="xl"
      w="full"
      border="1px solid"
      borderColor="borderColor"
      as={LinkOverlay}
      href={link}
      _hover={{ textDecor: "none" }}
    >
      {image ? (
        <ChakraNextImage
          alt={title}
          borderTopRadius="xl"
          boxSize="100%"
          objectFit="cover"
          src={image}
        />
      ) : (
        <Box
          borderTopRadius="xl"
          boxSize="100%"
          w="full"
          bg="linear-gradient(180deg, #893AA1 0%, #BFA3DA 100%)"
          h="180px"
        />
      )}

      <Flex w="full" p={4} gap={4} flexDir="column">
        <Heading as="h3" size="title.md" textAlign="left" fontWeight="semibold">
          {title}
        </Heading>
        {description && <Text color="#949494">{description}</Text>}
      </Flex>
    </VStack>
  );
};
