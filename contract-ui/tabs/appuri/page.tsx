import { AppURISetup } from "./components/appuri-setup";
import { Flex } from "@chakra-ui/react";
import { useContract, useContractType } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { useEffect } from "react";

interface CustomContractAppURIPageProps {
  contractAddress?: string;
}

export const CustomContractAppURIPage: React.FC<
  CustomContractAppURIPageProps
> = ({ contractAddress }) => {
  const contractQuery = useContract(contractAddress);
  useEffect(() => {
    contractQuery.data?.appURI.get().then((appUri) => {
      console.log(appUri);
    });
  }, [contractQuery]);

  if (contractQuery.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      <AppURISetup appUri={""} />
    </Flex>
  );
};
