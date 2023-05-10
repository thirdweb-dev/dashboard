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
import { Chain } from "@thirdweb-dev/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { useSupportedChains } from "hooks/chains/configureChains";
import { useMemo, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Button, Text } from "tw-components";

export const NetworkSelectDropdown: React.FC<{
  disabledChainIds?: number[];
  isDisabled?: boolean;
  onSelect?: (chain: Chain) => void;
}> = (props) => {
  const supportedChains = useSupportedChains();

  const { disabledChainIds } = props;

  const chains = useMemo(() => {
    if (disabledChainIds && disabledChainIds.length > 0) {
      const disabledChainIdsSet = new Set(disabledChainIds);
      return supportedChains.filter(
        (chain) => !disabledChainIdsSet.has(chain.chainId),
      );
    }
    return supportedChains;
  }, [supportedChains, disabledChainIds]);
  const { onSelect } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Chain | undefined>(
    undefined,
  );
  const [searchText, setSearchText] = useState<string>("");

  const options = useMemo(() => {
    if (!searchText) {
      return popularChains;
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
  }, [chains, searchText]);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchText(event.target.value);
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
    setSearchText("");
  };

  const onClose = () => {
    setSearchText("");
    setIsOpen(false);
  };

  return (
    <>
      <Flex gap={2}>
        <Button
          isDisabled={props.isDisabled}
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
          }}
          onClick={() => {
            setIsOpen(true);
          }}
          leftIcon={<ChainIcon ipfsSrc={selectedOption?.icon?.url} size={20} />}
        >
          <Text size="lg">{selectedOption?.name || "Filter by Network"}</Text>
          <BiChevronDown
            style={{
              marginLeft: "auto",
            }}
          />
        </Button>
        {selectedOption && (
          <IconButton
            variant="ghost"
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
                    <Flex>{option.name}</Flex>
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
