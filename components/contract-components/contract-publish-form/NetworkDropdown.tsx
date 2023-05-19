import { Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useSupportedChains } from "hooks/chains/configureChains";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

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
  const form = useFormContext();
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

  const defaultValues = useMemo(() => {
    return options.filter(({ value }) =>
      form.watch("networksForDeployment.networksEnabled")?.includes(value),
    );
  }, [form, options]);

  return (
    <Flex gap={2} alignItems="center" w="full">
      <Select
        placeholder="Select networks"
        isMulti
        selectedOptionStyle="check"
        hideSelectedOptions={false}
        options={options}
        defaultValue={defaultValues}
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
