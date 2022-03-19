import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Switch,
  useClipboard,
} from "@chakra-ui/react";
import {
  EditionDrop,
  Marketplace,
  NFTDrop,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { Button } from "components/buttons/Button";
import { Card } from "components/layout/Card";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { getChainIdFromNetwork } from "utils/network";

interface WidgetSetupProps {
  contract?: ValidContractInstance;
}

const IPFS_URI = "ipfs://QmbNEo7ZD6gM1dDtqRibq5K2dYQiFcmgei5685CmZVGBH1";

const getContractWidgetHash = (contract?: ValidContractInstance) => {
  if (contract instanceof NFTDrop) {
    // drop contract widget hash
    return `${IPFS_URI}/drop.html`;
  }
  if (contract instanceof EditionDrop) {
    // bundle drop contract widget hash
    return `${IPFS_URI}/bundledrop.html`;
  }
  if (contract instanceof Marketplace) {
    // marketplace contract widget hash
    return `${IPFS_URI}/marketplace.html`;
  }

  return null;
};

interface IframeSrcOptions {
  rpcUrl: string;
  ipfsGateway: string;
  chainId?: number;
  tokenId?: number;
  listingId?: number;
  relayUrl?: string;
  name?: string;
  description?: string;
  darkMode?: boolean;
  hideInventory?: boolean;
  hideWallet?: boolean;
}

const buildIframeSrc = (
  contract?: ValidContractInstance,
  options?: IframeSrcOptions,
): string => {
  const contractWidgetHash = getContractWidgetHash(contract);
  if (!contract || !options || !contractWidgetHash || !options.chainId) {
    return "";
  }

  const {
    rpcUrl,
    ipfsGateway,
    chainId,
    tokenId,
    listingId,
    relayUrl,
    name,
    darkMode,
    hideInventory,
    hideWallet,
  } = options;

  let queryParams = `?contract=${contract?.getAddress()}&chainId=${chainId}`;
  if (tokenId !== undefined && contract instanceof EditionDrop) {
    queryParams += `&tokenId=${tokenId}`;
  }
  if (listingId !== undefined && contract instanceof Marketplace) {
    queryParams += `&listingId=${listingId}`;
  }
  if (rpcUrl) {
    queryParams += `&rpcUrl=${rpcUrl}`;
  }
  if (relayUrl) {
    queryParams += `&relayUrl=${relayUrl}`;
  }
  if (name) {
    queryParams += `&name=${name}`;
  }
  if (darkMode) {
    queryParams += `&darkMode=${darkMode}`;
  }
  if (hideInventory) {
    queryParams += `&showInventory=${!hideInventory}`;
  }
  if (hideWallet) {
    queryParams += `&showWallet=${!hideWallet}`;
  }

  if (
    contract instanceof NFTDrop ||
    contract instanceof EditionDrop ||
    contract instanceof Marketplace
  ) {
    return `${contractWidgetHash.replace(
      "ipfs://",
      ipfsGateway,
    )}${queryParams}`;
  }

  return "";
};

export const WidgetSetup: React.FC<WidgetSetupProps> = ({ contract }) => {
  const [ipfsGateway, setIpfsGateway] = useState(
    "https://gateway.ipfscdn.io/ipfs/",
  );
  const [rpcUrl, setRpcUrl] = useState("");
  const [relayUrl, setRelayUrl] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [listingId, setListingId] = useState(0);
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [hideWallet, setHideWallet] = useState(false);
  const [hideInventory, setHideInventory] = useState(false);

  const chainId = getChainIdFromNetwork(useSingleQueryParam("network"));

  const iframeSrc = buildIframeSrc(contract, {
    chainId,
    ipfsGateway,
    rpcUrl,
    tokenId,
    listingId,
    relayUrl,
    name,
    darkMode,
    hideWallet,
    hideInventory,
  });

  const embedCode = `<iframe
    src="${iframeSrc}"
    width="600px"
    height="600px"
    style="max-width:100%;"
    frameborder="0"
  ></iframe>`;

  const { hasCopied, onCopy } = useClipboard(embedCode, 3000);

  return (
    <Flex gap={8} direction="column">
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <Heading size="title.sm">Configuration</Heading>
          <FormControl>
            <FormLabel>IPFS Gateway</FormLabel>
            <Input
              type="url"
              value={ipfsGateway}
              onChange={(e) => setIpfsGateway(e.target.value)}
            />
            <FormHelperText>
              We <strong>recommend</strong> using a dedicated IPFS gateway for
              production use!
            </FormHelperText>
          </FormControl>
          {contract instanceof Marketplace ? (
            <FormControl>
              <FormLabel>Listing ID</FormLabel>
              <Input
                type="number"
                value={listingId}
                onChange={(e) => setListingId(parseInt(e.target.value))}
              />
              <FormHelperText>
                The listing ID the embed should display
              </FormHelperText>
            </FormControl>
          ) : null}
          {contract instanceof EditionDrop ? (
            <FormControl>
              <FormLabel>Token ID</FormLabel>
              <Input
                type="number"
                value={tokenId}
                onChange={(e) => setTokenId(parseInt(e.target.value))}
              />
              <FormHelperText>
                The token ID the embed should display
              </FormHelperText>
            </FormControl>
          ) : null}
          <FormControl>
            <FormLabel>RPC Url</FormLabel>
            <Input
              type="url"
              value={rpcUrl}
              onChange={(e) => setRpcUrl(e.target.value)}
            />
            <FormHelperText>
              Provide your own RPC url to use for this embed.
              <strong>(Recommended for production use!)</strong>
            </FormHelperText>
          </FormControl>

          {contract instanceof Marketplace ? null : (
            <FormControl>
              <FormLabel>Relayer Url</FormLabel>
              <Input
                type="url"
                value={relayUrl}
                onChange={(e) => setRelayUrl(e.target.value)}
              />
              <FormHelperText>
                Provide a relayer url to use for this embed. A relayer can be
                used to make the transaction gas-less for the end user.{" "}
                <Link
                  isExternal
                  color="blue.500"
                  href="https://portal.thirdweb.com/guides/setup-gasless-transactions"
                >
                  Learn more
                </Link>
              </FormHelperText>
            </FormControl>
          )}

          {contract instanceof EditionDrop && (
            <Accordion allowToggle>
              <AccordionItem mt="24px">
                <AccordionButton px={0} justifyContent="space-between">
                  <Heading size="label.lg">Customize Embed</Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0} as={Stack} spacing={6}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText>
                      If a name is unspecified, it will default to your NFTs
                      name.
                    </FormHelperText>
                  </FormControl>
                  <FormControl as={SimpleGrid} columns={4}>
                    <FormLabel>Dark Mode</FormLabel>
                    <Switch
                      size="md"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />

                    <FormLabel>Hide Inventory</FormLabel>
                    <Switch
                      size="md"
                      checked={hideInventory}
                      onChange={(e) => setHideInventory(e.target.checked)}
                    />

                    <FormLabel>Hide Wallet</FormLabel>
                    <Switch
                      size="md"
                      checked={hideWallet}
                      onChange={(e) => setHideWallet(e.target.checked)}
                    />
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </Stack>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <Heading size="title.sm">Embed Code</Heading>
          <Code overflowX="auto" whiteSpace="pre" fontFamily="mono" p={2}>
            {embedCode}
          </Code>
          <Button
            colorScheme="purple"
            w="auto"
            variant="outline"
            onClick={onCopy}
            rightIcon={<FiCopy />}
          >
            {hasCopied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </Stack>
      </Flex>

      <Stack align="center">
        <Heading size="title.sm">Preview</Heading>
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            width="600px"
            height="600px"
            frameBorder="0"
          />
        ) : (
          <>
            {!ipfsGateway && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Missing IPFS Gateway</AlertTitle>
              </Alert>
            )}
          </>
        )}
      </Stack>
    </Flex>
  );
};
