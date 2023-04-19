import { Flex, Icon, Image, VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Heading, Link } from "tw-components";

interface CommunityCardProps {
  image: string;
  link: string;
  title: string;
}

export const CommunityCard: FC<CommunityCardProps> = ({
  image,
  link,
  title,
}) => {
  return (
    <Link href={link} _hover={{ textDecor: "none" }}>
      <VStack
        bg="whiteAlpha.100"
        borderRadius="lg"
        boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1)"
        w="full"
      >
        <Image
          alt={title}
          borderTopRadius="lg"
          boxSize="100%"
          objectFit="cover"
          src={image}
        />
        <Flex w="full" justify="space-between" align="center" p={4}>
          <Heading
            as="h3"
            fontSize="20px"
            textAlign="center"
            fontWeight="semibold"
          >
            {title}
          </Heading>
          <Icon as={FiExternalLink} ml={1} boxSize={4} color="white" />
        </Flex>
      </VStack>
    </Link>
  );
};
