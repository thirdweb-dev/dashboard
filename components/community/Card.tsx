import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { Heading, Link, Text } from "tw-components";

interface CommunityCardProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

export const CommunityCard: FC<CommunityCardProps> = ({
  image,
  link,
  title,
  description,
}) => {
  return (
    <Link href={link} _hover={{ textDecor: "none" }}>
      <VStack bg="transparent" borderRadius="xl" w="full" border="1px solid">
        {image ? (
          <Image
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
          <Heading
            as="h3"
            fontSize="22px"
            textAlign="left"
            fontWeight="semibold"
          >
            {title}
          </Heading>
          <Text color="#949494">{description}</Text>
        </Flex>
      </VStack>
    </Link>
  );
};
