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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { Button, FormErrorMessage, FormLabel } from "tw-components";

export type NetworkConfigFormData = {
  name: string;
  rpcUrl: string;
  chainId: string;
  currencySymbol: string;
  type: "testnet" | "mainnet";
  // internally managed - not visible in form
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
      isCustom: values ? values.isCustom : true,
      slug: values?.slug || "",
      shortName: values?.shortName || "",
    },
    mode: "onChange",
  });

  const configuredChainNameRecord = useConfiguredChainsNameSet();

  const { ref } = form.register("name", {
    required: true,
    validate: {
      isAlreadyAdded(value) {
        // ignore this validation if form is for edit screen
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

  const handleSubmit = form.handleSubmit((data) => {
    // for custom chain, create slug and shortName
    if (data.isCustom) {
      const slug = isCustom
        ? name.toLowerCase().replace(/\s/g, "-")
        : form.watch("slug");

      data.shortName = slug;
      data.slug = slug;
    }

    onSubmit(data);

    if (!isEditingScreen) {
      form.reset();
    }
  });

  return (
    <Box as="form" onSubmit={handleSubmit}>
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
            color="paragraph"
          >
            <AlertIcon as={IoWarning} color="inherit" />
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
            background="bgBlack"
            color="bgWhite"
            _hover={{
              background: "bgBlack",
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
