import { Flex, GridItem, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { Card, Text, TrackedLink } from "tw-components";
import { LandingDesktopMobileImage } from "./desktop-mobile-image";

interface LandingCardWithImageProps {
  title: string;
  description?: ReactNode;
  image: StaticImageData;
  mobileImage?: StaticImageData;
  direction?: "vertical" | "horizontal";
  colSpan?: number;
  href: string;
  TRACKING_CATEGORY: string;
}

export const LandingCardWithImage: React.FC<LandingCardWithImageProps> = ({
  title,
  description,
  image,
  mobileImage,
  direction = "vertical",
  colSpan = 2,
  href,
  TRACKING_CATEGORY,
}) => {
  return (
    <GridItem colSpan={{ base: 2, md: colSpan }} h="full" cursor="pointer">
      <LinkBox
        _hover={{
          opacity: 0.8,
        }}
        h="full"
      >
        <TrackedLink
          as={LinkOverlay}
          href={href}
          category={TRACKING_CATEGORY}
          label="cards-with-images"
          color="white"
          _hover={{
            textDecoration: "none",
          }}
          trackingProps={{
            title: title.toLowerCase().replaceAll(" ", "-"),
          }}
        >
          <Card
            as={Flex}
            gap={6}
            p={0}
            h="full"
            flexDir={{
              base: "column",
              md: direction === "vertical" ? "column" : "row",
            }}
            justifyContent="space-between"
          >
            <Flex gap={4} p={10} flexDir="column">
              <Text size="body.xl" color="white" fontWeight="bold">
                {title}
              </Text>
              {description && <Text size="body.lg">{description}</Text>}
            </Flex>
            <Flex flexDir="column">
              <LandingDesktopMobileImage
                image={image}
                mobileImage={mobileImage}
              />
            </Flex>
          </Card>
        </TrackedLink>
      </LinkBox>
    </GridItem>
  );
};
