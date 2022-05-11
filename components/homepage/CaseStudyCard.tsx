import { Box, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import * as React from "react";
import { Text } from "tw-components";

interface CaseStudyCardProps {
  title: string;
  description: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
}) => {
  return (
    <Flex
      flexDir="column"
      borderRadius="2xl"
      border=".5px solid"
      borderColor="#ffffff26"
      bgImage={`url('/assets/case-studies/${title}.png')`}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      height={96}
      overflow="hidden"
    >
      <Flex flexDir="column" justifyContent="space-between" h="100%">
        <Box p={6}>
          <ChakraNextImage
            alt=""
            w={title === "yestheory" ? 16 : 32}
            maxW={title === "yestheory" ? 16 : 32}
            display={{ base: "none", md: "block" }}
            placeholder="empty"
            src={require(`/public/assets/case-studies/${title}-logo.png`)}
          />
        </Box>
        <Box backdropFilter="blur(30px)" p={6}>
          <Text size="body.xl" color="white">
            {description}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
