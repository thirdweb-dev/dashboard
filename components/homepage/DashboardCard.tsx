import { StaticGradient } from "./StaticGradient";
import Icon from "@chakra-ui/icon";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import * as React from "react";
import { IconType } from "react-icons";
import { Heading, Text } from "tw-components";

interface DashboardCardProps {
  headingTitle: string;
  headingIcon: IconType;
  title: string | JSX.Element;
  subtitle: string;
  rightImage: StaticImageData;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  headingTitle,
  headingIcon,
  title,
  subtitle,
  rightImage,
}) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="#ffffff26"
      overflow="hidden"
    >
      <Flex
        flexDir="column"
        justifyContent="space-between"
        p={{ base: 6, md: 10 }}
        height={{ base: "inherit", md: 80 }}
      >
        <Box>
          <Flex alignItems="center" mb={4} gap={1.5}>
            <Icon as={headingIcon} boxSize={4} />
            <Text size="label.sm" textTransform="uppercase">
              {headingTitle}
            </Text>
          </Flex>
          <Heading size="title.lg">{title}</Heading>
        </Box>
        <Text size="body.lg" mt={{ base: 4, md: 0 }}>
          {subtitle}
        </Text>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        position="relative"
        overflow="hidden"
        display={{ base: "none", md: "flex" }}
      >
        <StaticGradient
          zIndex={-1}
          position="absolute"
          top={0}
          left="50%"
          w="100%"
          opacity={1}
          transform="translate(-50%, -66%)"
        />
        <ChakraNextImage
          alt=""
          maxW={96}
          w={96}
          display={{ base: "none", md: "block" }}
          placeholder="empty"
          src={rightImage}
        />
      </Flex>
    </SimpleGrid>
  );
};
