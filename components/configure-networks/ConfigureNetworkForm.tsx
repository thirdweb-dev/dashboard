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
import { useStorageUpload } from "@thirdweb-dev/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { FileInput } from "components/shared/FileInput";
import { StoredChain } from "contexts/configured-chains";
import { useErrorHandler } from "contexts/error-handler";
import { useAllChainsData } from "hooks/chains/allChains";
import { useConfiguredChainsNameRecord } from "hooks/chains/configureChains";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { BsQuestionCircle } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
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
      slug: values?.slug || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (prefillSlug) {
      form.setValue("slug", prefillSlug, { shouldDirty: true });
    }
  }, [prefillSlug, form]);

  const { name, isCustom, slug } = form.watch();

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
              const value = e.target.value;

              form.setValue("name", value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              if (value.includes("test")) {
                form.setValue("type", "testnet");
              }

              if (variant === "custom") {
                if (!form.formState.dirtyFields.slug) {
                  form.setValue(
                    "slug",
                    // replace all spaces with hyphens, and then strip all non-alphanumeric characters
                    value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, ""),
                  );
                }
              }
            }}
            ref={ref}
          />

          <FormErrorMessage>{networkNameErrorMessage}</FormErrorMessage>
        </FormControl>
      )}

      {/* Slug URL */}
      <NetworkIDInput form={form} hidden={hideOtherFields} />

      <Flex
        hidden={hideOtherFields}
        opacity={isSearchOpen ? "0.1" : "1"}
        direction="column"
        gap={8}
        mt={8}
      >
        {/* Chain ID + Currency Symbol */}
        <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
          <ChainId form={form} />

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

        <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
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

          {/* Icon */}
          <FormControl isInvalid={!!form.formState.errors.icon}>
            <FormLabel>Icon</FormLabel>

            <Flex gap={3} alignItems="center">
              <ChainIcon size={24} ipfsSrc={form.watch("icon")} />
              <IconUpload
                onUpload={(uri) => {
                  form.setValue("icon", uri, { shouldDirty: true });
                }}
              />
            </Flex>
          </FormControl>
        </SimpleGrid>

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

const IconUpload: React.FC<{ onUpload: (url: string) => void }> = ({
  onUpload,
}) => {
  const errorHandler = useErrorHandler();
  const storageUpload = useStorageUpload();

  const handleIconUpload = (file: File) => {
    // if file size is larger than 500kB, show error
    if (file.size > 500 * 1024) {
      errorHandler.onError("Icon Image can not be larger than 500kB");
      return;
    }

    storageUpload.mutate(
      { data: [file] },
      {
        onSuccess([uri]) {
          onUpload(uri);
        },
        onError(error) {
          errorHandler.onError(error, "Failed to upload file");
        },
      },
    );
  };

  return (
    <FileInput setValue={handleIconUpload} accept={{ "image/*": [] }}>
      <Button
        bg="inputBg"
        size="sm"
        variant="solid"
        aria-label="Upload to IPFS"
        rightIcon={<Icon as={FiUpload} />}
        isLoading={storageUpload.isLoading}
      >
        Upload Icon
      </Button>
    </FileInput>
  );
};

const ChainId: React.FC<{
  form: UseFormReturn<NetworkConfigFormData, any>;
}> = ({ form }) => {
  const isCustom = form.watch("isCustom");
  const { chainIdToChainRecord } = useAllChainsData();
  const chainId = Number(form.watch("chainId"));

  return (
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
        onKeyDown={(e) => {
          // prevent typing e, +, -
          if (e.key === "e" || e.key === "+" || e.key === "-") {
            e.preventDefault();
          }
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
  );
};

export const NetworkIDInput: React.FC<{
  form: UseFormReturn<NetworkConfigFormData, any>;
  hidden: boolean;
}> = ({ form, hidden }) => {
  const isCustom = form.watch("isCustom");
  const slug = form.watch("slug");
  const { slugToChainRecord } = useAllChainsData();

  return (
    <FormControl
      hidden={hidden}
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
        onKeyDown={(e) => {
          // only allow alphanumeric characters and dashes
          if (!/^[a-z0-9-]*$/i.test(e.key)) {
            e.preventDefault();
          }
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
  );
};
