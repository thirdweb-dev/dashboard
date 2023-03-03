import { useAllContractList } from "@3rdweb-sdk/react";
import { Box, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { AppDeployTable } from "components/contract-components/tables/app-deploy";
import { NoWallet } from "components/no-wallet";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useCallback, useState } from "react";
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
    <ClientOnly ssr={null}>
      <Flex flexDir="column" gap={4}>
        <Flex justifyContent="space-between">
          <Heading size="title.lg">Add App to a contract</Heading>
        </Flex>
        <Text>Select one of your contracts to assign this app uri to:</Text>
        {isSaving ? (
          <Center>
            <VStack>
              <Spinner />
              <Text>Setting app URI...</Text>
            </VStack>
          </Center>
        ) : address ? (
          <>
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
    </ClientOnly>
  );
};

DeployAppUri.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DeployAppUri.pageId = PageId.DeployAppUri;

export default DeployAppUri;
