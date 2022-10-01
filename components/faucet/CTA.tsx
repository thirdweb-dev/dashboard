import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import type { FC } from "react";
import { Button, Text } from "tw-components";

export const CTA: React.FC = () => {
  return (
    <Flex
      bg="url(/assets/faucet/cta-bg.png) no-repeat center"
      bgSize="cover"
      flexDir="column"
      gap="6"
      h="226px"
      justify="center"
      mt="10"
      px="10"
      rounded="lg"
      w="full"
    >
      <Text color="white" fontSize="28px" fontWeight="bold" maxW="450px">
        Now that you have testnet funds, build your web3 app
      </Text>
      <Flex gap="4">
        <Link href="/dashboard" passHref>
          <Button
            _hover={{
              bg: "rgba(255, 255, 255, 0.8)",
            }}
            bg="white"
            textColor="black"
            px="6"
          >
            Start Building
          </Button>
        </Link>
        <Link href="https://portal.thirdweb.com" passHref>
          <Button
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            px="6"
          >
            View docs
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
export default CTA;
