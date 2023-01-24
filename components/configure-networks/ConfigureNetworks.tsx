import {
  ConfigureNetworkForm,
  NetworkConfigFormData,
} from "./ConfigureNetworkForm";
import { ConfiguredNetworkList } from "./ConfiguredNetworkList";
import { ConfiguredNetworkInfo } from "./types";
import {
  useConfiguredNetworks,
  useSetConfiguredNetworks,
} from "./useConfiguredNetworks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  UseDisclosureReturn,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Button, Heading, Text } from "tw-components";

interface ConfigureNetworksProps {
  onNetworkConfigured?: (network: ConfiguredNetworkInfo) => void;
  onNetworkAdded?: () => void;
}

export const ConfigureNetworks: React.FC<ConfigureNetworksProps> = (props) => {
  const configuredNetworks = useConfiguredNetworks();
  const setConfiguredNetworks = useSetConfiguredNetworks();
  const toast = useToast();
  const [editingNetwork, setEditingNetwork] = useState<
    ConfiguredNetworkInfo | undefined
  >(undefined);

  const deleteModalDisclosure = useDisclosure();
  const isEditingScreen = !!editingNetwork;

  const handleDelete = () => {
    setConfiguredNetworks(
      configuredNetworks.filter((net) => net !== editingNetwork),
    );

    setEditingNetwork(undefined);
  };

  const handleSubmit = (networkData: NetworkConfigFormData) => {
    toast({
      title: editingNetwork
        ? "Network Updated Successfully"
        : "Network Added Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    const configuredNetwork = {
      name: networkData.name,
      shortName: networkData.shortName,
      chainId:
        typeof networkData.chainId === "number"
          ? networkData.chainId
          : parseInt(networkData.chainId),
      rpcUrl: networkData.rpcUrl,
      currencySymbol: networkData.currencySymbol,
      type: networkData.type,
      isCustom: networkData.isCustom,
    };

    if (editingNetwork) {
      // check if the network is already added
      const index = configuredNetworks.findIndex(
        (net) => net === editingNetwork,
      );

      // update it
      const configuredNetworksCopy = [...configuredNetworks];
      configuredNetworksCopy[index] = configuredNetwork;
      setConfiguredNetworks(configuredNetworksCopy);
    } else {
      // add new
      setConfiguredNetworks([...configuredNetworks, configuredNetwork]);
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
              setConfiguredNetworks(
                configuredNetworks.filter(
                  (configuredNetwork) =>
                    configuredNetwork.name !== network.name,
                ),
              );
            }}
            networks={configuredNetworks}
            activeNetwork={editingNetwork}
            onClick={(network) => {
              setEditingNetwork(network);
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
                setEditingNetwork(undefined);
              }}
            />
          )}
          {isEditingScreen ? "Edit Network" : "Add Network"}
        </Heading>

        <ConfigureNetworkForm
          onRemove={deleteModalDisclosure.onOpen}
          values={editingNetwork}
          isEditingScreen={isEditingScreen}
          onSubmit={handleSubmit}
        />
      </Box>

      <DeleteNetworkAlertModal
        disclosure={deleteModalDisclosure}
        networkName={editingNetwork?.name || ""}
        onDelete={handleDelete}
      />
    </Grid>
  );
};

const DeleteNetworkAlertModal: React.FC<{
  onDelete: () => void;
  networkName: string;
  disclosure: UseDisclosureReturn;
}> = (props) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={props.disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Network
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete {props.networkName} ?{" "}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.disclosure.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                props.onDelete();
                props.disclosure.onClose();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
