import { Flex } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { useAllVersions } from "components/contract-components/hooks";
import { ReleaserHeader } from "components/contract-components/releaser-header";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";

const ContractsNamePageWrapped = () => {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  const allVersions = useAllVersions(wallet);
  const sdk = useSDK();

  console.log({ wallet, contractName, sdk, allVersions: allVersions.data });

  return <Flex>{wallet && <ReleaserHeader wallet={wallet} />}</Flex>;
};

export default function ContractNamePage() {
  return (
    <PublisherSDKContext>
      <ContractsNamePageWrapped />
    </PublisherSDKContext>
  );
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
