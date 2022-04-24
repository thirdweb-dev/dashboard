import { ContractId } from "../types";
import { isContractIdBuiltInContract } from "../utils";
import { NetworkMismatchNotice } from "components/notices/NetworkMismatch";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SUPPORTED_CHAIN_ID } from "utils/network";

const CustomContractForm = dynamic(() => import("./custom-contract"));

interface ContractDeployFormProps {
  contractId: ContractId;
  shouldRedirect?: boolean;
  onDeploySuccess?: (
    contractAddress: string,
    chainId: SUPPORTED_CHAIN_ID,
  ) => void;
}

export const ContractDeployForm: React.VFC<ContractDeployFormProps> = ({
  contractId,
  shouldRedirect,
  onDeploySuccess,
}) => {
  const [selectedChain, setSelectedChain] = useState<
    SUPPORTED_CHAIN_ID | undefined
  >(undefined);
  if (contractId === "custom") {
    return <div>Invalid attempt to deploy &quot;custom&quot; contract.</div>;
  }
  if (isContractIdBuiltInContract(contractId)) {
    return (
      <div>Built-in contracts cannot be deployed though this flow yet.</div>
    );
  }
  return (
    <CustomSDKContext desiredChainId={selectedChain}>
      <CustomContractForm
        ipfsHash={contractId}
        selectedChain={selectedChain}
        onChainSelect={setSelectedChain}
        shouldRedirect={shouldRedirect}
        onDeploySuccess={onDeploySuccess}
      />
      <NetworkMismatchNotice />
    </CustomSDKContext>
  );
};
