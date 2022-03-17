import {
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { AccountConnector } from "components/web3/AccountConnector";
import { NetworkStatus } from "components/web3/NetworkStatus";
import NextLink from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <Container
      flexShrink={0}
      flexGrow={0}
      maxW="1440px"
      as={Flex}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <LinkBox
        as={HStack}
        py={4}
        alignSelf="center"
        justifyItems="center"
        flexDir="row"
      >
        <Image filter="invert(1)" maxH="30px" src="/logo.png"></Image>
        <Heading flexGrow={1} as="h1" size="sm" fontWeight={600}>
          <NextLink href="/" passHref>
            <LinkOverlay>Console</LinkOverlay>
          </NextLink>
        </Heading>
      </LinkBox>
      <HStack>
        <NetworkStatus />
        <AccountConnector />
      </HStack>
    </Container>
  );
};

export default Header;
