import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import CTA from "components/faucet/CTA";
import FormComponent from "components/faucet/FormComponent";
import { NextPage } from "next";
import { Heading, Text } from "tw-components";

const SolanaFaucet: NextPage = () => {
  return (
    <AppLayout>
      <Flex flexDir="column" maxW="900px" w="full">
        <Heading color="#F2F2F7">thirdweb faucet</Heading>
        <Text
          as="h2"
          color="whiteAlpha.800"
          fontSize="2xl"
          fontWeight="bold"
          mb="4"
        >
          Get testnet tokens for free
        </Text>
        <FormComponent />
        <CTA />
      </Flex>
    </AppLayout>
  );
};

export default SolanaFaucet;
