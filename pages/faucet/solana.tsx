import { Box, Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { CTA } from "components/faucet/CTA";
import { FaqSection } from "components/faucet/FAQSection";
import { FormComponent } from "components/faucet/FormComponent";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { Heading } from "tw-components";

const SolanaFaucet: NextPage = () => {
  const [transactionLink, setTransactionLink] = useState("");

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
      <Flex
        flexDir="column"
        maxW="900px"
        w="full"
        mx="auto"
        px={{ base: 0, md: 4 }}
      >
        <Heading color="#F2F2F7">Solana faucet</Heading>
        <Heading fontSize="20px" color="whiteAlpha.800" my="4">
          Get Solana devnet tokens for free
        </Heading>
        <FormComponent
          transactionLink={transactionLink}
          setTransactionLink={setTransactionLink}
        />
        {transactionLink && <CTA transactionLink={transactionLink} />}
        <Box h={transactionLink ? 20 : 10} />
        <FaqSection />
      </Flex>
    </AppLayout>
  );
};

export default SolanaFaucet;
