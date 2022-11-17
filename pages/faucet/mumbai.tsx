import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { CTA } from "components/faucet/CTA";
import { FaqSection } from "components/faucet/FAQSection";
import { FormComponent } from "components/faucet/mumbai/FormComponent";
import { MumbaiFAQ } from "data/faucet/mumbaiFAQ";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement, useState } from "react";
import { Heading } from "tw-components";

const MumbaiFaucet: ThirdwebNextPage = () => {
  const [transactionLink, setTransactionLink] = useState("");

  return (
    <>
      <NextSeo
        title="Polygon Testnet (Mumbai) Faucet | thirdweb"
        description="Get Matic Mumbai tokens for free—using our fast and reliable Mumbai Faucet for blockchain developers building web3 apps. Powered by thirdweb."
        openGraph={{
          title:
            "Get Matic devnet tokens for free—using our fast and reliable Mumbai Faucet for blockchain developers building web3 apps. Powered by thirdweb.",
          url: `https://thirdweb.com/faucet/mumbai`,
        }}
      />
      <Flex
        flexDir="column"
        maxW="900px"
        w="full"
        mx="auto"
        px={{ base: 0, md: 4 }}
      >
        <Heading as="h1">Mumbai Faucet</Heading>
        <Heading fontSize="20px" my="4" as="h2">
          Get Mumbai devnet tokens for free to build your blockchain app.
        </Heading>
        {!transactionLink ? (
          <FormComponent
            transactionLink={transactionLink}
            setTransactionLink={setTransactionLink}
          />
        ) : (
          <CTA transactionLink={transactionLink} />
        )}
        <FaqSection FAQs={MumbaiFAQ} />
      </Flex>
    </>
  );
};

MumbaiFaucet.getLayout = (page: ReactElement) => (
  <AppLayout ecosystem="evm">{page}</AppLayout>
);

MumbaiFaucet.pageId = PageId.MumbaiFaucet;

export default MumbaiFaucet;
