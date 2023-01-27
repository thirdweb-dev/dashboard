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

  const handleSubmit = (networkData: NetworkConfigFormData) => {
    toast({
      title: editingChain
        ? "Network Updated Successfully"
        : "Network Added Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    const configuredNetwork: StoredChain = {
      name: networkData.name,
      // We don't care about this
      chain: "",
      // make slug the short name
      shortName: networkData.slug,
      chainId:
        typeof networkData.chainId === "number"
          ? networkData.chainId
          : parseInt(networkData.chainId),
      rpc: [networkData.rpcUrl],
      nativeCurrency: {
        // temp
        name: networkData.currencySymbol,
        symbol: networkData.currencySymbol,
        decimals: 18,
      },
      testnet: networkData.type === "testnet",
      slug: networkData.slug,
      isCustom: networkData.isCustom ? true : undefined,
    };

    if (editingChain) {
      // check if the network is already added
      const index = configuredNetworks.findIndex((net) => net === editingChain);

      // update it
      updateConfiguredNetworks.update(index, configuredNetwork);

      // make this the editing network
      setEditingChain(configuredNetwork);
    } else {
      // add new
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
        p={8}
        pb={4}
        pr={2}
        borderRight={{ md: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        {/* Heading */}
        <Heading
          as={"h3"}
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
              icon={<Icon as={FiChevronLeft} color="highlight" />}
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
