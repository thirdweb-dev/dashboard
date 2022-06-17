import {
  AspectRatio,
  Box,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage, ChakraNextImageProps } from "components/Image";
import NextLink from "next/link";
import { Badge, Card, CardProps, Heading, Text } from "tw-components";

interface LinkCardProps extends CardProps {
  href: string;
  src: ChakraNextImageProps["src"];
  alt: string;
  title: string;
  subtitle?: string;
  largeIcon?: boolean;
  comingSoon?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  href,
  src,
  alt,
  title,
  subtitle,
  largeIcon,
  comingSoon,
  ...restCardProps
}) => {
  return (
    <Card
      position="relative"
      as={LinkBox}
      {...restCardProps}
      {...(comingSoon
        ? {
            cursor: "not-allowed",
          }
        : {
            _hover: {
              borderColor: "blue.500",
            },
          })}
    >
      <Stack
        spacing={3}
        {...(comingSoon
          ? {
              filter: "grayscale(80%)",
              pointerEvents: "none",
            }
          : {})}
      >
        <AspectRatio ratio={1} w={largeIcon ? "100px" : "30px"}>
          <Box>
            <ChakraNextImage src={src} alt={alt} w="100%" />
          </Box>
        </AspectRatio>
        <Stack spacing={1}>
          <NextLink href={href} passHref>
            <LinkOverlay>
              <Heading size="title.sm" as="h3">
                {title}
              </Heading>
            </LinkOverlay>
          </NextLink>
          {subtitle && <Text size="body.md">{subtitle}</Text>}
        </Stack>
      </Stack>
      {comingSoon && (
        <Box position="absolute" top={0} right={0} p={1}>
          <Badge colorScheme="yellow" variant="solid">
            Coming soon
          </Badge>
        </Box>
      )}
    </Card>
  );
};
