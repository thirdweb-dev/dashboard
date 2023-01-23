import { ConfiguredNetworkInfo } from "./types";
import { Box, Divider, FormControl, Input } from "@chakra-ui/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, FormLabel } from "tw-components";

interface NetworkConfigFormProps {
  configuredNetworks: ConfiguredNetworkInfo[];
  values?: ConfiguredNetworkInfo;
  onSubmit: (data: ConfiguredNetworkInfo) => void;
  isSearchResultsOpen: boolean;
}

export const ConfigureNetworkForm: React.FC<NetworkConfigFormProps> = ({
  values,
  onSubmit,
  configuredNetworks,
  isSearchResultsOpen,
}) => {
  const form = useForm<ConfiguredNetworkInfo>({
    values,
    reValidateMode: "onChange",
  });

  const name = form.watch("name");

  const isNetworkAlreadyAdded = useMemo(() => {
    return configuredNetworks.some(
      (configuredNetwork) => configuredNetwork.name === name,
    );
  }, [name, configuredNetworks]);
  return (
    <Box
      as="form"
      display="flex"
      gap={6}
      flexDirection="column"
      onSubmit={form.handleSubmit((data) => onSubmit(data))}
      opacity={isSearchResultsOpen ? "0.1" : "1"}
    >
      {/* name */}
      <FormControl isRequired>
        <FormLabel>Network Name</FormLabel>
        <Input
          background="backgroundHighlight"
          type="text"
          {...form.register("name", {
            required: true,
          })}
        />
      </FormControl>

      {/* rpcUrl */}
      <FormControl isRequired>
        <FormLabel>RPC URL</FormLabel>
        <Input
          background="backgroundHighlight"
          type="text"
          {...form.register("rpcUrl", { required: true })}
        />
      </FormControl>

      {/* chainId */}
      <FormControl isRequired>
        <FormLabel>Chain ID</FormLabel>
        <Input
          background="backgroundHighlight"
          type="text"
          {...form.register("chainId", { required: true, valueAsNumber: true })}
        />
      </FormControl>

      {/* currencySymbol */}
      <FormControl isRequired>
        <FormLabel>Currency Symbol</FormLabel>
        <Input
          background="backgroundHighlight"
          type="text"
          {...form.register("currencySymbol", { required: true })}
        />
      </FormControl>

      <Divider />

      {/* Configure and Reset buttons  */}
      <Button
        colorScheme={"blue"}
        type="submit"
        disabled={isNetworkAlreadyAdded && !form.formState.isDirty}
      >
        {isNetworkAlreadyAdded ? "Update Network" : "Add Network"}
      </Button>
    </Box>
  );
};
