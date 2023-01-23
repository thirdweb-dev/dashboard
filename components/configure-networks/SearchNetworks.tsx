import { ChainListNetworkInfo, ConfiguredNetworkInfo } from "./types";
import { Box, FormControl, Input, useOutsideClick } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { Text } from "tw-components";

const fetchChainList = async (): Promise<ChainListNetworkInfo[]> => {
  const response = await fetch("/json/chain-list-mini.json");
  return response.json();
};

interface SearchNetworksProps {
  onNetworkSelection: (network: ConfiguredNetworkInfo) => void;
  onSelectorChange: (status: "open" | "close") => void;
}

export const SearchNetworks: React.FC<SearchNetworksProps> = (props) => {
  const networkListQuery = useQuery(["network-list-mini"], fetchChainList);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResultsRef = useRef<HTMLDivElement>(null);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  useOutsideClick({
    ref: searchResultsRef,
    handler: () => {
      props.onSelectorChange("close");
      setShowResults(false);
    },
  });

  const filteredNetworks = useMemo(() => {
    if (!deferredSearchTerm || !networkListQuery.data) {
      return networkListQuery.data || [];
    }

    const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase();
    return networkListQuery.data.filter(
      (network) =>
        network.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        `${network.chainId}`.includes(lowerCaseSearchTerm),
    );
  }, [networkListQuery.data, deferredSearchTerm]);

  return (
    <Box position="relative">
      <FormControl>
        {/* <FormLabel>Search Network</FormLabel> */}
        <Input
          background="backgroundHighlight"
          type="text"
          placeholder="Search Network"
          aria-label="Search Network"
          value={searchTerm}
          onClick={() => {
            setShowResults(true);
            props.onSelectorChange("open");
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        {showResults && (
          <Box
            p={2}
            maxH="300px"
            borderRadius={"md"}
            overflow="scroll"
            position="absolute"
            zIndex={10}
            background="backgroundHighlight"
            boxShadow={"0 0 40px rgba(0,0,0,0.2)"}
            border="2px solid"
            borderColor="backgroundHighlight"
            mt={2}
            w="100%"
            ref={searchResultsRef}
          >
            {networkListQuery.isLoading && <Text>Loading...</Text>}
            {networkListQuery.isError && <Text> Error </Text>}
            {networkListQuery.isSuccess &&
              filteredNetworks.map((network) => (
                <Text
                  px={2}
                  py={2}
                  borderRadius="md"
                  key={network.name}
                  cursor="pointer"
                  _hover={{
                    background: "whiteAlpha.50",
                    color: "white",
                  }}
                  onClick={() => {
                    setSearchTerm(`${network.name} (${network.shortName})`);
                    setShowResults(false);
                    props.onSelectorChange("close");
                    props.onNetworkSelection({
                      name: network.name,
                      chainId: network.chainId,
                      currencySymbol: network.nativeCurrency.symbol,
                      rpcUrl: network.rpc[0],
                      shortName: network.shortName,
                    });
                  }}
                >
                  {network.name}{" "}
                  <Text as="span" opacity="0.7">
                    ({network.shortName})
                  </Text>
                </Text>
              ))}

            {networkListQuery.isSuccess && filteredNetworks.length === 0 && (
              <Text p={4}>No results found</Text>
            )}
          </Box>
        )}
      </FormControl>
    </Box>
  );
};
