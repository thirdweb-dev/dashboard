import { popularChains } from "@3rdweb-sdk/react/components/popularChains";
import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import { useSupportedChains } from "hooks/chains/configureChains";
import { useMemo, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Button, Text } from "tw-components";

export const NetworkSelectDropdown: React.FC<{
  enabledChainIds?: number[];
  disabledChainIds?: number[];
  useCleanChainName?: boolean;
  isDisabled?: boolean;
  onSelect?: (chain: StoredChain | undefined) => void;
}> = (props) => {
  const supportedChains = useSupportedChains();

  const { enabledChainIds, disabledChainIds, useCleanChainName } = props;

  const chains = useMemo(() => {
    // return only enabled chains if enabled chains are specified
    if (enabledChainIds && enabledChainIds.length > 0) {
      const enabledChainIdsSet = new Set(enabledChainIds);
      return supportedChains.filter((chain) =>
        enabledChainIdsSet.has(chain.chainId),
      );
    }
    // return supported chains that are not disabled if disabled chains are specified
    if (disabledChainIds && disabledChainIds.length > 0) {
      const disabledChainIdsSet = new Set(disabledChainIds);
      return supportedChains.filter(
        (chain) => !disabledChainIdsSet.has(chain.chainId),
      );
    }
    // if no enabled or disabled chains are specified, return all supported chains
    return supportedChains;
  }, [supportedChains, enabledChainIds, disabledChainIds]);
  const { onSelect } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<StoredChain | undefined>(
    undefined,
  );
  const [searchText, setSearchText] = useState<string>("");

  const options = useMemo(() => {
    if (!searchText) {
      // if no search text, return enabled chains if enabled chains are specified
      return enabledChainIds?.length ? chains : popularChains;
    } else {
      return chains
        .filter(
          (c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()) ||
            c.nativeCurrency?.symbol
              ?.toLowerCase()
              .includes(searchText.toLowerCase()),
        )
        .slice(0, 50);
    }
  }, [chains, enabledChainIds?.length, searchText]);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchText(event.target.value);
  };

  const handleSelection = (option: StoredChain | undefined) => {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
    setSearchText("");
  };

  const onClose = () => {
    setSearchText("");
    setIsOpen(false);
  };

  const cleanChainName = (chainName: string) => {
    return chainName.replace("Mainnet", "");
  };

  return (
    <>
      <Flex gap={2} alignItems="center">
        <Button
          isDisabled={props.isDisabled}
          display="flex"
          bg="inputBg"
          _hover={{
            bg: "inputBgHover",
          }}
          variant="solid"
          style={{
            textAlign: "left",
            justifyContent: "start",
            alignItems: "center",
            gap: "0.5rem",
            height: "32px",
          }}
          leftIcon={<ChainIcon ipfsSrc={selectedOption?.icon?.url} size={20} />}
        >
          <Text
            onClick={() => {
              setIsOpen(true);
            }}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {!selectedOption
              ? "All Networks"
              : useCleanChainName
              ? cleanChainName(selectedOption.name)
              : selectedOption.name}
          </Text>
          <BiChevronDown
            style={{
              marginLeft: "auto",
            }}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </Button>
        {selectedOption && (
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Clear network filter"
            icon={<CloseButton />}
            onClick={() => {
              handleSelection(undefined);
            }}
          />
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded={"2xl"} padding={2}>
          <ModalHeader>Select Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={480} overflowY={"scroll"}>
            <Box>
              <Input
                placeholder="Search..."
                size="lg"
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <Flex flexDirection="column" gap={4} marginY={4}>
                {options.map((option) => (
                  <Button
                    key={option.chainId}
                    display="flex"
                    bg="inputBg"
                    _hover={{
                      bg: "inputBgHover",
                    }}
                    width="100%"
                    variant="solid"
                    style={{
                      textAlign: "left",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "0.5rem",
                      height: "56px",
                    }}
                    onClick={() => handleSelection(option)}
                    leftIcon={
                      <ChainIcon ipfsSrc={option?.icon?.url} size={20} />
                    }
                  >
                    <Flex>
                      {useCleanChainName
                        ? cleanChainName(option.name)
                        : option.name}
                    </Flex>
                  </Button>
                ))}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
