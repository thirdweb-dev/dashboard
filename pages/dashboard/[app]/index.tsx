import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ModuleType } from "@nftlabs/sdk";
import { ContractDetailCard } from "components/ContractDetailCard";
import { DashboardSection } from "components/dashboard/DashboardSection";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useAppContext } from "context/sdk/modules/app-context";
import { useCollectionContext } from "context/sdk/modules/collection-context";
import { useMarketContext } from "context/sdk/modules/market-context";
import { useNFTContext } from "context/sdk/modules/nft-context";
import { usePackContext } from "context/sdk/modules/pack-context";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FiPackage, FiPlusSquare } from "react-icons/fi";
import { BiCoin, BiCollection, BiImage, BiStoreAlt } from "react-icons/bi";
import { useCurrencyContext } from "context/sdk/modules/currency-context";
import { CgToolbox } from "react-icons/cg";

const DashboardPage: NextPage = () => {
  const { activeApp, isLoading } = useAppContext((c) => c);
  const { push, asPath } = useRouter();

  const { nfts: nftModules, isLoading: nftModulesLoading } = useNFTContext(
    (c) => c,
  );

  const { packs: packModules, isLoading: packModulesLoading } = usePackContext(
    (c) => c,
  );

  const { currencies: currencyModules, isLoading: currencyModulesLoading } =
    useCurrencyContext((c) => c);

  const {
    collections: collectionModules,
    isLoading: collectionModulesLoading,
  } = useCollectionContext((c) => c);

  const { markets: marketModules, isLoading: marketModulesLoading } =
    useMarketContext((c) => c);

  const renderName =
    activeApp?.metadata?.name || activeApp?.address || "App Dashboard";

  const isEmpty =
    nftModules?.length === 0 &&
    packModules?.length === 0 &&
    currencyModules?.length === 0 &&
    collectionModules?.length === 0 &&
    marketModules?.length === 0;

  return (
    <>
      <Head>
        <title>{renderName} | Console</title>
      </Head>
      <Stack spacing={16} my={8}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justify="space-between"
          align="center"
        >
          <HStack>
            <Heading size="xl">{renderName}</Heading>
            {activeApp?.address && (
              <AddressCopyButton
                my={2}
                colorScheme="blackAlpha"
                variant="outline"
                address={activeApp?.address}
                size="sm"
              />
            )}
          </HStack>
          <Button
            leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
            textDecor="none!important"
            colorScheme="teal"
            onClick={() => push(`/dashboard/${activeApp?.address}/add-module`)}
          >
            Add Module
          </Button>
        </Flex>
        <DashboardSection
          title="Modules"
          isLoading={
            nftModulesLoading &&
            packModulesLoading &&
            marketModulesLoading &&
            currencyModulesLoading &&
            collectionModulesLoading
          }
        >
          <Stack spacing={4}>
            {isEmpty ? (
              <Center>
                <Box textAlign="center">
                  <Icon as={CgToolbox} boxSize={128} color="gray.300" />
                  <Heading size="md" mt={8}>
                    You have no modules
                  </Heading>{" "}
                  <Button
                    mt={8}
                    leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
                    as={Link}
                    textDecor="none!important"
                    href={`/dashboard/${activeApp?.address}/add-module`}
                    colorScheme="teal"
                  >
                    Add Module
                  </Button>
                </Box>
              </Center>
            ) : (
              <></>
            )}
            <Stack minH={8}>
              {nftModules?.map((nft) => (
                <ContractDetailCard
                  path={`${asPath}/nft`}
                  key={nft.address}
                  contract={nft}
                  icon={BiImage}
                  badge={ModuleType.NFT}
                />
              ))}
              {collectionModules?.map((collection) => (
                <ContractDetailCard
                  path={`${asPath}/collection`}
                  key={collection.address}
                  contract={collection}
                  icon={BiCollection}
                  badge={ModuleType.COLLECTION}
                />
              ))}
              {packModules?.map((pack) => (
                <ContractDetailCard
                  path={`${asPath}/pack`}
                  key={pack.address}
                  contract={pack}
                  icon={FiPackage}
                  badge={ModuleType.PACK}
                />
              ))}
              {marketModules?.map((market) => (
                <ContractDetailCard
                  path={`${asPath}/market`}
                  key={market.address}
                  contract={market}
                  icon={BiStoreAlt}
                  badge={ModuleType.MARKET}
                />
              ))}
              {currencyModules?.map((currency) => (
                <ContractDetailCard
                  path={`${asPath}/currency`}
                  key={currency.address}
                  contract={currency}
                  icon={BiCoin}
                  badge={ModuleType.CURRENCY}
                />
              ))}
            </Stack>
          </Stack>
        </DashboardSection>
      </Stack>
    </>
  );
};

export default DashboardPage;
