import { Box, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { Heading, LinkButton, Text } from "tw-components";

interface ProductLearnMoreCardProps {
  icon: StaticImageData;
  title: string;
  description: string;
  href: string;
}

export const ProductLearnMoreCard: React.FC<ProductLearnMoreCardProps> = ({
  title,
  icon,
  description,
  href,
}) => {
  return (
    <Flex direction="column" justifyContent="space-between">
      <Flex direction="column">
        <Flex alignItems="center" gap={2}>
          <ChakraNextImage src={icon} placeholder="empty" alt="" w={8} />
          <Heading size="title.sm" as="h3">
            {title}
          </Heading>
        </Flex>
        <Text size="body.lg" mt="16px">
          {description}
        </Text>
      </Flex>
      <Box>
        <LinkButton href={href} isExternal color="white" mt={6}>
          Learn more
        </LinkButton>
      </Box>
    </Flex>
  );
};
