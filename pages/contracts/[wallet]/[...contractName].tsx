import { Flex } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ReleaserHeader } from "components/contract-components/releaser-header";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";
import { Text } from "tw-components";

export default function ContractNamePage() {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  const sdk = useSDK();

  console.log({ wallet, contractName, sdk });

  return <Flex>{wallet && <ReleaserHeader wallet={wallet} />}</Flex>;
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
