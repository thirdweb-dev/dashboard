import { ChainListNetworkInfo } from "./types";
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
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { RefCallBack } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { Badge, FormErrorMessage, FormLabel, Text } from "tw-components";

// TODO @manan: now that we're maintaining a chains package we should rely on that here, and probably make a proper search api route with that package
const fetchChainList = async (): Promise<ChainListNetworkInfo[]> => {
  const response = await fetch("/json/chain-list-mini.json");
  return response.json();
};

interface SearchNetworksProps {
  onNetworkSelection: (network: ChainListNetworkInfo, custom: boolean) => void;
  onCustomSelection: () => void;
  onSelectorChange: (status: "open" | "close") => void;
  inputRef: React.RefObject<HTMLInputElement> | RefCallBack;
  isInvalid: boolean;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  shortName: string;
}

export const SearchNetworks: React.FC<SearchNetworksProps> = (props) => {
  const networkListQuery = useQuery(["network-list-mini"], fetchChainList);
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
    if (!searchTerm || !networkListQuery.data) {
      return networkListQuery.data || [];
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return networkListQuery.data.filter(
      (network) =>
        network.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        `${network.chainId}`.includes(lowerCaseSearchTerm),
    );
  }, [networkListQuery.data, searchTerm]);

  const handleSelection = (network: ChainListNetworkInfo, custom: boolean) => {
    props.onChange(`${network.name}`);
    setShowResults(false);
    props.onSelectorChange("close");
    props.onNetworkSelection(network, custom);
  };

  return (
    <Box>
      <FormControl isInvalid={props.isInvalid}>
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
          <Text
            mt={1}
            fontSize="14px"
            position="absolute"
            top="4px"
            right="40px"
            zIndex={100}
          >
            {searchTerm
              ? props.shortName.length > 15
                ? `${props.shortName.slice(0, 15)}...`
                : props.shortName
              : ""}
          </Text>
          <Input
            ref={props.inputRef}
            background="backgroundHighlight !important"
            type="text"
            autoComplete="off"
            placeholder="Choose from a list of popular networks or add manually"
            aria-label="Search Network"
            value={searchTerm}
            outline="none"
            py={5}
            border="none !important"
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
              children={<Icon color="white" as={BiChevronDown} />}
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
            borderTop="1px solid rgba(255, 255, 255, 0.1)"
            pt={4}
            pb={4}
          >
            {networkListQuery.isLoading && <Text>Loading...</Text>}
            {networkListQuery.isError && <Text> Error </Text>}
            {networkListQuery.isSuccess &&
              filteredNetworks.map((network) => (
                <Text
                  px={4}
                  py={2}
                  key={network.name}
                  cursor="pointer"
                  color="white"
                  display="flex"
                  _hover={{
                    background: "blue.700",
                    color: "white",
                  }}
                  onClick={() => {
                    handleSelection(network, false);
                  }}
                >
                  {network.name}{" "}
                  <Text as="span" opacity={0.8} ml="auto">
                    {network.shortName}
                  </Text>
                </Text>
              ))}

            {networkListQuery.isSuccess && filteredNetworks.length === 0 && (
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
              borderTop="1px solid rgba(255, 255, 255, 0.1)"
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

        <FormErrorMessage> Network Name is Required </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
