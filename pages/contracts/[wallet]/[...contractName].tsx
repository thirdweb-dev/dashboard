import { useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ReleaserHeader } from "components/contract-components/releaser-header";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";
import { Heading, Text } from "tw-components";

export default function ContractNamePage() {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  const sdk = useSDK();

  console.log({ wallet, contractName, sdk });

  return (
    <div>
      <Heading>Contract Name</Heading>
      <Text>
        The name of the contract. This is used to identify the contract in the
        blockchain.
      </Text>
      {wallet && <ReleaserHeader wallet={wallet} />}
    </div>
  );
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
