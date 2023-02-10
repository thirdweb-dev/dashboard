import { ChainIdInput } from "./Form/ChainIdInput";
import { IconUpload } from "./Form/IconUpload";
import { NetworkIDInput } from "./Form/NetworkIdInput";
import { RemoveButton } from "./Form/RemoveButton";
import { SearchNetworks } from "./Form/SearchNetworks";
import { ToolTipBox } from "./Form/ToolTipBox";
import {
  Alert,
  AlertIcon,
  Flex,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import {
  useConfiguredChainsNameRecord,
  useConfiguredChainsRecord,
} from "hooks/chains/configureChains";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { Button, FormErrorMessage, FormLabel, Text } from "tw-components";

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

// lowercase it, replace all spaces with hyphens, and then strip all non-alphanumeric characters
const nameToSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

interface NetworkConfigFormProps {
  values?: NetworkConfigFormData;
  onSubmit: (chain: StoredChain) => void;
  onRemove?: () => void;
  prefillSlug?: string;
  prefillChainId?: string;
  prefillName?: string;
  variant: "custom" | "search" | "edit";
  onCustomClick?: (name: string) => void;
  onEdit?: (chain: StoredChain) => void;
}

export const ConfigureNetworkForm: React.FC<NetworkConfigFormProps> = ({
  values,
  onSubmit,
  onRemove,
  prefillSlug,
  prefillChainId,
  variant,
  onCustomClick,
  prefillName,
  onEdit,
}) => {
  const [selectedChain, setSelectedChain] = useState<StoredChain | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(variant === "search");
  const configuredChainNameRecord = useConfiguredChainsNameRecord();
  const configuredChainsRecord = useConfiguredChainsRecord();

  const form = useForm<NetworkConfigFormData>({
    values: {
      name: values?.name || prefillName || "",
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

  // setup prefills
  useEffect(() => {
    if (prefillSlug) {
      form.setValue("slug", prefillSlug, { shouldDirty: true });
    } else if (prefillName) {
      form.setValue("slug", nameToSlug(prefillName));
    }
  }, [prefillSlug, prefillName, form]);

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
      {variant === "search" && onCustomClick && (
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
          onCustomClick={onCustomClick}
          onNetworkSelection={(network, _custom) => {
            form.clearErrors();

            // if network is already added, call onEdit()
            const isAlreadyAdded =
              network.chainId in configuredChainsRecord &&
              !configuredChainsRecord[network.chainId].isAutoConfigured;

            if (isAlreadyAdded && onEdit) {
              // don't pass the network, pass the configured chain to prevent overriding it's config
              onEdit(configuredChainsRecord[network.chainId]);
              return;
            }

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

              if (variant === "custom") {
                if (!form.formState.dirtyFields.slug) {
                  form.setValue("slug", nameToSlug(value));
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
          <ChainIdInput form={form} />

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
            <FormLabel display="flex">
              Network Type
              <ToolTipBox
                content={
                  <>
                    <Text color="heading" display="inline-block" mb={2}>
                      {" "}
                      The network type indicates whether it is intended for
                      production or testing.
                    </Text>

                    <Text color="heading">
                      It{`'`}s only used for displaying network type on the
                      dashboard and does not affect functionality.
                    </Text>
                  </>
                }
              />
            </FormLabel>
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
                <Radio value="mainnet">Mainnet</Radio>
                <Radio value="testnet">Testnet</Radio>
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
          {variant === "edit" && onRemove && (
            <RemoveButton onRemove={onRemove} />
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
