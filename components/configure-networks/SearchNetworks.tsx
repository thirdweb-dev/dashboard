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
    return chains.filter(
      (network) =>
        network.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        `${network.chainId}`.includes(lowerCaseSearchTerm),
    );
  }, [chains, searchTerm]);

  const handleSelection = (network: Chain, custom: boolean) => {
    props.onChange(`${network.name}`);
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
            background={
              showResults ? "backgroundHighlight !important" : "inputBg"
            }
            type="text"
            autoComplete="off"
            placeholder="Choose from a list of popular networks or add manually"
            aria-label="Search Network"
            value={searchTerm}
            outline="none"
            py={5}
            borderBottomLeftRadius={showResults ? 0 : "md"}
            borderBottomRightRadius={showResults ? 0 : "md"}
            onChange={(e) => {
              props.onChange(e.target.value);
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
          background="backgroundHighlight"
          boxShadow={"0 30px 40px rgba(0,0,0,0.2)"}
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
                  _hover={{
                    background: "blue.600",
                    color: "white",
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
                background: "blue.600",
              }}
              onClick={props.onCustomSelection}
            >
              <Text color="white" fontSize="md">
                {searchTerm}
              </Text>
              <Badge
                fontSize="14px"
                px={3}
                py={2}
                borderRadius={4}
                fontWeight={400}
              >
                {" "}
                Custom{" "}
              </Badge>
            </Flex>
          )}
        </Box>

        <FormErrorMessage> {props.errorMessage} </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
