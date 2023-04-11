import { Box, Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import { Polygon } from "@thirdweb-dev/chains";
import { useAddress } from "@thirdweb-dev/react";
import { ChakraNextImage } from "components/Image";
import { getSearchQuery } from "components/cmd-k-search";
import { ChainIcon } from "components/icons/ChainIcon";
import { useSupportedChain } from "hooks/chains/configureChains";
import { useCallback, useEffect, useState } from "react";
import { Card, Heading, Link, Text } from "tw-components";
import { shortenString } from "utils/usedapp-external";

type ContractSearchResult = {
  address: string;
  chainId: number;
  metadata: { name: string; image?: string; symbol?: string };
  needsImport: boolean;
};

const typesenseApiKey =
  process.env.NEXT_PUBLIC_TYPESENSE_CONTRACT_API_KEY || "";

const ListItem: React.FC<{ contract: ContractSearchResult }> = ({
  contract,
}) => {
  const {
    chainId,
    address,
    metadata: { name },
  } = contract;
  const chain = useSupportedChain(chainId);

  return (
    <Flex rounded="xl" gap={4} mt={6} alignItems="end" w="full">
      <ChainIcon size={42} ipfsSrc={Polygon.icon.url} />
      <Box>
        <Text fontSize="16px" color="initial">
          {name}
        </Text>
        <Text fontSize="16px" opacity={0.7}>
          {chain?.name} - {shortenString(address, true)}
        </Text>
      </Box>
      <Link
        href={`/${chain?.slug}/${address}`}
        target="_blank"
        justifySelf="end"
        ml="auto"
        alignSelf="center"
      >
        <ChakraNextImage
          cursor="pointer"
          src={require("public/assets/bear-market-airdrop/contract-arr.svg")}
          alt="contract link"
        />
      </Link>
    </Flex>
  );
};

export const ContractsDeployed = () => {
  const { colorMode } = useColorMode();
  const walletAddress = useAddress();
  const [currPage, setCurrPage] = useState(1);
  const [contracts, setContracts] = useState<ContractSearchResult[]>([]);

  const perPage = 5;
  const total = contracts.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (currPage - 1) * perPage;
  const end = start + perPage;
  const [paginatedList, setPaginatedList] = useState(
    contracts.slice(start, end),
  );

  const handleNextPage = () => {
    if (currPage < totalPages) {
      const newStart = start + perPage;
      const newEnd = newStart + perPage;
      setCurrPage(currPage + 1);
      setPaginatedList(contracts.slice(newStart, newEnd));
    }
  };

  const handlePrevPage = () => {
    if (currPage > 1) {
      const newStart = start - perPage;
      const newEnd = end - perPage;
      setCurrPage(currPage - 1);
      setPaginatedList(contracts.slice(newStart, newEnd));
    }
  };

  const handleClickedPage = (page: number) => {
    if (page > currPage) {
      const newStart = start + perPage;
      const newEnd = newStart + perPage;
      setCurrPage(page);
      setPaginatedList(contracts.slice(newStart, newEnd));
      return;
    } else if (page < currPage) {
      const newStart = start - perPage;
      const newEnd = end - perPage;
      setCurrPage(page);
      setPaginatedList(contracts.slice(newStart, newEnd));
      return;
    }
  };

  const getContracts = useCallback(async () => {
    if (!walletAddress || !typesenseApiKey) {
      return;
    }
    const res = await fetch(
      getSearchQuery({
        query: "",
        walletAddress,
        searchMode: "all",
      }),
      {
        headers: {
          "x-typesense-api-key": typesenseApiKey,
        },
      },
    );
    const result = await res.json();
    const data = result.hits.map((hit: any) => {
      const document = hit.document;
      return {
        address: document.contract_address,
        chainId: document.chain_id,
        metadata: {
          name: document.name,
        },
      } as ContractSearchResult;
    }) as ContractSearchResult[];

    setContracts(data);
    setPaginatedList(data.slice(start, end));
  }, [walletAddress, start, end]);

  useEffect(() => {
    getContracts();
  }, [getContracts]);

  const pageNumbersToShow = [];
  if (currPage <= totalPages - 3) {
    pageNumbersToShow.push(currPage, currPage + 1, currPage + 2);
  } else {
    pageNumbersToShow.push(totalPages - 2, totalPages - 1, totalPages);
  }

  return (
    <Card
      mt={-8}
      px={12}
      pt={12}
      rounded="xl"
      h={561}
      w={464}
      bg="#121018"
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Heading textAlign="center" fontSize="20px">
        Contracts you&apos;ve deployed:
      </Heading>
      {contracts.length > 0 ? (
        <>
          <Flex direction="column">
            {paginatedList.map((contract) => (
              <ListItem key={contract.address} contract={contract} />
            ))}
          </Flex>
          <Spacer />
          <Flex gap={8} justifyContent="center" alignItems="center">
            <IconButton
              aria-label={""}
              bg="transparent"
              onClick={handlePrevPage}
              _hover={{ bg: "transparent" }}
            >
              <ChakraNextImage
                src={require("public/assets/bear-market-airdrop/left-arr.svg")}
                alt=""
              />
            </IconButton>
            {totalPages <= 5 ? (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Text
                    key={pageNum}
                    fontWeight={pageNum === currPage ? "bold" : "normal"}
                    color={pageNum === currPage ? "initial" : "gray.400"}
                    cursor="pointer"
                    onClick={() => handleClickedPage(pageNum)}
                  >
                    {pageNum}
                  </Text>
                ),
              )
            ) : (
              <>
                {currPage > 1 && (
                  <>
                    <Text onClick={() => handleClickedPage(1)} cursor="pointer">
                      1
                    </Text>
                    <Text>...</Text>
                  </>
                )}
                {pageNumbersToShow.map((pageNum) => (
                  <Text
                    key={pageNum}
                    fontWeight={pageNum === currPage ? "bold" : "normal"}
                    color={pageNum === currPage ? "initial" : "gray.400"}
                    cursor="pointer"
                    onClick={() => handleClickedPage(pageNum)}
                  >
                    {pageNum}
                  </Text>
                ))}
                {currPage < totalPages - 2 && (
                  <>
                    <Text>...</Text>
                    <Text
                      onClick={() => handleClickedPage(totalPages)}
                      cursor="pointer"
                    >
                      {totalPages}
                    </Text>
                  </>
                )}
              </>
            )}
            <IconButton
              aria-label={""}
              bg="transparent"
              onClick={handleNextPage}
              _hover={{ bg: "transparent" }}
            >
              <ChakraNextImage
                src={require("public/assets/bear-market-airdrop/right-arr.svg")}
                alt=""
              />
            </IconButton>
          </Flex>
        </>
      ) : (
        <Text
          color={colorMode === "dark" ? "#433A5E" : "initial"}
          textAlign="center"
          mt={8}
          fontSize="24px"
          fontWeight="bold"
          my="auto"
        >
          It looks like you haven&apos;t deployed any contracts.
        </Text>
      )}
    </Card>
  );
};
