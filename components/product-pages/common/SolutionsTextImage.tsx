import { ProductSection } from "./ProductSection";
import { AspectRatio, Box, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Heading } from "tw-components";

interface SolutionsTextImageProps {
  image: string;
  title: string;
}

export const SolutionsTextImage: React.FC<SolutionsTextImageProps> = ({
  image,
  title,
}) => {
  return (
    <ProductSection>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 12, md: 12 }}
        alignItems="center"
        py={{ base: 12, md: 24 }}
      >
        <Box flex="1">
          <AspectRatio
            ratio={1}
            w="100%"
            maxW="600px"
            mx="auto"
            borderRadius="lg"
            overflow="hidden"
          >
            <ChakraNextImage src={image} objectFit="cover" alt="" />
          </AspectRatio>
        </Box>
        <Box flex="1">
          <Heading as="h2" size="display.sm" mb={4}>
            {title}
          </Heading>
        </Box>
      </Stack>
    </ProductSection>
  );
};
