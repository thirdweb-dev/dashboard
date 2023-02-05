import {
  Box,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useOutsideClick,
} from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { useAllChains } from "hooks/chains/allChains";
import { useMemo, useRef } from "react";
import { RefCallBack } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { FormErrorMessage, FormLabel, Text } from "tw-components";

interface SearchNetworksProps {
  onNetworkSelection: (network: Chain, custom: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement> | RefCallBack;
  errorMessage?: string;
  value: string;
  onChange: (value: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  keepOpen: boolean;
}

// TODO - improve search performance and do fuzzy search

export const SearchNetworks: React.FC<SearchNetworksProps> = (props) => {
  const chains = useAllChains();
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchTerm = props.value;

  useOutsideClick({
    ref: searchResultsRef,
    handler: () => {
      if (!props.keepOpen) {
        props.setIsSearchOpen(false);
      }
    },
  });

  const filteredNetworks = useMemo(() => {
    if (!searchTerm || !chains.length) {
      return chains || [];
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return chains.filter((network) =>
      network.name.toLowerCase().includes(lowerCaseSearchTerm),
    );
  }, [chains, searchTerm]);

  const handleSelection = (network: Chain, custom: boolean) => {
    props.onChange(network.name);
    props.setIsSearchOpen(false);
    props.onNetworkSelection(network, custom);
  };

  return (
    <Box>
      <FormControl isInvalid={!!props.errorMessage} isRequired>
        <FormLabel>Network Name</FormLabel>
        <InputGroup
          position="relative"
          onClick={() => {
            props.setIsSearchOpen(true);
          }}
        >
          <Input
            ref={props.inputRef}
            _placeholder={{
              fontWeight: 500,
            }}
            _dark={{
              background: props.isSearchOpen ? "#1b1f25 !important" : "inputBg",
            }}
            _light={{
              background: props.isSearchOpen ? "white !important" : "inputBg",
            }}
            type="text"
            autoComplete="off"
            placeholder="Search from a list of popular networks"
            aria-label="Search Network"
            value={searchTerm}
            borderColor={
              props.isSearchOpen ? "inputBg !important" : "inputBorder"
            }
            outline="none"
            py={5}
            borderBottomLeftRadius={props.isSearchOpen ? 0 : "md"}
            borderBottomRightRadius={props.isSearchOpen ? 0 : "md"}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // if search results, select first
                if (filteredNetworks.length > 0) {
                  handleSelection(filteredNetworks[0], false);
                }
              }
            }}
          />
          <InputRightElement
            cursor={"pointer"}
            transition="transform 200ms ease"
            transform={props.isSearchOpen ? "rotate(180deg)" : "rotate(0deg)"}
            p={4}
            children={<Icon color="inherit" as={BiChevronDown} />}
          />
        </InputGroup>
        <Box
          display={props.isSearchOpen ? "block" : "none"}
          borderRadius={"md"}
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          position="absolute"
          zIndex={10}
          _dark={{
            background: "#1b1f25",
          }}
          _light={{
            background: "white",
          }}
          boxShadow={"0 20px 32px rgba(0,0,0,0.15)"}
          w="100%"
        >
          <Box
            h="275px"
            sx={{
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "inputBgHover",
                borderRadius: 24,
              },
            }}
            overflowY="auto"
            borderTop="1px solid"
            borderColor="accent.100"
            pt={4}
            pb={4}
          >
            {chains.length === 0 && (
              <Flex justifyContent="center" alignItems="center" h="90%">
                <Spinner size="md" />
              </Flex>
            )}
            {chains.length > 0 &&
              filteredNetworks.map((network) => (
                <Text
                  px={4}
                  py={2}
                  key={network.name}
                  cursor="pointer"
                  display="flex"
                  color="heading"
                  _hover={{
                    background: "inputBgHover",
                  }}
                  onClick={() => {
                    handleSelection(network, false);
                  }}
                >
                  {network.name}{" "}
                  <Text as="span" opacity={0.8} ml="auto" color="inherit">
                    {network.shortName}
                  </Text>
                </Text>
              ))}

            {chains.length > 0 && filteredNetworks.length === 0 && (
              <Text py={10} textAlign="center">
                No results found
              </Text>
            )}
          </Box>
        </Box>

        <FormErrorMessage> {props.errorMessage} </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
