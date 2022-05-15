import { Box, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import * as React from "react";
import { Link, Text } from "tw-components";

interface CaseStudyCardProps {
  title: string;
  description: string;
  href: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  href,
}) => {
  const { trackEvent } = useTrack();
  return (
    <Link
      href={href}
      isExternal
      onClick={() =>
        trackEvent({
          category: "case-study",
          action: "click",
          label: title,
        })
      }
    >
      <Flex
        flexDir="column"
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        h={96}
        border="1px solid"
        borderColor={"borderColor"}
        _hover={{ borderColor: "primary.600" }}
      >
        <ChakraNextImage
          alt=""
          w="100%"
          h="100%"
          src={require(`/public/assets/case-studies/${title}.png`)}
          objectFit="cover"
          layout="fill"
        />
        <Box p={6} position="absolute" top="0" left="0">
          <ChakraNextImage
            alt=""
            w={title === "yestheory" ? 16 : 32}
            placeholder="empty"
            src={require(`/public/assets/case-studies/${title}-logo.png`)}
          />
        </Box>
        <Box
          backdropFilter="blur(30px)"
          p={6}
          borderBottomRadius="2xl"
          position="absolute"
          bottom="-1px"
          left="0"
          right="0"
        >
          <Text size="body.xl" color="white">
            {description}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
