// #region route handlers
import {
  EVMContractInfoProvider,
  useEVMContractInfo,
  useSetEVMContractInfo,
} from "@3rdweb-sdk/react";
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
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworks } from "components/configure-networks/ConfigureNetworks";
import { ContractHeader } from "components/custom-contract/contract-header";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useEffect, useRef, useState } from "react";
import { Button } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const EVMContractPage: ThirdwebNextPage = () => {
  const [shouldContinue, setShouldContinue] = useState(false);
  const contractInfo = useEVMContractInfo();
  const chain = contractInfo?.chain;
  useChainResolverEffect();

  return (
    <>
      <ContractHeader
        contractAddress={contractInfo?.contractAddress || "0x....."}
      />

      <ClientOnly ssr={null}>
        {chain && (
          <ContractTabRouter
            address={contractInfo.contractAddress}
            ecosystem="evm"
            network={contractInfo.chainSlug}
          />
        )}
      </ClientOnly>

      <ClientOnly ssr={null}>
        {contractInfo && !contractInfo.chain && !shouldContinue && (
          <ConfigureNetworkSection
            unknownNetworkName={contractInfo?.chainSlug}
            continue={() => {
              setShouldContinue(true);
            }}
          />
        )}
      </ClientOnly>
    </>
  );
};

/**
 * This effect is used to resolve the chain slug from the url to a Chain object
 * and set it in the context to be used by the rest of the page
 */
function useChainResolverEffect() {
  const configuredChains = useConfiguredChains();
  const setEVMContractInfo = useSetEVMContractInfo();
  const router = useRouter();

  useEffect(() => {
    // can not use router.query here - it does not work when visiting this page directly
    const url = new URL(window.location.href);

    // get the chain slug and contract address from the url
    const [chainSlug, contractAddress] = url.pathname.slice(1).split("/");
    if (!chainSlug) {
      return;
    }

    // resolve the chain slug to a Chain info object
    const chain = configuredChains.find((_chain) => _chain.slug === chainSlug);

    // set the chain info in the context
    setEVMContractInfo({
      chain,
      chainSlug,
      contractAddress,
    });

    // router dependency is required to trigger this effect when the client-side URL changes
  }, [configuredChains, router, setEVMContractInfo]);
}

EVMContractPage.getLayout = (page) => {
  return (
    <EVMContractInfoProvider>
      <AppLayout
        layout={"custom-contract"}
        dehydratedState={{ queries: [], mutations: [] }}
      >
        {page}
      </AppLayout>
    </EVMContractInfoProvider>
  );
};

interface ConfigureNetworkSectionProps {
  unknownNetworkName: string;
  continue: () => void;
}

/**
 * Show this section to configure the network
 * when we can't find the network in the user's cookie or chain list
 */
const ConfigureNetworkSection: React.FC<ConfigureNetworkSectionProps> = (
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

EVMContractPage.pageId = PageId.DeployedContract;

export default EVMContractPage;
