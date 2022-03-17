import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  convertModuleTypeToName,
  convertNameToModuleType,
  ModuleType,
} from "@nftlabs/sdk";
import { CollectionModuleForm } from "components/forms/modules/collection";
import { CurrencyModuleForm } from "components/forms/modules/currency";
import { MarketModuleForm } from "components/forms/modules/market";
import { NftModuleForm } from "components/forms/modules/nft";
import { PackModuleForm } from "components/forms/modules/pack";
import { Card } from "components/layout/Card";
import { DeployingModal, DeployMode } from "components/web3/DeployingModal";
import { useAppContext } from "context/sdk/modules/app-context";
import { useCollectionContext } from "context/sdk/modules/collection-context";
import { useCurrencyContext } from "context/sdk/modules/currency-context";
import { useMarketContext } from "context/sdk/modules/market-context";
import { useNFTContext } from "context/sdk/modules/nft-context";
import { usePackContext } from "context/sdk/modules/pack-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import type { NextPage } from "next";
import React, { useCallback, useMemo, useState } from "react";
import { BiCoin, BiCollection, BiImage, BiStoreAlt } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { IoIosRocket } from "react-icons/io";
import { useId } from "react-id-generator";
import {
  CoinContractInput,
  MarketContractInput,
  NFTCollectionContractInput,
  NFTContractInput,
  PackContractInput,
} from "schema/contracts";

export function generateAddModuleLink(
  appAddress?: string,
  moduleType?: ModuleType,
): string | undefined {
  if (!appAddress) {
    return undefined;
  }
  return `/dashboard/${appAddress}/add-module${
    moduleType
      ? `?module=${convertModuleTypeToName(moduleType)?.toLowerCase()}`
      : ""
  }`;
}

export function useAddModuleLink(moduleType?: ModuleType): string | undefined {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  return useMemo(
    () => generateAddModuleLink(activeAppAddress, moduleType),
    [activeAppAddress, moduleType],
  );
}

interface IFormComingSoon {
  moduleType: ModuleType;
}
const FormComingSoon: React.FC<IFormComingSoon> = ({ moduleType }) => {
  return (
    <Center p={4} opacity={0.69} fontStyle="italic">
      <Text>
        The{" "}
        <strong>
          {(convertModuleTypeToName(moduleType) || "")
            .replace(/_/gi, " ")
            .toLowerCase()}
        </strong>{" "}
        module is currently in alpha. If you want to get early access, let us
        know!
      </Text>
    </Center>
  );
};

const getModuleNameByType = (moduleType: ModuleType): string => {
  return (convertModuleTypeToName(moduleType) || "")
    .replace(/_/gi, " ")
    .toLowerCase()
    .replace(/nft/gi, "NFT");
};

const ModuleTypeToDescription: Partial<Record<ModuleType, string>> = {
  0: "A digital currency for your own virtual economy.",
  1: "Digital tokens that can represent fungible and non-fungible assets.",
  2: "Unique digital tokens that can be used to represent ownership in digital assets.",
  3: "",
  4: "",
  5: "Turns your Collection into a Pack. Opening a pack gives random NFT within the Collection.",
  6: "A marketplace features direct listing for NFTs using any currency.",
};

const ModuleTypeToIcon: Partial<Record<ModuleType, React.ElementType<any>>> = {
  0: BiCoin,
  1: BiCollection,
  2: BiImage,
  3: BiImage,
  4: BiImage,
  5: FiPackage,
  6: BiStoreAlt,
};

const ModuleTypeToFormMap: Partial<Record<ModuleType, React.ElementType<any>>> =
  {
    // CURRENCY = 0
    0: CurrencyModuleForm,
    // COLLECTION = 1
    1: CollectionModuleForm,
    // NFT = 2
    2: NftModuleForm,
    // PACk = 5
    5: PackModuleForm,
    // Market = 6
    6: MarketModuleForm,
  };

const SUPPORTED_MODULES = [0, 1, 2, 5, 6];

