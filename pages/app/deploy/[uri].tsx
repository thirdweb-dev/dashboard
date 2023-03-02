import { useAllContractList } from "@3rdweb-sdk/react";
import { Box, Center, Flex, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { AppDeployTable } from "components/contract-components/tables/app-deploy";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { replaceIpfsUrl } from "lib/sdk";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { NoWallet } from "pages/dashboard/no-wallet";
import { useCallback, useEffect, useState } from "react";
import { Button, Heading, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DeployAppUri: ThirdwebNextPage = () => {
  const router = useRouter();

  const uri = useSingleQueryParam("uri");
  const sdk = useSDK();
  const address = useAddress();
  const allContractList = useAllContractList(address);
  const [selectedContract, setSelectedContract] =
    useState<ContractWithMetadata>();
  const [isSaving, setIsSaving] = useState(false);

  const setAppURIOnContract = useCallback(async () => {
    if (selectedContract && selectedContract.address && uri) {
      setIsSaving(true);
      const contract = await sdk?.getContract(selectedContract.address);
      // eslint-disable-next-line no-console
      console.log({ sdk });
      if (contract) {
        try {
          // eslint-disable-next-line no-console
          console.log("setting uri", `ipfs://${uri}`);
          const result = await contract.app.set(`ipfs://${uri}`);
          // eslint-disable-next-line no-console
          console.log({ result });
          router.push(
            `/${selectedContract.chainId}/${selectedContract.address}/appuri`,
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          setIsSaving(false);
        } finally {
          // setSelectedContract(undefined);
        }
      }
    }
  }, [selectedContract, sdk, uri, setIsSaving, router]);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex justifyContent="space-between">
        <Heading size="title.lg">Assign App to one of your contracts</Heading>
        <LinkButton
          href={replaceIpfsUrl(`ipfs://${uri}`)}
          colorScheme="blue"
          isExternal
        >
          Preview App
        </LinkButton>
      </Flex>
      <Text>Select one of your contracts to assign this app to:</Text>
      {isSaving ? (
        <Center>
          <VStack>
            <Spinner />
            <Text>Setting app URI...</Text>
          </VStack>
        </Center>
      ) : address ? (
        <>
          <Box>Pick a contract</Box>
          <Box>
            {!selectedContract ? (
              <>
                <AppDeployTable
                  combinedList={allContractList.data}
                  onSelect={(row) => {
                    // eslint-disable-next-line no-console
                    console.log("onSelect", row);
                    setSelectedContract(row);
                  }}
                />
                <Center mt={4}>OR</Center>
                <Center mt={4}>
                  <Button>Deploy a new contract</Button>
                </Center>
              </>
            ) : (
              <Center>
                <Box>
                  <Text>Contract Address: {selectedContract.address}</Text>
                  <Text>ChainId: {selectedContract.chainId}</Text>
                  <Button
                    m={2}
                    onClick={() => {
                      setSelectedContract(undefined);
                      setIsSaving(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    m={2}
                    colorScheme={"blue"}
                    onClick={setAppURIOnContract}
                  >
                    Set AppURI
                  </Button>
                </Box>
              </Center>
            )}
          </Box>
        </>
      ) : (
        <NoWallet ecosystem="evm" />
      )}
    </Flex>
  );
};

DeployAppUri.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DeployAppUri.pageId = PageId.DeployAppUri;

export default DeployAppUri;
