import { LinkBox, Flex, BoxProps } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import { StaticImageData } from "next/image";
import { Card, Text } from "tw-components";

interface PlaygroundMenuProps extends BoxProps {
  title: string;
  description: string;
  label: string;
  isSelected: boolean;
  image: StaticImageData;
  TRACKING_CATEGORY: string;
}

export const PlaygroundMenu: React.FC<PlaygroundMenuProps> = ({
  title,
  description,
  image,
  label,
  isSelected,
  TRACKING_CATEGORY,
  ...rest
}) => {
  const trackEvent = useTrack();
  return (
    <LinkBox
      onClick={() => {
        trackEvent({
          category: TRACKING_CATEGORY,
          action: "click",
          label,
        });
      }}
      height="full"
    >
      <Card
        p="26px 20px"
        overflow="hidden"
        bgColor="backgroundCardHighlight"
        borderWidth={1}
        borderColor={isSelected ? "#3385FF" : "borderColor"}
        transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
        _hover={{
          borderColor: "#3385FF",
          boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
          transform: "scale(1.01)",
        }}
        cursor="pointer"
        height="full"
        {...rest}
      >
        <Flex flexDir="column">
          <Flex gap={2} alignItems="center">
            <ChakraNextImage alt="" boxSize={6} src={image} />
            <Text
              fontSize={{ base: "18px", md: "22px" }}
              ml="11px"
              my={0}
              fontWeight={600}
              color="#fff"
            >
              {title}
            </Text>
          </Flex>
          <Text mt={3} color="#fff" fontSize="14px" opacity={0.7}>
            {description}
          </Text>
        </Flex>
      </Card>
    </LinkBox>
  );
};
