import { AspectRatio, Box, Divider, Flex, IconButton } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChainId } from "@thirdweb-dev/react";
import {
  ContractType,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
  ValidContractClass,
} from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import BuiltinContractForm from "components/contract-components/contract-deploy-form/built-in-contract";
import { CONTRACT_TYPE_NAME_MAP, FeatureIconMap } from "constants/mappings";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import { Card, Heading } from "tw-components";
import { z } from "zod";

export default function DeployContractContract() {
  const router = useRouter();
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
