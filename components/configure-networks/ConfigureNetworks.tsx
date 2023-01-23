import { ConfigureNetworkForm } from "./ConfigureNetworkForm";
import { ConfiguredNetworkList } from "./ConfiguredNetworkList";
import { SearchNetworks } from "./SearchNetworks";
import { ConfiguredNetworkInfo } from "./types";
import {
  useConfiguredNetworks,
  useSetConfiguredNetworks,
} from "./useConfiguredNetworks";
import { Box, Divider, Grid, useToast } from "@chakra-ui/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { useState } from "react";
import { Heading, Text } from "tw-components";

export const NetworkInfoForm: React.FC = () => {
  return <form></form>;
};

interface ConfigureNetworksProps {
  onNetworkConfigured?: (network: ConfiguredNetworkInfo) => void;
}

export const ConfigureNetworks: React.FC<ConfigureNetworksProps> = (props) => {
  const configuredNetworks = useConfiguredNetworks();
  const setConfiguredNetworks = useSetConfiguredNetworks();
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);

  const [networkInfo, setNetworkInfo] = useState<
    ConfiguredNetworkInfo | undefined
  >(undefined);
  const toast = useToast();

  return (
    <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }}>
      <Box p={6} pb={0} background="rgba(0,0,0,0.4)" h="100%">
        <Heading as={"h3"} size="label.lg" mb={8}>
          Configured Networks
        </Heading>

        <ClientOnly ssr={null}>
          {configuredNetworks.length === 0 ? (
            <Text> No Networks Added </Text>
          ) : (
            <ConfiguredNetworkList
              onDelete={(network) => {
                setConfiguredNetworks(
                  configuredNetworks.filter(
                    (configuredNetwork) =>
                      configuredNetwork.name !== network.name,
                  ),
                );
              }}
              networks={configuredNetworks}
              onClick={(network) => {
                setNetworkInfo(network);
              }}
            />
          )}
        </ClientOnly>
      </Box>

      <Box p={6}>
        <Heading as={"h3"} size="label.lg" mb={2}>
          Add New Network
        </Heading>

        <Box>
          <Text mb={6} color="whiteAlpha.600">
            Search Or Add Network Manually
          </Text>

          <SearchNetworks
            onSelectorChange={(status) => {
              setSearchResultsOpen(status === "open");
            }}
            onNetworkSelection={(_networkInfo) => {
              setNetworkInfo(_networkInfo);
            }}
          />

          <Divider my={6} />

          <ConfigureNetworkForm
            configuredNetworks={configuredNetworks}
            values={networkInfo}
            isSearchResultsOpen={searchResultsOpen}
            onSubmit={(data) => {
              toast({
                title: "Network Added Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              setConfiguredNetworks([...configuredNetworks, data]);

              if (props.onNetworkConfigured) {
                props.onNetworkConfigured(data);
              }
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
};
