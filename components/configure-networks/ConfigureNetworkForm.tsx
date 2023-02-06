import { SearchNetworks } from "./SearchNetworks";
import {
  Alert,
  AlertIcon,
  Box,
  Code,
  Flex,
  FormControl,
  Icon,
  Input,
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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import { SolidityStringInput } from "contract-ui/components/solidity-inputs/string-input";
import { useAllChainsData } from "hooks/chains/allChains";
import { useConfiguredChainsNameRecord } from "hooks/chains/configureChains";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsQuestionCircle } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import {
  Button,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
} from "tw-components";

export type NetworkConfigFormData = {
  name: string;
  rpcUrl: string;
  chainId: string;
  currencySymbol: string;
  type: "testnet" | "mainnet";
  isCustom: boolean;
  icon: string;
  slug: string;
};

interface NetworkConfigFormProps {
  values?: NetworkConfigFormData;
  onSubmit: (chain: StoredChain) => void;
  onRemove?: () => void;
  prefillSlug?: string;
  prefillChainId?: string;
  variant: "custom" | "search" | "edit";
}

export const ConfigureNetworkForm: React.FC<NetworkConfigFormProps> = ({
  values,
  onSubmit,
  onRemove,
  prefillSlug,
  prefillChainId,
  variant,
}) => {
  const [selectedChain, setSelectedChain] = useState<StoredChain | undefined>();
  const { chainIdToChainRecord, slugToChainRecord } = useAllChainsData();
  const [isSearchOpen, setIsSearchOpen] = useState(variant === "search");
  const configuredChainNameRecord = useConfiguredChainsNameRecord();
  const deletePopover = useDisclosure();

  const form = useForm<NetworkConfigFormData>({
    values: {
      name: values?.name || "",
      rpcUrl: values?.rpcUrl || "",
      chainId: values?.chainId || prefillChainId || "",
      currencySymbol: values?.currencySymbol || "",
      type: values?.type === "testnet" ? "testnet" : "mainnet",
      isCustom: values ? values.isCustom : variant === "custom",
      icon: values?.icon || "",
      slug: values?.slug || prefillSlug || "",
    },
    mode: "onChange",
  });

  const { name, isCustom, chainId: chainIdStr, slug } = form.watch();
  const chainId = Number(chainIdStr);

  const { ref } = form.register("name", {
    required: true,
    validate: {
      alreadyAdded(value) {
        // return true to pass the validation, false to fail

        // ignore this validation if form is for edit screen
        if (variant === "edit") {
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

  const hideOtherFields = variant === "search" && !selectedChain;

  function reset() {
    form.reset();
    setSelectedChain(undefined);
    if (variant === "search") {
      setIsSearchOpen(true);
    }
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

    if (variant !== "edit") {
      reset();
    }
  });

  const networkNameErrorMessage =
    form.formState.errors.name &&
    (form.formState.errors.name.type === "alreadyAdded"
      ? "Network already added"
      : "Network name is required");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return handleSubmit(e);
      }}
    >
      {variant === "search" && (
        <SearchNetworks
          keepOpen={hideOtherFields}
          onChange={(value) => {
            form.setValue("name", value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          value={name}
          errorMessage={networkNameErrorMessage}
          inputRef={ref}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          onNetworkSelection={(network) => {
            form.clearErrors();
            form.setValue("name", network.name);
            form.setValue("rpcUrl", network.rpc[0]);
            form.setValue("chainId", `${network.chainId}`);
            form.setValue("currencySymbol", network.nativeCurrency.symbol);
            form.setValue("isCustom", false);
            form.setValue("type", network.testnet ? "testnet" : "mainnet");
            form.setValue("icon", network.icon?.url || "");
            form.setValue("slug", network.slug);
            setSelectedChain(network);
          }}
        />
      )}

      {/* Network Name for Custom Network */}
      {variant !== "search" && (
        <FormControl isRequired isInvalid={!!networkNameErrorMessage}>
          <FormLabel>Network Name</FormLabel>
          <Input
            autoComplete="off"
            placeholder="e.g. My Network"
            _placeholder={{
              fontWeight: 500,
            }}
            type="text"
            onChange={(e) => {
              form.setValue("name", e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              if (e.target.value.includes("test")) {
                form.setValue("type", "testnet");
              }
            }}
            ref={ref}
          />

          <FormErrorMessage>{networkNameErrorMessage}</FormErrorMessage>
        </FormControl>
      )}

      {/* Slug URL */}
      <FormControl
        hidden={hideOtherFields}
        isRequired
        mt={6}
        isInvalid={form.formState.errors.slug?.type === "taken"}
      >
        <FormLabel display="flex">
          Network ID
          <Tooltip
            placement="top-start"
            borderRadius="md"
            boxShadow="md"
            bg="backgroundHighlight"
            p={4}
            minW={{ md: "500px" }}
            label={
              <>
                <Text color="heading" mb={4}>
                  Network ID is used to identify the network in the URL{" "}
                </Text>
                <Heading fontSize="14px" mb={3}>
                  Example
                </Heading>
                <Code>{`thirdweb.com/<network-id>/<contract-address>`}</Code>
              </>
            }
          >
            <Box>
              <Icon ml={2} mr={1} as={BsQuestionCircle} color="accent.600" />
            </Box>
          </Tooltip>
        </FormLabel>
        <Input
          disabled={!isCustom}
          autoComplete="off"
          placeholder="e.g. ethereum"
          _placeholder={{
            fontWeight: 500,
          }}
          type="text"
          {...form.register("slug", {
            required: true,
            validate: {
              taken: (_slug) => {
                if (!isCustom) {
                  return true;
                }

                return !(_slug in slugToChainRecord);
              },
            },
          })}
        />

        <FormErrorMessage>
          Can not use Network ID {`"${slug}"`}.
          {slug && slug in slugToChainRecord && (
            <>
              {" "}
              It is being used by {`"`}
              {slugToChainRecord[slug].name}
              {`"`}
            </>
          )}
        </FormErrorMessage>
      </FormControl>

      <Flex
        hidden={hideOtherFields}
        opacity={isSearchOpen ? "0.1" : "1"}
        direction="column"
        gap={6}
        mt={6}
      >
        {/* Chain ID + Currency Symbol */}
        <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
          {/* Chain ID */}
          <FormControl
            isRequired
            isInvalid={form.formState.errors.chainId?.type === "taken"}
          >
            <FormLabel>Chain ID</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="e.g. 152"
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

                    return !(_chainId in chainIdToChainRecord);
                  },
                },
              })}
            />
            <FormErrorMessage>
              Can not use ChainID {`"${chainId}"`}.
              {chainId && chainId in chainIdToChainRecord && (
                <>
                  <br /> It is being used by {`"`}
                  {chainIdToChainRecord[chainId].name}
                  {`"`}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          {/* Currency Symbol */}
          <FormControl isRequired>
            <FormLabel>Currency Symbol</FormLabel>
            <Input
              disabled={!isCustom}
              placeholder="e.g. ETH"
              autoComplete="off"
              _placeholder={{
                fontWeight: 500,
              }}
              type="text"
              {...form.register("currencySymbol", { required: true })}
            />
          </FormControl>
        </SimpleGrid>

        {/* Testnet / Mainnet */}
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
            <Stack direction="row" gap={4} mt={3}>
              <Radio value="testnet">Testnet</Radio>
              <Radio value="mainnet">Mainnet</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* RPC URL */}
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
            mt={2}
            fontSize="12px"
            color="paragraph"
          >
            <AlertIcon as={IoWarning} color="inherit" />
            Only add custom networks that you trust. <br /> Malicious RPCs can
            record activity and lie about the state of the network.
          </Alert>
        </FormControl>

        {/* Icon URL */}
        <FormControl isInvalid={!!form.formState.errors.icon}>
          <FormLabel>Icon</FormLabel>

          <Flex gap={2}>
            <SolidityStringInput
              formContext={form}
              solidityName="ipfs"
              solidityType="ipfs"
              placeholder="ipfs://..."
              autoComplete="off"
              _placeholder={{
                fontWeight: 500,
              }}
              {...form.register("icon", {
                validate: (str) => str === "" || str.startsWith("ipfs://"),
              })}
            />
            <Flex
              bg="inputBg"
              justifyContent="center"
              alignItems="center"
              p={2}
              borderRadius="md"
            >
              <ChainIcon size={22} ipfsSrc={form.watch("icon")} />
            </Flex>
          </Flex>
          <FormErrorMessage> Invalid IPFS URL </FormErrorMessage>
        </FormControl>

        {/* Buttons  */}
        <Flex
          mt={8}
          gap={4}
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          {/* Remove Button */}
          {variant === "edit" && (
            <Popover
              isOpen={deletePopover.isOpen}
              onOpen={deletePopover.onOpen}
              onClose={deletePopover.onClose}
            >
              <PopoverTrigger>
                <Button variant="outline">Remove Network</Button>
              </PopoverTrigger>
              <PopoverContent
                bg="backgroundBody"
                mb={3}
                boxShadow="0 0px 20px rgba(0, 0, 0, 0.15)"
              >
                <PopoverArrow bg="backgroundBody" />
                <PopoverCloseButton />
                <PopoverHeader border="none"> Are you sure? </PopoverHeader>
                <PopoverFooter
                  border="none"
                  p={4}
                  mt={2}
                  display="flex"
                  gap={3}
                >
                  <Button colorScheme="red" onClick={onRemove}>
                    Remove
                  </Button>
                  <Button onClick={deletePopover.onClose} variant="outline">
                    Cancel
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          )}

          {/* Add / Update Button */}
          <Button
            background="bgBlack"
            color="bgWhite"
            _hover={{
              background: "bgBlack",
            }}
            type="submit"
            disabled={variant === "edit" && !form.formState.isDirty}
          >
            {variant === "edit" ? "Update Network" : "Add Network"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
