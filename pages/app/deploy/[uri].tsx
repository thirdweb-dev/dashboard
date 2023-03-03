import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { AppDeployTable } from "components/contract-components/tables/app-deploy";
import { NoWallet } from "components/no-wallet";
import { PageId } from "page-id";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DeployAppUri: ThirdwebNextPage = () => {
  const address = useAddress();
  const allContractList = useAllContractList(address);

  return (
    <ClientOnly ssr={null}>
      <Flex flexDir="column" gap={4}>
        <Flex justifyContent="space-between">
          <Heading size="title.lg">Add App to a contract</Heading>
        </Flex>
        <Text>Select one of your contracts to assign this app URI to:</Text>
        {address ? (
          <AppDeployTable combinedList={allContractList.data} />
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
