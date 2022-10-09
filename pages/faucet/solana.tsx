import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { CTA } from "components/faucet/CTA";
import { FaqSection } from "components/faucet/FAQSection";
import { FormComponent } from "components/faucet/FormComponent";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { Heading } from "tw-components";

const SolanaFaucet: NextPage = () => {
  const [transactionLink, setTransactionLink] = useState("abc");

  return (
    <AppLayout>
      <NextSeo
        title="Solana (SOL) faucet | thirdweb"
        description="Get Solana devnet tokens for free"
        openGraph={{
          title: "Solana (SOL) faucet | thirdweb",
          url: `https://thirdweb.com/faucet/solana`,
        }}
      />
      <Flex flexDir="column" maxW="900px" w="full" mx="auto" px="4">
        <Heading color="#F2F2F7">Solana faucet</Heading>
        <Heading fontSize="20px" color="whiteAlpha.800" my="4">
          Get Solana devnet tokens for free
        </Heading>
        <FormComponent
          transactionLink={transactionLink}
          setTransactionLink={setTransactionLink}
        />
        <CTA transactionLink={transactionLink} />
        <FaqSection />
      </Flex>
    </AppLayout>
  );
};

export default SolanaFaucet;
