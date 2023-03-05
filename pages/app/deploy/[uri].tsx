import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { AppDeployTable } from "components/contract-components/tables/app-deploy";
import { NoWallet } from "components/no-wallet";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Button, Card, CodeBlock, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DeployAppUri: ThirdwebNextPage = () => {
  const router = useRouter();
  const address = useAddress();
  const allContractList = useAllContractList(address);
  const [ipfsHash, setIpfsHash] = useState("");

  useEffect(() => {
    if (ipfsHash) {
      return;
    }
    const { uri } = router.query;
    if (!uri) {
      return;
    }
    const hash = `ipfs://${uri}`;
    setIpfsHash(hash);
  }, [router.query, ipfsHash]);

  return (
    <ClientOnly ssr={null}>
      <Flex flexDir="column" gap={4}>
        <Flex justifyContent="space-between">
          <Heading size="title.lg">Your app is deploy!</Heading>
        </Flex>
        <Card p={4}>
          <Text size="body.lg">
            Your app is now deployed to IPFS and ready to be used.
            <CodeBlock mt={2} code={ipfsHash} language={"json"}></CodeBlock>
          </Text>
          <Flex width="100%" flexDir="row" justifyContent="flex-end">
            <Button mt={2} variant="outline" rightIcon={<FiExternalLink />}>
              Preview
            </Button>
          </Flex>
        </Card>
        {address ? (
          <Card>
            <Text mb={2} pb={2} size="body.lg">
              Select the contract below to connect with your app
            </Text>
            <AppDeployTable combinedList={allContractList.data} />
          </Card>
        ) : (
          <NoWallet ecosystem="evm" />
        )}
      </Flex>
    </ClientOnly>
  );
};

DeployAppUri.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DeployAppUri.pageId = PageId.DeployAppUri;

export default DeployAppUri;
