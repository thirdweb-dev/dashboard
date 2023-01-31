import {
  ConfigureNetworkForm,
  NetworkConfigFormData,
} from "./ConfigureNetworkForm";
import { ConfiguredNetworkList } from "./ConfiguredNetworkList";
import { DeleteNetworkAlertModal } from "./DeleteNetworkAlertModal";
import {
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { StoredChain } from "contexts/configured-chains";
import {
  useConfiguredChains,
  useUpdateConfiguredChains,
} from "hooks/chains/configureChains";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Heading, Text } from "tw-components";

interface ConfigureNetworksProps {
  onNetworkConfigured?: (network: StoredChain) => void;
  onNetworkAdded?: () => void;
}

export const ConfigureNetworks: React.FC<ConfigureNetworksProps> = (props) => {
  const configuredNetworks = useConfiguredChains();
  const updateConfiguredNetworks = useUpdateConfiguredChains();

  const toast = useToast();
  const [editingChain, setEditingChain] = useState<StoredChain | undefined>(
    undefined,
  );

  const deleteModalDisclosure = useDisclosure();
  const isEditingScreen = !!editingChain;

  const handleDelete = () => {
    const index = configuredNetworks.findIndex((net) => net === editingChain);
    updateConfiguredNetworks.remove(index);
    setEditingChain(undefined);
  };

  const handleSubmit = (formData: NetworkConfigFormData) => {
    toast({
      title: editingChain
        ? "Network Updated Successfully"
        : "Network Added Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    const configuredNetwork: StoredChain = {
      name: formData.name,
      // We don't care about this
      chain: "",
      shortName: formData.shortName,
      chainId: parseInt(formData.chainId),
      rpc: [formData.rpcUrl],
      nativeCurrency: {
        // we don't have name, so using symbol as name
        name: formData.currencySymbol,
        symbol: formData.currencySymbol,
        decimals: 18,
      },
      testnet: formData.type === "testnet",
      slug: formData.slug,
      isCustom: formData.isCustom ? true : undefined,
    };

    // if editing, update the existing one
    if (editingChain) {
      const index = configuredNetworks.findIndex((net) => net === editingChain);
      updateConfiguredNetworks.update(index, configuredNetwork);
      setEditingChain(configuredNetwork);
    }

    // else add new
    else {
      updateConfiguredNetworks.add(configuredNetwork);
    }

    if (props.onNetworkConfigured) {
      props.onNetworkConfigured(configuredNetwork);
    }

    if (props.onNetworkAdded) {
      props.onNetworkAdded();
    }
  };

  return (
    <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }}>
      {/* List */}
      <Flex
        direction="column"
        borderRight="1px solid transparent"
        _light={{
          borderColor: { md: "gray.200" },
        }}
        _dark={{
          borderColor: { md: "backgroundHighlight" },
        }}
      >
        {/* Heading */}
        <Heading
          as={"h3"}
          m={8}
          size="label.xl"
          mb={10}
          minH={10}
          display="flex"
          alignItems="center"
        >
          Your Networks
        </Heading>

        {/* List */}
        {configuredNetworks.length === 0 ? (
          <Text> No Networks Added </Text>
        ) : (
          <ConfiguredNetworkList
            onDelete={(network) => {
              const index = configuredNetworks.findIndex(
                (net) => net === network,
              );
              updateConfiguredNetworks.remove(index);
            }}
            activeNetwork={editingChain}
            onClick={(network) => {
              setEditingChain(network);
            }}
          />
        )}
      </Flex>

      {/* form */}
      <Box p={8}>
        <Heading
          as={"h3"}
          size="label.xl"
          mb={10}
          display="flex"
          gap={2}
          alignItems="center"
          minH={10}
        >
          {/* Back Button */}
          {isEditingScreen && (
            <IconButton
              p={0}
              ml={-4}
              aria-label="Go Back to Add Network screen"
              background="transparent"
              icon={<Icon as={FiChevronLeft} color="accent.900" />}
              onClick={() => {
                setEditingChain(undefined);
              }}
            />
          )}
          {isEditingScreen ? "Edit Network" : "Add Network"}
        </Heading>

        <ConfigureNetworkForm
          onRemove={deleteModalDisclosure.onOpen}
          values={
            editingChain
              ? {
                  name: editingChain.name,
                  rpcUrl: editingChain.rpc[0],
                  chainId: `${editingChain.chainId}`,
                  currencySymbol: editingChain.nativeCurrency.symbol,
                  type: editingChain.testnet ? "testnet" : "mainnet",
                  slug: editingChain.slug,
                  shortName: editingChain.shortName,
                  isCustom: !!editingChain.isCustom,
                }
              : undefined
          }
          isEditingScreen={isEditingScreen}
          onSubmit={handleSubmit}
        />
      </Box>

      <DeleteNetworkAlertModal
        disclosure={deleteModalDisclosure}
        networkName={editingChain?.name || ""}
        onDelete={handleDelete}
      />
    </Grid>
  );
};
