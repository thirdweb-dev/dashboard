import { AppURISetup } from "./components/appuri-setup";
import { Flex } from "@chakra-ui/react";
import { useAppURI, useContract } from "@thirdweb-dev/react";

interface CustomContractAppPageProps {
  contractAddress?: string;
}

export const CustomContractAppPage: React.FC<CustomContractAppPageProps> = ({
  contractAddress,
}) => {
  const contractQuery = useContract(contractAddress);
  const { data: appURI } = useAppURI(contractQuery.contract);

  if (contractQuery.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      <AppURISetup appURI={appURI} contract={contractQuery.contract} />
    </Flex>
  );
};
