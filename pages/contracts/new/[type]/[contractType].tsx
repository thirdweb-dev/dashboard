import { Box } from "@chakra-ui/react";
import { useChainId } from "@thirdweb-dev/react";
import {
  ContractType,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
} from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import BuiltinContractForm from "components/contract-components/contract-deploy-form/built-in-contract";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React, { ReactElement, useEffect, useState } from "react";
import { Card } from "tw-components";

export default function DeployContractContract() {
  const contractType = useSingleQueryParam("contractType") as
    | ContractType
    | undefined;
  const chainId = useChainId();
  const [selectedChain, setSelectedChain] = useState<
    SUPPORTED_CHAIN_ID | undefined
  >(chainId && SUPPORTED_CHAIN_IDS.includes(chainId) ? chainId : undefined);

  useEffect(() => {
    if (!selectedChain && chainId && SUPPORTED_CHAIN_IDS.includes(chainId)) {
      setSelectedChain(chainId);
    }
  }, [chainId, selectedChain]);

  return (
    <Card p={{ base: 6, md: 10 }}>
      <Box>
        {contractType ? (
          <BuiltinContractForm
            contractType={contractType}
            selectedChain={selectedChain}
            onChainSelect={setSelectedChain}
          />
        ) : null}
      </Box>
    </Card>
  );
}

DeployContractContract.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
