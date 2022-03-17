import { Box, Button, Center, Heading, Link, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { AccountConnector } from "components/web3/AccountConnector";
import type { NextPage } from "next";
import NextLink from "next/link";
import React from "react";

const Home: NextPage = () => {
  const { account } = useEthers();

  return (
    <Box width="100%" height="100%" p={8}>
      <Center flexDir="column">
        <Heading size="md">Welcome to the NFTLabs Admin Console</Heading>
        <Box p={24}>
          <Center flexDir="column">
            {!account ? (
              <>
                <Text size="md" fontWeight="bold" p={4}>
                  To get started:
                </Text>
                <AccountConnector />
              </>
            ) : (
              <NextLink href="/dashboard" passHref>
                <Button
                  colorScheme="teal"
                  textDecoration="none!important"
                  as={Link}
                >
                  Go to dashboard
                </Button>
              </NextLink>
            )}
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default Home;
