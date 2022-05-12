import { AnimatedGradient } from "./AnimatedGradient";
import { StaticGradient } from "./StaticGradient";
import {
  AspectRatioProps,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import Union from "public/assets/landingpage/union.png";
import React, { useMemo } from "react";
import { Heading } from "tw-components";

type GradientType = "animated" | "static";

interface IHomepageSection {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  isDark?: true;
  bottomGradient?: GradientType;
  topGradient?: GradientType;
  middleGradient?: GradientType;
  id?: string;
  mainAction?: {
    MainActionButton: JSX.Element;
    forceBelow?: boolean;
  };
  leftAlignedTitle?: boolean;
  leftAlignedSubtitle?: boolean;
  childrenOnRightSide?: true;
  hero?: true;
  subtitleMd?: boolean;
  titleSm?: boolean;
  paddingBottom?: boolean;
  union?: true;
}

const gradientMap: Record<
  GradientType,
  React.ComponentType<Omit<AspectRatioProps, "ratio"> & { hero?: true }>
> = {
  animated: AnimatedGradient,
  static: StaticGradient,
};

export const HomepageSection: React.FC<IHomepageSection> = ({
  childrenOnRightSide,
  title,
  subtitle,
  isDark,
  children,
  bottomGradient,
  topGradient,
  middleGradient,
  id,
  mainAction,
  leftAlignedTitle,
  leftAlignedSubtitle,
  hero,
  subtitleMd,
  titleSm,
  paddingBottom,
  union,
}) => {
  const TopGradient = topGradient ? gradientMap[topGradient] : null;
  const BottomGradient = bottomGradient ? gradientMap[bottomGradient] : null;
  const MiddleGradient = middleGradient ? gradientMap[middleGradient] : null;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const MainActionButton = useMemo(() => {
    return mainAction && mainAction.MainActionButton;
  }, [mainAction]);

  return (
    <Box
      w="100%"
      position="relative"
      as="section"
      id={id}
      pb={paddingBottom ? [40, 40, 80] : [20]}
    >
      <Container
        zIndex={2}
        position="relative"
        maxW="container.page"
        py={48}
        pt={hero ? 48 : "inherit"}
      >
        {TopGradient && (
          <TopGradient
            zIndex={-1}
            position="absolute"
            top={0}
            left="50%"
            w="100%"
            transform="translate(-50%, -66%)"
            hero={hero}
          />
        )}

        {MiddleGradient && (
          <MiddleGradient
            zIndex={-1}
            position="absolute"
            bottom="50%"
            left="50%"
            w="100%"
            transform={`translate(-50%, ${hero ? "33%" : "66%"})`}
            hero={hero}
          />
        )}
        <SimpleGrid
          columns={[1, 1, childrenOnRightSide ? 2 : 1]}
          spacing={[6, 6, 12]}
        >
          <Stack
            spacing={[6, 6, 8]}
            align={childrenOnRightSide ? "flex-start" : "center"}
            justifyContent="center"
          >
            <Flex align="flex-end" justify="space-between" w="100%">
              <Container maxW="container.lg" px={0}>
                <Heading
                  as="h2"
                  w={[
                    "100%",
                    "100%",
                    MainActionButton && !childrenOnRightSide ? "50%" : "100%",
                  ]}
                  color={isDark ? "gray.50" : "#262A36"}
                  textAlign={
                    (MainActionButton && !isMobile) || leftAlignedTitle
                      ? "left"
                      : "center"
                  }
                  size={
                    hero ? "display.lg" : titleSm ? "display.sm" : "display.md"
                  }
                >
                  {title}
                </Heading>
              </Container>
              {isMobile || mainAction?.forceBelow ? null : MainActionButton}
            </Flex>
            {subtitle && (
              <Container maxW="container.lg" px={0}>
                <Heading
                  as="h3"
                  textAlign={
                    (MainActionButton || leftAlignedSubtitle) && !isMobile
                      ? "left"
                      : "center"
                  }
                  color={
                    isDark
                      ? "rgba(242, 251, 255, 0.8)"
                      : "rgba(39, 46, 54, 0.9)"
                  }
                  size={subtitleMd ? "subtitle.md" : "subtitle.lg"}
                >
                  {subtitle}
                </Heading>
              </Container>
            )}
            {childrenOnRightSide ? null : children}
            {isMobile || mainAction?.forceBelow ? MainActionButton : null}
          </Stack>
          {childrenOnRightSide ? children : null}
        </SimpleGrid>

        {BottomGradient && (
          <BottomGradient
            zIndex={-1}
            position="absolute"
            bottom={0}
            left="50%"
            w="100%"
            transform={`translate(-50%, ${hero ? "33%" : "66%"})`}
            hero={hero}
          />
        )}
      </Container>
      <Box
        zIndex={1}
        bg={isDark ? "backgroundDark" : "transparent"}
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        mixBlendMode="multiply"
      />
      {union && (
        <Box position="relative" bottom={24} left="0" right="0" zIndex="10">
          <ChakraNextImage alt="" w="100%" placeholder="empty" src={Union} />
        </Box>
      )}
    </Box>
  );
};