const AddModule: NextPage = () => {
  const [formId] = useId(1, "add-module-form");
  const moduleTypeName = useSingleQueryParam<keyof typeof ModuleType>("module");

  const [selectedModuleType, setSelectedModuleType] = useState<
    ModuleType | undefined
  >(convertNameToModuleType(moduleTypeName?.toUpperCase()));

  const [isDeploying, setIsDeloying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const ModuleForm: React.ElementType<any> | null = useMemo(() => {
    const moduleType =
      selectedModuleType !== undefined
        ? ModuleTypeToFormMap[selectedModuleType]
        : null;
    return moduleType || null;
  }, [selectedModuleType]);

  const deployCurrency = useCurrencyContext((c) => c.deploy);
  const deployNFT = useNFTContext((c) => c.deploy);
  const deployCollection = useCollectionContext((c) => c.deploy);
  const deployPack = usePackContext((c) => c.deploy);
  const deployMarket = useMarketContext((c) => c.deploy);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (selectedModuleType === undefined) {
        return;
      }

      setIsDeloying(true);
      try {
        switch (selectedModuleType) {
          case ModuleType.NFT:
            await deployNFT(data as NFTContractInput);
            break;
          case ModuleType.COLLECTION:
            await deployCollection(data as NFTCollectionContractInput);
            break;
          case ModuleType.PACK:
            await deployPack(data as PackContractInput);
            break;
          case ModuleType.MARKET:
            await deployMarket(data as MarketContractInput);
            break;
          case ModuleType.CURRENCY:
            await deployCurrency(data as CoinContractInput);
            break;
        }
        setError(null);
      } catch (err) {
        console.error("failed to deploy", err);
        setError(err as Error);
      } finally {
        setIsDeloying(false);
      }
    },
    [
      deployCollection,
      deployCurrency,
      deployMarket,
      deployNFT,
      deployPack,
      selectedModuleType,
    ],
  );

  return (
    <>
      <DeployingModal
        isDeploying={isDeploying}
        error={error}
        clearError={() => setError(null)}
        deployMode={DeployMode.MODULE}
      />
      <Container py={8}>
        <Stack spacing={8}>
          <Heading flexShrink={0}>Add New Module</Heading>

          <Card>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Module Type</FormLabel>
                <Divider />
                <SimpleGrid columns={2} spacing={2} width="100%" mt={4}>
                  {Object.keys(ModuleTypeToFormMap).map((value) => (
                    <Box
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "teal.400",
                      }}
                      key={value}
                      p={4}
                      minWidth="128px"
                      borderRadius="md"
                      backgroundColor={
                        selectedModuleType === (parseInt(value) as ModuleType)
                          ? "teal.400"
                          : "white"
                      }
                      borderColor="lightgray"
                      borderWidth="1px"
                      textAlign="center"
                      onClick={() =>
                        setSelectedModuleType(parseInt(value) as ModuleType)
                      }
                    >
                      <Icon
                        as={ModuleTypeToIcon[parseInt(value) as ModuleType]}
                        boxSize={8}
                        color="black"
                        opacity={0.88}
                      />
                      <Text fontSize="lg" textTransform="capitalize">
                        {getModuleNameByType(parseInt(value) as ModuleType)}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </FormControl>

              {typeof selectedModuleType === "number" &&
              ModuleTypeToDescription[selectedModuleType] ? (
                <Text opacity={0.69} fontStyle="italic">
                  {ModuleTypeToDescription[selectedModuleType]}
                </Text>
              ) : null}

              {ModuleForm ? (
                <ModuleForm
                  formId={formId}
                  onSubmit={onSubmit}
                  moduleType={selectedModuleType}
                />
              ) : (
                <Center p={4} opacity={0.69} fontStyle="italic">
                  Please select a module above to get started.
                </Center>
              )}
              <Divider />
              <Button
                isDisabled={
                  !SUPPORTED_MODULES.includes(selectedModuleType ?? -1)
                }
                isLoading={isDeploying}
                type="submit"
                form={formId}
                colorScheme="teal"
                rightIcon={<Icon as={IoIosRocket} />}
              >
                Add Module
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </>
  );
};

export default AddModule;
