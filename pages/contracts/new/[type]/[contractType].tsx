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
    <Card p={0}>
      <Flex
        direction="column"
        gap={8}
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 10 }}
      >
        <Flex align="center" justify="space-between" gap={4}>
          <IconButton
            onClick={() => router.back()}
            size="sm"
            aria-label="back"
            icon={<FiChevronLeft />}
          />
          {contractType && (
            <Flex gap={2} align="center">
              <AspectRatio ratio={1} w="50px" flexShrink={0}>
                <Box>
                  <ChakraNextImage
                    src={FeatureIconMap[contractType]}
                    alt={contractType}
                    w="100%"
                  />
                </Box>
              </AspectRatio>

              <Heading size="title.lg">
                Deploy new {CONTRACT_TYPE_NAME_MAP[contractType]} contract
              </Heading>
            </Flex>
          )}
          <Box />
        </Flex>
      </Flex>
      <Divider />
      <Box pt={{ base: 6, md: 10 }}>
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

function useDeployForm<TContract extends ValidContractClass>(
  deploySchema: TContract["schema"]["deploy"],
) {
  const { handleSubmit: _handleSubmit, ...restForm } = useForm<
    z.infer<typeof deploySchema>
  >({
    resolver: zodResolver(deploySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  function handleSubmit(
    onValid: SubmitHandler<z.infer<typeof deploySchema>>,
    onInvalid?: SubmitErrorHandler<z.infer<typeof deploySchema>>,
  ) {
    return _handleSubmit((d) => {
      onValid(stripNullishKeys(d));
    }, onInvalid);
  }

  return { ...restForm, handleSubmit };
}

function stripNullishKeys<T extends object>(obj: T) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value || value === 0) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as T);
}

DeployContractContract.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
