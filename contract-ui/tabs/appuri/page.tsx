import { AppURISetup } from "./components/appuri-setup";
import { Flex } from "@chakra-ui/react";
import {
  useContract,
  useContractRead,
  useContractType,
} from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { useEffect, useState } from "react";

interface CustomContractAppURIPageProps {
  contractAddress?: string;
}

export const CustomContractAppURIPage: React.FC<
  CustomContractAppURIPageProps
> = ({ contractAddress }) => {
  const contractQuery = useContract(contractAddress);
  const { data: appURI } = useContractRead(contractQuery.contract, "appURI");

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
