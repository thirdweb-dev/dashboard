import { Heading, HStack, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const Logo: React.FC<{ noPadding?: boolean }> = ({ noPadding }) => {
  return (
    <LinkBox
      as={HStack}
      align="center"
      justify="center"
      flexDir="row"
      p={noPadding ? 0 : 6}
    >
      <Image maxH="30px" src="/logo.png"></Image>
      <Heading flexGrow={1} as="h1" size="sm" fontWeight={600}>
        <NextLink href="/" passHref>
          <LinkOverlay>Console</LinkOverlay>
        </NextLink>
      </Heading>
    </LinkBox>
  );
};
