import { SearchNetworks } from "./SearchNetworks";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import { useAllChainsRecord } from "hooks/chains/allChains";
import { useConfiguredChainsNameRecord } from "hooks/chains/configureChains";
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
  isCustom: boolean;
  icon: string;
};

interface NetworkConfigFormProps {
  values?: NetworkConfigFormData;
  onSubmit: (chain: StoredChain) => void;
  onRemove: () => void;
  isEditingScreen: boolean;
}

export const ConfigureNetworkForm: React.FC<NetworkConfigFormProps> = ({
  values,
  onSubmit,
  onRemove,
  isEditingScreen,
}) => {
  const [selectedChain, setSelectedChain] = useState<StoredChain | undefined>();
  const allChainsRecord = useAllChainsRecord();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const configuredChainNameRecord = useConfiguredChainsNameRecord();

  const form = useForm<NetworkConfigFormData>({
    values: {
      name: values?.name || "",
      rpcUrl: values?.rpcUrl || "",
      chainId: values?.chainId || "",
      currencySymbol: values?.currencySymbol || "",
      type: values?.type === "testnet" ? "testnet" : "mainnet",
      isCustom: values ? values.isCustom : true,
      icon: values?.icon || "",
    },
    mode: "onChange",
  });

  const { name, isCustom, chainId: chainIdStr } = form.watch();
  const chainId = Number(chainIdStr);

  const { ref } = form.register("name", {
    required: true,
    validate: {
      alreadyAdded(value) {
        // return true to pass the validation, false to fail

        // ignore this validation if form is for edit screen
        if (isEditingScreen) {
          return true;
        }

        const chain = configuredChainNameRecord[value];

        // valid if chain is not found
        if (!chain) {
          return true;
        }

        // valid if chain found, but is autoconfigured
        if (chain.isAutoConfigured) {
          return true;
        }

        // invalid if chain found, and is not autoconfigured
        return false;
      },
    },
  });

  function reset() {
    form.reset();
    setSelectedChain(undefined);
  }

  const handleSubmit = form.handleSubmit((data) => {
    let configuredNetwork: StoredChain;

    // if user selected a chain from the list
    // use that chain as base and override the values from the form
    if (selectedChain) {
      configuredNetwork = {
        ...selectedChain,
        name: data.name,
        isCustom: data.isCustom ? true : undefined,
        rpc: [data.rpcUrl],
        chainId: parseInt(data.chainId),
        nativeCurrency: {
          ...selectedChain.nativeCurrency,
          symbol: data.currencySymbol,
        },
        icon: selectedChain.icon
          ? {
              ...selectedChain.icon,
              url: data.icon,
            }
          : {
              url: data.icon,
              // we don't care about these fields - adding dummy values
              width: 50,
              height: 50,
              format: "",
            },
        testnet: data.type === "testnet",
      };
    } else {
      const slug = name.toLowerCase().replace(/\s/g, "-");

      // if user selected the custom option
      configuredNetwork = {
        name: data.name,
        isCustom: data.isCustom ? true : undefined,
        rpc: [data.rpcUrl],
        chainId: parseInt(data.chainId),
        nativeCurrency: {
          symbol: data.currencySymbol,
          name: data.currencySymbol,
          decimals: 18,
        },
        testnet: data.type === "testnet",
        shortName: slug,
        slug,
        // we don't care about this field
        chain: "",
        icon: data.icon
          ? {
              url: data.icon,
              width: 50,
              height: 50,
              format: "",
            }
          : undefined,
      };
    }

    onSubmit(configuredNetwork);

    if (!isEditingScreen) {
      reset();
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
        disabled={isEditingScreen}
        errorMessage={
          form.formState.errors.name &&
          (form.formState.errors.name.type === "alreadyAdded"
            ? "Network already added"
            : "Network name is required")
        }
        inputRef={ref}
        onSelectorChange={(status) => {
          setIsSearchOpen(status === "open");
        }}
        onCustomSelection={() => {
          // save value before resetting the form
          const _name = form.getValues().name;
          reset();
          // set custom true
          form.setValue("isCustom", true);
          // restore the name
          form.setValue("name", _name);
        }}
        onNetworkSelection={(network) => {
          form.setValue("name", network.name);
          form.setValue("rpcUrl", network.rpc[0]);
          form.setValue("chainId", `${network.chainId}`);
          form.setValue("currencySymbol", network.nativeCurrency.symbol);
          form.setValue("isCustom", false);
          form.setValue("type", network.testnet ? "testnet" : "mainnet");
          form.setValue("icon", network.icon?.url || "");
          setSelectedChain(network);
        }}
      />
      <Flex
        opacity={isSearchOpen ? "0.1" : "1"}
        direction="column"
        gap={10}
        mt={8}
      >
        <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
          {/* chainId */}
          <FormControl
            isRequired
            isInvalid={form.formState.errors.chainId?.type === "taken"}
          >
            <FormLabel>Chain ID</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="eg: 1, 5, 127..."
              autoComplete="off"
              _placeholder={{
                fontWeight: 500,
              }}
              type="number"
              {...form.register("chainId", {
                required: true,
                validate: {
                  taken: (str) => {
                    // if adding a custom network, validate that the chainId is not already taken

                    if (!isCustom) {
                      return true;
                    }
                    const _chainId = Number(str);
                    if (!_chainId) {
                      return true;
                    }

                    return !(_chainId in allChainsRecord);
                  },
                },
              })}
            />
            <FormErrorMessage>
              Can not use ChainID {`"${chainId}"`}.
              {chainId && chainId in allChainsRecord && (
                <>
                  <br /> It is being used by {`"`}
                  {allChainsRecord[chainId].name}
                  {`"`}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          {/* currencySymbol */}
          <FormControl isRequired>
            <FormLabel>Currency Symbol</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="eg: ETH, USDC, MATIC..."
              autoComplete="off"
              _placeholder={{
                fontWeight: 500,
              }}
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
            _placeholder={{
              fontWeight: 500,
            }}
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

        {/* icon url */}
        <FormControl isInvalid={!!form.formState.errors.icon}>
          <FormLabel>Icon</FormLabel>
          <InputGroup>
            <Input
              placeholder="ipfs://..."
              autoComplete="off"
              _placeholder={{
                fontWeight: 500,
              }}
              type="text"
              {...form.register("icon", {
                validate: (str) => str === "" || str.startsWith("ipfs://"),
              })}
            />

            <InputLeftElement>
              <ChainIcon size={22} ipfsSrc={form.watch("icon")} />
            </InputLeftElement>
          </InputGroup>

          <FormErrorMessage> Invalid IPFS URL </FormErrorMessage>
        </FormControl>

        <Flex
          mt={8}
          gap={4}
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          {isEditingScreen && (
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Remove Network</Button>
              </PopoverTrigger>
              <PopoverContent bg="backgroundBody" mb={3}>
                <PopoverArrow bg="backgroundBody" />
                <PopoverCloseButton />
                <PopoverHeader border="none"> Are you sure? </PopoverHeader>
                <PopoverFooter border="none" p={4} display="flex" gap={3}>
                  <Button colorScheme="red" onClick={onRemove}>
                    Remove
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
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
