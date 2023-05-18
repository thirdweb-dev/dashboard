import { Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useSupportedChains } from "hooks/chains/configureChains";
import { useMemo } from "react";

interface NetworkDropdownProps {
  useCleanChainName?: boolean;
  isDisabled?: boolean;
  onChange: (networksEnabled: any) => void;
}

function cleanChainName(chainName: string) {
  return chainName.replace("Mainnet", "");
}

export const NetworkDropdown: React.FC<NetworkDropdownProps> = ({
  useCleanChainName = true,
  onChange,
}) => {
  const supportedChains = useSupportedChains();

  const options = useMemo(() => {
    return supportedChains.map((chain) => {
      return {
        label: useCleanChainName
          ? cleanChainName(chain.name)
          : `${chain.name} (${chain.chainId})`,
        value: chain.chainId,
      };
    });
  }, [supportedChains, useCleanChainName]);

  return (
    <Flex gap={2} alignItems="center" w="full">
      <Select
        placeholder="Select networks"
        isMulti
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
        options={options}
        onChange={(selectedNetworks) => {
          onChange(selectedNetworks.map(({ value }) => value));
        }}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: "full",
          }),
        }}
      />
    </Flex>
  );
};
