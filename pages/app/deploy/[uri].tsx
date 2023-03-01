import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { AppDeployTable } from "components/contract-components/tables/app-deploy";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { replaceIpfsUrl } from "lib/sdk";
import { PageId } from "page-id";
import { NoWallet } from "pages/dashboard/no-wallet";
import { Heading, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DeployAppUri: ThirdwebNextPage = () => {
  const uri = useSingleQueryParam("uri");
  const address = useAddress();
  const allContractList = useAllContractList(address);

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
      {address ? (
        <AppDeployTable combinedList={allContractList.data} />
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
