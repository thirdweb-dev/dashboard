import { Flex } from "@chakra-ui/react";
import React from "react";
import { Heading, HeadingProps } from "tw-components";

type LayoutProps = {
  title: string;
  titleGradient: HeadingProps["bgGradient"];
  headline: string;
  description: string;
  children: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = ({
  title,
  titleGradient,
  headline,
  description,
  children,
}) => {
  return (
    <Flex my={144} direction="column" align="center" w="full">
      <Flex maxW={480} direction="column" gap={2} textAlign="center">
        <Heading
          as="h1"
          size="label.xl"
          bgGradient={titleGradient}
          bgClip="text"
        >
          {title}
        </Heading>
        <Heading as="h2" size="title.2xl" color="white">
          {headline}
        </Heading>
        <Heading
          py={8}
          mb={4}
          as="h3"
          size="subtitle.sm"
          color="whiteAlpha.700"
        >
          {description}
        </Heading>
      </Flex>
      {children}
    </Flex>
  );
};
