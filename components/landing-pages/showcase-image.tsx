import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { Heading, Text } from "tw-components";

interface LandingShowcaseImageProps {
  miniTitle?: string;
  title: string;
  titleWithGradient?: string;
  gradient?: string;
  description: string;
  image: StaticImageData;
  imagePosition?: "left" | "right";
}

export const LandingShowcaseImage: React.FC<LandingShowcaseImageProps> = ({
  miniTitle,
  title,
  titleWithGradient,
  gradient,
  description,
  image,
  imagePosition = "right",
}) => {
  return (
    <SimpleGrid columns={12} gap={12}>
      <GridItem
        colSpan={{ base: 12, md: 6 }}
        order={imagePosition === "left" ? 2 : 1}
      >
        <Flex flexDir="column" justifyContent="center">
          {miniTitle && (
            <Heading
              size="subtitle.sm"
              as="span"
              bgGradient={gradient}
              bgClip="text"
            >
              {miniTitle}
            </Heading>
          )}
          <Heading pb={4} size="display.sm">
            <Box as="span" bgGradient={gradient} bgClip="text">
              {titleWithGradient}{" "}
            </Box>
            {title}
          </Heading>
          {description && <Text size="body.lg">{description}</Text>}
        </Flex>
      </GridItem>
      <GridItem
        colSpan={{ base: 12, md: 6 }}
        order={imagePosition === "left" ? 1 : 2}
      >
        <ChakraNextImage src={image} width="full" alt="" borderRadius="xl" />
      </GridItem>
    </SimpleGrid>
  );
};
