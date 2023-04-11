import { Box, Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import { Polygon } from "@thirdweb-dev/chains";
import { ChainIcon } from "components/icons/ChainIcon";
import { ChakraNextImage } from "components/Image";
import { useMemo, useState } from "react";
import { Card, Heading, Text } from "tw-components";

export const ContractsDeployed = () => {
  const { colorMode } = useColorMode();
  const fakeList = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        id: i,
        name: "test",
        contract_address: "0x2323...34154",
        chain: "polygon",
      });
    }
    return arr;
  }, []);

  const [currPage, setCurrPage] = useState(1);

  const perPage = 5;
  const total = fakeList.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (currPage - 1) * perPage;
  const end = start + perPage;
  const [paginatedList, setPaginatedList] = useState(
    fakeList.slice(start, end),
  );

  const handleNextPage = () => {
    if (currPage < totalPages) {
      const newStart = start + perPage;
      const newEnd = newStart + perPage;
      setCurrPage(currPage + 1);
      setPaginatedList(fakeList.slice(newStart, newEnd));
    }
  };

  const handlePrevPage = () => {
    if (currPage > 1) {
      const newStart = start - perPage;
      const newEnd = end - perPage;
      setCurrPage(currPage - 1);
      setPaginatedList(fakeList.slice(newStart, newEnd));
    }
  };

  const handleClickedPage = (page: number) => {
    if (page > currPage) {
      const newStart = start + perPage;
      const newEnd = newStart + perPage;
      setCurrPage(page);
      setPaginatedList(fakeList.slice(newStart, newEnd));
      return;
    } else if (page < currPage) {
      const newStart = start - perPage;
      const newEnd = end - perPage;
      setCurrPage(page);
      setPaginatedList(fakeList.slice(newStart, newEnd));
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
      {fakeList.length > 0 ? (
        <>
          <Flex direction="column">
            {paginatedList.map((contract) => (
              <Flex
                key={contract.id}
                rounded="xl"
                gap={4}
                mt={6}
                alignItems="end"
              >
                <ChainIcon size={42} ipfsSrc={Polygon.icon.url} />
                <Box w="60%">
                  <Text fontSize="16px" color="initial">
                    {contract.name}
                  </Text>
                  <Text fontSize="16px" opacity={0.7}>
                    {contract.chain} - {contract.contract_address}
                  </Text>
                </Box>
                <ChakraNextImage
                  ml="auto"
                  cursor="pointer"
                  src={require("public/assets/bear-market-airdrop/contract-arr.svg")}
                  alt=""
                />
              </Flex>
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
