import { GetStarted } from "../../components/dashboard/GetStarted";
import { ContractsSidebar } from "../../core-ui/sidebar/contracts";
import { useAllContractList } from "@3rdweb-sdk/react";
import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { Box, Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { DeployedContracts } from "components/contract-components/tables/deployed-contracts";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { ThirdwebNextPage } from "utils/types";

/**
 *
 * @TODO
 * Initially the FTUX is shown, then the contracts are shown. This creates a flash of wrong content.
 * To fix this, we need to hold off rendering either the FTUX or the contracts until we know which one to show.
 */

const Contracts: ThirdwebNextPage = () => {
  const address = useAddress();

  /** put the component is loading state for sometime to avoid layout shift */
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const steps = [
    {
      title: "Connect your wallet to get started",
      description:
        "In order to interact with your contracts you need to connect an EVM compatible wallet.",
      children: <ConnectWallet ecosystem="evm" />,
      completed: !!address,
    },
    {
      title: "Switch to the test network Mumbai",
      description:
        "This network allows you to deploy contracts within a testing environment.",
      children: <ConnectWallet ecosystem="evm" />,
      completed: false,
    },
  ];

  return (
    <Box pt={8}>
      <ClientOnly fadeInDuration={600} ssr={null}>
        <ContractsSidebar activePage="deployed" />
        {!isLoading && (
          <Flex flexDir="column" gap={12}>
            <GetStarted
              title="Get started with deploying contracts"
              description="This guide will help you start deploying contracts on-chain in just a few minutes."
              steps={steps}
            />
            {address && <EVMContracts address={address} />}
          </Flex>
        )}
      </ClientOnly>
    </Box>
  );
};

Contracts.getLayout = (page, props) => (
  <AppLayout ecosystem="evm" {...props}>
    {page}
  </AppLayout>
);
Contracts.pageId = PageId.Contracts;

export default Contracts;

interface ContractsProps {
  address: string;
}

const EVMContracts: React.FC<ContractsProps> = ({ address }) => {
  const allContractList = useAllContractList(address);
  return (
    <Flex direction="column" gap={8}>
      <DeployedContracts contractListQuery={allContractList} limit={50} />
    </Flex>
  );
};
