import { ContractSearchResult } from ".";
import { Box, Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { ChainIcon } from "components/icons/ChainIcon";
import { useSupportedChain } from "hooks/chains/configureChains";
import { useState } from "react";
import { Card, Heading, Link, Text } from "tw-components";
import { shortenString } from "utils/usedapp-external";

interface ContractsDeployedProps {
  contracts: ContractSearchResult[];
}

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
    <Link
      href={`/${chain?.slug}/${address}`}
      target="_blank"
      w="full"
      alignSelf="center"
      _hover={{
        textDecoration: "none",
      }}
      role="group"
    >
      <Flex rounded="xl" gap={4} mt={6} justifyContent="space-between" w="full">
        <Flex gap={4}>
          <Flex alignItems="center" h="full">
            <ChainIcon size={36} ipfsSrc={chain?.icon?.url} />
          </Flex>
          <Flex
            flexDir="column"
            _groupHover={{
              opacity: 0.8,
            }}
          >
            <Flex gap={1} justifyContent="center">
              <Text fontSize="16px" opacity={0.7}>
                {chain?.name}
              </Text>
            </Flex>
            <Text fontSize="16px" color="initial">
              {name} {name && "- "}
              <Text fontFamily="monospace">{shortenString(address, true)}</Text>
            </Text>
          </Flex>
        </Flex>
        <ChakraNextImage
          _groupHover={{
            opacity: 0.8,
          }}
          cursor="pointer"
          src={require("public/assets/bear-market-airdrop/contract-arr.svg")}
          alt="contract link"
        />
      </Flex>
    </Link>
  );
};

export const ContractsDeployed: React.FC<ContractsDeployedProps> = ({
  contracts,
}) => {
  const { colorMode } = useColorMode();
  const [currPage, setCurrPage] = useState(1);

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

  const pageNumbersToShow = [];
  if (currPage <= totalPages - 3) {
    pageNumbersToShow.push(currPage, currPage + 1, currPage + 2);
  } else {
    pageNumbersToShow.push(totalPages - 2, totalPages - 1, totalPages);
  }

  return (
    <Card
      px={{ base: 6, md: 10 }}
      pt={{ base: 6, md: 10 }}
      rounded="xl"
      h={{ base: "auto", md: 561 }}
      bg="#121018"
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Heading textAlign="center" fontSize="20px">
        Contracts you&apos;ve deployed
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
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h="full"
        >
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
          <Box alignSelf="center" justifySelf="end" pb={8}>
            <ChakraNextImage
              src={require("public/assets/bear-market-airdrop/gift.svg")}
              alt="gift-image"
              mx="auto"
              mb={4}
            />
            <Text>Want to be eligible for future airdrops?</Text>
            <Link
              href="https://thirdweb.com/dashboard/contracts"
              target="_blank"
            >
              <Text color="blue.500">Deploy a contract on thirdweb &rarr;</Text>
            </Link>
          </Box>
        </Flex>
      )}
    </Card>
  );
};
