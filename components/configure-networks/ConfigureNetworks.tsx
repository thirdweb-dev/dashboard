import { ConfigureNetworkForm } from "./ConfigureNetworkForm";
import { ConfiguredNetworkList } from "./ConfiguredNetworkList";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { StoredChain } from "contexts/configured-chains";
import { useTrack } from "hooks/analytics/useTrack";
import {
  useConfiguredChains,
  useConfiguredChainsRecord,
  useUpdateConfiguredChains,
} from "hooks/chains/configureChains";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button, Heading, Text } from "tw-components";

interface ConfigureNetworksProps {
  onNetworkConfigured?: (network: StoredChain) => void;
  onNetworkAdded?: () => void;
  prefillSlug?: string;
  prefillChainId?: string;
}

function useChainConfigTrack() {
  const trackEvent = useTrack();
  return (action: "add" | "delete" | "update", chain: StoredChain) => {
    trackEvent({
      category: "chain_configuration",
      chain,
      action,
    });
  };
}

export const ConfigureNetworks: React.FC<ConfigureNetworksProps> = (props) => {
  const configuredNetworks = useConfiguredChains();
  const configuredChainRecord = useConfiguredChainsRecord();
  const updateConfiguredNetworks = useUpdateConfiguredChains();
  const trackChainConfig = useChainConfigTrack();
  const toast = useToast();
  const [editingChain, setEditingChain] = useState<StoredChain | undefined>(
    undefined,
  );

  const isEditingScreen = !!editingChain;

  const handleDelete = () => {
    if (!editingChain) {
      return;
    }
    const index = configuredNetworks.findIndex((net) => net === editingChain);
    updateConfiguredNetworks.remove(index);
    setEditingChain(undefined);
    trackChainConfig("delete", editingChain);
  };

  const handleSubmit = (chain: StoredChain) => {
    // if editing a chain, just update the existing one
    if (editingChain) {
      const index = configuredNetworks.findIndex((net) => net === editingChain);
      updateConfiguredNetworks.update(index, chain);
      setEditingChain(chain);
      trackChainConfig("update", chain);
    }

    // if trying to add new chain, but it's already added as of autoconfigured chain,
    // replace it with configuredNetwork
    else if (chain.chainId in configuredChainRecord) {
      const existingChain = configuredChainRecord[chain.chainId];

      if (existingChain.isAutoConfigured) {
        const index = configuredNetworks.findIndex(
          (net) => net === existingChain,
        );

        updateConfiguredNetworks.update(index, chain);
        trackChainConfig("add", chain);
      }
    }

    // else add new chain
    else {
      updateConfiguredNetworks.add([chain]);
      trackChainConfig("add", chain);
    }

    if (props.onNetworkConfigured) {
      props.onNetworkConfigured(chain);
    }

    if (props.onNetworkAdded) {
      props.onNetworkAdded();
    }

    toast({
      title: editingChain
        ? "Network Updated Successfully"
        : "Network Added Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
          p={{ base: 4, md: 8 }}
          size="label.xl"
          display="flex"
          alignItems="center"
        >
          Your Networks
        </Heading>

        <Button
          variant="link"
          pl={{ base: 4, md: 8 }}
          mb={8}
          _dark={{
            color: "blue.500",
          }}
          _light={{
            color: "blue.700",
          }}
          _hover={{
            textDecoration: "none",
          }}
          display="flex"
          justifyContent="flex-start"
          onClick={() => {
            setEditingChain(undefined);
          }}
          leftIcon={<Icon as={IoMdAdd} />}
          disabled={!editingChain}
        >
          <Text fontSize="md" color="inherit" textAlign="left" fontWeight={600}>
            Add Network
          </Text>
        </Button>

        {/* List */}
        {configuredNetworks.length === 0 ? (
          <Text> No Networks Added </Text>
        ) : (
          <ConfiguredNetworkList
            activeNetwork={editingChain}
            onClick={(network) => {
              setEditingChain(network);
            }}
            onAdd={(network) => {
              updateConfiguredNetworks.add([network]);
            }}
          />
        )}
      </Flex>

      {/* form */}
      <Box p={{ base: 4, md: 8 }}>
        <Heading
          as={"h3"}
          size="label.xl"
          mb={6}
          display="flex"
          gap={2}
          alignItems="center"
        >
          {isEditingScreen ? "Edit Network" : "Add Network"}
        </Heading>

        {editingChain && (
          <Box mt={9}>
            <ConfigureNetworkForm
              onRemove={handleDelete}
              prefillSlug={props.prefillSlug}
              prefillChainId={props.prefillChainId}
              values={{
                name: editingChain.name,
                rpcUrl: editingChain.rpc[0],
                chainId: `${editingChain.chainId}`,
                currencySymbol: editingChain.nativeCurrency.symbol,
                type: editingChain.testnet ? "testnet" : "mainnet",
                isCustom: !!editingChain.isCustom,
                icon: editingChain.icon?.url || "",
                slug: editingChain.slug,
              }}
              variant="edit"
              onSubmit={handleSubmit}
            />
          </Box>
        )}

        {!editingChain && (
          <Tabs
            defaultIndex={props.prefillSlug || props.prefillChainId ? 1 : 0}
          >
            <TabList borderColor="inputBg" mb={6}>
              <Tab>Search</Tab>
              <Tab>Custom</Tab>
            </TabList>
            <TabPanels>
              {/* search */}
              <TabPanel p={0}>
                <ConfigureNetworkForm
                  onSubmit={handleSubmit}
                  variant="search"
                />
              </TabPanel>

              {/* custom */}
              <TabPanel p={0}>
                <ConfigureNetworkForm
                  prefillSlug={props.prefillSlug}
                  prefillChainId={props.prefillChainId}
                  onSubmit={handleSubmit}
                  variant="custom"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Grid>
  );
};
