import {
  Box,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useOutsideClick,
} from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { useAllChains } from "hooks/chains/allChains";
import { useMemo, useRef, useState } from "react";
import { RefCallBack } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { Badge, FormErrorMessage, FormLabel, Text } from "tw-components";

interface SearchNetworksProps {
  onNetworkSelection: (network: Chain, custom: boolean) => void;
  onCustomSelection: () => void;
  onSelectorChange: (status: "open" | "close") => void;
  inputRef: React.RefObject<HTMLInputElement> | RefCallBack;
  errorMessage?: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  shortName: string;
}

// TODO - improve search performance and do fuzzy search

export const SearchNetworks: React.FC<SearchNetworksProps> = (props) => {
  const chains = useAllChains();
  const [showResults, setShowResults] = useState(false);

  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchTerm = props.value;

  useOutsideClick({
    ref: searchResultsRef,
    handler: () => {
      props.onSelectorChange("close");
      setShowResults(false);
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
    setShowResults(false);
    props.onSelectorChange("close");
    props.onNetworkSelection(network, custom);
  };

  return (
    <Box>
      <FormControl isInvalid={!!props.errorMessage} isRequired>
        <FormLabel>Network Name</FormLabel>
        <InputGroup
          position="relative"
          onClick={() => {
            if (props.disabled) {
              return;
            }
            setShowResults(true);
            props.onSelectorChange("open");
          }}
        >
          <Input
            ref={props.inputRef}
            _placeholder={{
              fontWeight: 500,
            }}
            _dark={{
              background: showResults ? "#1b1f25 !important" : "inputBg",
            }}
            _light={{
              background: showResults ? "white !important" : "inputBg",
            }}
            type="text"
            autoComplete="off"
            placeholder="Choose from a list of popular networks or add manually"
            aria-label="Search Network"
            value={searchTerm}
            borderColor={showResults ? "inputBg !important" : "inputBorder"}
            outline="none"
            py={5}
            borderBottomLeftRadius={showResults ? 0 : "md"}
            borderBottomRightRadius={showResults ? 0 : "md"}
            onChange={(e) => {
              if (!props.disabled) {
                setShowResults(true);
              }
              props.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (props.disabled) {
                  return;
                }

                // if search results, select first
                if (filteredNetworks.length > 0) {
                  handleSelection(filteredNetworks[0], false);
                } else {
                  // if no search results, select custom
                  props.onCustomSelection();
                  setShowResults(false);
                  props.onSelectorChange("close");
                }
              }
            }}
          />
          {!props.disabled && (
            <InputRightElement
              cursor={"pointer"}
              transition="transform 200ms ease"
              transform={showResults ? "rotate(180deg)" : "rotate(0deg)"}
              p={4}
              children={<Icon color="inherit" as={BiChevronDown} />}
            />
          )}
        </InputGroup>
        <Box
          display={showResults ? "block" : "none"}
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
            h="250px"
            overflowY="auto"
            borderTop="1px solid"
            borderColor="accent.100"
            pt={4}
            pb={4}
          >
            {chains.length === 0 && <Text>Loading...</Text>}
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

          {searchTerm && (
            <Flex
              cursor="pointer"
              px={4}
              py={4}
              justifyContent="space-between"
              alignItems="center"
              borderTop="1px solid"
              borderColor="accent.100"
              borderBottomRightRadius="md"
              borderBottomLeftRadius="md"
              _hover={{
                background: "inputBgHover",
              }}
              onClick={props.onCustomSelection}
            >
              <Text color="heading" fontSize="md">
                {searchTerm}
              </Text>
              <Badge
                fontSize="14px"
                px={3}
                py={2}
                colorScheme="blue"
                borderRadius="2xl"
                fontWeight={400}
                letterSpacing={"0.02em"}
                textTransform="lowercase"
              >
                {" "}
                custom{" "}
              </Badge>
            </Flex>
          )}
        </Box>

        <FormErrorMessage> {props.errorMessage} </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
