import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import CTA from "components/faucet/CTA";
import FormComponent from "components/faucet/FormComponent";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Heading, Text } from "tw-components";

const SolanaFaucet: NextPage = () => {
  return (
    <AppLayout>
      <NextSeo
        title="Solana faucet"
        description="Get Solana devnet tokens for free"
        openGraph={{
          title: "Solana faucet | thirdweb",
          url: `https://thirdweb.com/faucet/solana`,
        }}
      />
      <Flex flexDir="column" maxW="900px" w="full">
        <Heading color="#F2F2F7">Solana faucet</Heading>
        <Text
          as="h2"
          color="whiteAlpha.800"
          fontSize="2xl"
          fontWeight="bold"
          mb="4"
        >
          Get Solana devnet tokens for free
        </Text>
        <FormComponent />
        <CTA />
      </Flex>
    </AppLayout>
  );
};

export default SolanaFaucet;
