import { SearchNetworks } from "./SearchNetworks";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { Button, FormErrorMessage, FormLabel } from "tw-components";

export type NetworkConfigFormData = {
  name: string;
  rpcUrl: string;
  chainId: string | number;
  currencySymbol: string;
  type: "testnet" | "mainnet";
  isCustom: boolean;
  shortName: string;
};

interface NetworkConfigFormProps {
  values?: NetworkConfigFormData;
  onSubmit: (data: NetworkConfigFormData) => void;
  onRemove: () => void;
  isEditingScreen: boolean;
}

export const ConfigureNetworkForm: React.FC<NetworkConfigFormProps> = ({
  values,
  onSubmit,
  onRemove,
  isEditingScreen,
}) => {
  const form = useForm<NetworkConfigFormData>({
    values: {
      name: values?.name || "",
      rpcUrl: values?.rpcUrl || "",
      chainId: values?.chainId || "",
      currencySymbol: values?.currencySymbol || "",
      type: values?.type === "testnet" ? "testnet" : "mainnet",
      // default true, because the initial screen is for adding network
      isCustom: values ? values.isCustom : true,
      shortName: values?.shortName || "",
    },
    reValidateMode: "onChange",
  });

  const { ref } = form.register("name", { required: true });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const name = form.watch("name");
  const isCustom = form.watch("isCustom");

  const isRpcEmpty = form.watch("rpcUrl") === "";

  // only allow editing rpc url if it's empty in chainList or user creating a custom network
  const allowEditingRpcUrl = isRpcEmpty ? true : isCustom;

  // for custom network, network slug "shortName" needs to be generated
  useEffect(() => {
    if (isCustom) {
      form.setValue("shortName", name.replace(/\s/g, ""));
    }
  }, [name, isCustom, form]);

  return (
    <Box as="form" onSubmit={form.handleSubmit((data) => onSubmit(data))}>
      <SearchNetworks
        onChange={(value) => {
          form.setValue("name", value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        value={name}
        shortName={form.watch("shortName")}
        disabled={isEditingScreen}
        isInvalid={!!form.formState.errors.name}
        inputRef={ref}
        onSelectorChange={(status) => {
          setIsSearchOpen(status === "open");
        }}
        onCustomSelection={() => {
          form.setValue("isCustom", true);
        }}
        onNetworkSelection={(_networkInfo) => {
          form.setValue("name", _networkInfo.name);
          form.setValue("rpcUrl", _networkInfo.rpc[0]);
          form.setValue("chainId", `${_networkInfo.chainId}`);
          form.setValue("currencySymbol", _networkInfo.nativeCurrency.symbol);
          form.setValue("isCustom", false);
          form.setValue("shortName", _networkInfo.shortName);
          form.setValue(
            "type",
            _networkInfo.name.toLowerCase().includes("test")
              ? "testnet"
              : "mainnet",
          );
        }}
      />
      <Flex
        opacity={isSearchOpen ? "0.1" : "1"}
        direction="column"
        gap={10}
        mt={6}
      >
        <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
          {/* chainId */}
          <FormControl isRequired>
            <FormLabel>Chain ID</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="eg: 1, 5, 127..."
              autoComplete="off"
              background="backgroundHighlight"
              type="text"
              {...form.register("chainId", {
                required: true,
              })}
            />
          </FormControl>

          {/* currencySymbol */}
          <FormControl isRequired>
            <FormLabel>Currency Symbol</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="eg: ETH, USDC, MATIC..."
              autoComplete="off"
              background="backgroundHighlight"
              type="text"
              {...form.register("currencySymbol", { required: true })}
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Network Type</FormLabel>
          <RadioGroup
            onChange={(value: "testnet" | "mainnet") => {
              form.setValue("type", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            value={form.watch("type")}
          >
            <Stack direction="row" gap={4} mt={4}>
              <Radio value="testnet">Testnet</Radio>
              <Radio value="mainnet">Mainnet</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* rpcUrl */}
        <FormControl isRequired isInvalid={!!form.formState.errors.rpcUrl}>
          <FormLabel>RPC URL</FormLabel>
          <Input
            disabled={!allowEditingRpcUrl}
            autoComplete="off"
            background="backgroundHighlight"
            placeholder="https://"
            type="url"
            {...form.register("rpcUrl", {
              required: true,
              validate: (value) => {
                try {
                  return Boolean(new URL(value));
                } catch (e) {
                  return false;
                }
              },
            })}
          />

          <FormErrorMessage fontSize="12px">Invalid RPC URL</FormErrorMessage>

          {allowEditingRpcUrl && (
            <Alert
              bg="transparent"
              p={0}
              mt={4}
              fontSize="12px"
              color="whiteAlpha.500"
            >
              <AlertIcon as={IoWarning} color="whiteAlpha.500" />
              Only add custom networks that you trust. <br /> Malicious RPCs can
              record activity and lie about the state of the network.
            </Alert>
          )}
        </FormControl>

        <Flex mt={8} gap={4} justifyContent="flex-end">
          {isEditingScreen && (
            <Button variant="outline" onClick={onRemove}>
              Remove Network
            </Button>
          )}

          <Button
            background="white"
            color="black"
            _hover={{
              background: "blue.300",
            }}
            type="submit"
            disabled={isEditingScreen && !form.formState.isDirty}
          >
            {isEditingScreen ? "Update Network" : "Add Network"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
