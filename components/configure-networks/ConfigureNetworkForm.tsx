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
import { useConfiguredChainsNameSet } from "hooks/chains/configureChains";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { Button, FormErrorMessage, FormLabel } from "tw-components";

export type NetworkConfigFormData = {
  name: string;
  rpcUrl: string;
  chainId: string;
  currencySymbol: string;
  type: "testnet" | "mainnet";
  slug: string;
  shortName: string;
  isCustom: boolean;
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
      slug: values?.slug || "",
      shortName: values?.shortName || "",
    },
    // reValidateMode: "onChange",
    mode: "onChange",
  });

  const configuredChainNameRecord = useConfiguredChainsNameSet();

  const { ref } = form.register("name", {
    required: true,
    validate: {
      isAlreadyAdded(value) {
        if (isEditingScreen) {
          return true;
        }
        return !configuredChainNameRecord.has(value);
      },
    },
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const name = form.watch("name");
  const isCustom = form.watch("isCustom");

  // for custom network, network slug "shortName" needs to be generated
  useEffect(() => {
    if (isCustom) {
      form.setValue("slug", name.replace(/\s/g, ""));
    }
  }, [name, isCustom, form]);

  return (
    <Box
      as="form"
      onSubmit={form.handleSubmit((data) => {
        onSubmit(data);
        if (!isEditingScreen) {
          form.reset();
        }
      })}
    >
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
        errorMessage={
          form.formState.errors.name &&
          (form.formState.errors.name.type === "isAlreadyAdded"
            ? "Network already added"
            : "Network name is required")
        }
        inputRef={ref}
        onSelectorChange={(status) => {
          setIsSearchOpen(status === "open");
        }}
        onCustomSelection={() => {
          const _name = form.getValues().name;
          form.reset();
          form.setValue("isCustom", true);
          form.setValue("name", _name);
        }}
        onNetworkSelection={(_networkInfo) => {
          form.setValue("name", _networkInfo.name);
          form.setValue("rpcUrl", _networkInfo.rpc[0]);
          form.setValue("chainId", `${_networkInfo.chainId}`);
          form.setValue("currencySymbol", _networkInfo.nativeCurrency.symbol);
          form.setValue("isCustom", false);
          form.setValue("slug", _networkInfo.slug);
          form.setValue("type", _networkInfo.testnet ? "testnet" : "mainnet");
          form.setValue("shortName", _networkInfo.shortName);
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
              type="number"
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
            autoComplete="off"
            background="backgroundHighlight"
            placeholder="https://"
            type="url"
            {...form.register("rpcUrl", {
              required: true,
              validate: {
                isValidUrl: (value) => {
                  try {
                    new URL(value);
                    return true;
                  } catch (e) {
                    return false;
                  }
                },
              },
            })}
          />

          <FormErrorMessage fontSize="12px">Invalid RPC URL</FormErrorMessage>

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
