import { ContractId } from "../types";
import { useChainId } from "@thirdweb-dev/react";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useConfiguredChainsRecord } from "hooks/chains/configureChains";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomContractForm = dynamic(() => import("./custom-contract"));

interface ContractDeployFormProps {
  contractId: ContractId;
  chainId?: number;
  onSuccessCallback?: (contractAddress: string) => void;
  isImplementationDeploy?: true;
}

export const ContractDeployForm: React.FC<ContractDeployFormProps> = ({
  contractId,
  chainId: chainIdProp,
  onSuccessCallback,
  isImplementationDeploy,
}) => {
  const connectedChainId = useChainId();
  const configuredNetworksRecord = useConfiguredChainsRecord();
  const [selectedChain, setSelectedChain] = useState<number | undefined>(
    chainIdProp
      ? chainIdProp
      : connectedChainId && connectedChainId in configuredNetworksRecord
      ? connectedChainId
      : undefined,
  );

  useEffect(() => {
    // If the user has not selected a chain, and the connected chain is configured, select it
    if (
      !selectedChain &&
      connectedChainId &&
      connectedChainId in configuredNetworksRecord
    ) {
      setSelectedChain(connectedChainId);
    }
  }, [connectedChainId, selectedChain, configuredNetworksRecord]);

  if (!contractId) {
    return null;
  }
  if (contractId === "custom") {
    return <div>Invalid attempt to deploy &quot;custom&quot; contract.</div>;
  }

  return (
    <CustomSDKContext desiredChainId={selectedChain}>
      <CustomContractForm
        ipfsHash={contractId}
        selectedChain={selectedChain}
        onChainSelect={setSelectedChain}
        isImplementationDeploy={isImplementationDeploy}
        onSuccessCallback={onSuccessCallback}
      />
    </CustomSDKContext>
  );
};
