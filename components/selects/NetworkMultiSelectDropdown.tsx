import { popularChains } from "@3rdweb-sdk/react/components/popularChains";
import {
  Box,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import {
  Chain,
  useActiveChain,
  useWallet,
} from "@thirdweb-dev/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { useSupportedChains } from "hooks/chains/configureChains";
import {
  useAddRecentlyUsedChainId,
} from "hooks/chains/recentlyUsedChains";
import { useSetIsNetworkConfigModalOpen } from "hooks/networkConfigModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Button } from "tw-components";

export const NetworkMultiSelectDropdown: React.FC<{
  disabledChainIds?: number[];
  isDisabled?: boolean;
  onSelect?: (chain: Chain) => void;
}> = (props) => {
  const addRecentlyUsedChains = useAddRecentlyUsedChainId();
  const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();
  const { colorMode } = useColorMode();
  const supportedChains = useSupportedChains();

  const { disabledChainIds } = props;

  const chains = useMemo(() => {
    if (disabledChainIds && disabledChainIds.length > 0) {
      const disabledChainIdsSet = new Set(disabledChainIds);
      return supportedChains.filter(
        (chain) => !disabledChainIdsSet.has(chain.chainId),
      );
    }
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
      return supportedChains
        .filter(
          (c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()) ||
            c.nativeCurrency?.symbol
              ?.toLowerCase()
              .includes(searchText.toLowerCase()),
        )
        .slice(0, 5);
    }
  }, [supportedChains, searchText]);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onClose = () => {
    setSearchText("");
    setIsOpen(false);
  };

  return (
    <>
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
          height: "56px",
        }}
        onClick={() => {
          setIsOpen(true);
        }}
        leftIcon={<ChainIcon ipfsSrc={selectedOption?.icon?.url} size={20} />}
      >
        {selectedOption?.name || "Filter by Network"}

        <BiChevronDown
          style={{
            marginLeft: "auto",
          }}
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
                    onClick={() => {
                      setSelectedOption(option);
                      onSelect?.(option);
                      setIsOpen(false);
                      setSearchText("");
                    }}
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
