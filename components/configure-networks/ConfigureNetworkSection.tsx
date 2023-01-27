import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfigureNetworks } from "components/configure-networks/ConfigureNetworks";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import React, { useRef, useState } from "react";
import { Button } from "tw-components";

interface ConfigureNetworkSectionProps {
  unknownNetworkName: string;
  continue: () => void;
}

/**
 * Show this section to configure the network
 * when we can't find the network in the user's cookie or chain list
 */
export const ConfigureNetworkSection: React.FC<ConfigureNetworkSectionProps> = (
  props,
) => {
  const [isNetworkConfigured, setIsNetworkConfigured] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <HomepageSection>
      <Box mb={8} mt={8}>
        {isNetworkConfigured ? (
          <Flex justifyContent="center" my={10}>
            <Button colorScheme="blue" onClick={props.continue}>
              Continue to Contract
            </Button>
          </Flex>
        ) : (
          <Alert borderRadius="md" background="backgroundHighlight">
            <AlertIcon />
            You tried to connecting to {`"`}
            {props.unknownNetworkName}
            {`"`} network but it is not configured yet. Please configure it and
            try again.
          </Alert>
        )}
      </Box>

      <Box
        border="2px solid"
        borderColor="whiteAlpha.50"
        borderRadius="lg"
        overflow="hidden"
      >
        <ConfigureNetworks
          onNetworkConfigured={(network) => {
            if (network.slug === props.unknownNetworkName) {
              setIsNetworkConfigured(true);
              onOpen();
            }
          }}
        />
      </Box>

      {/* Show Alert Dialog when user configures the required network */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Awesome!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You have configured the required network. <br />
            Continue to the contract page?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" ml={3} onClick={props.continue}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </HomepageSection>
  );
};
