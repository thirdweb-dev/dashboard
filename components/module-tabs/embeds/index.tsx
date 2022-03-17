import {
  BundleDropModule,
  DropModule,
  MarketplaceModule,
  ModuleWithRoles,
} from "@3rdweb/sdk";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useClipboard,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { getChainIdFromNetwork } from "utils/network";

interface WidgetSetupProps {
  module?: ModuleWithRoles;
}
const getModuleWidgetHash = (module?: ModuleWithRoles) => {
  const ipfsHash = "ipfs://Qmej3ewrU7UMh4G5Sjp9rb5kjcAtByujUo7fXYpPgKE2pW";
  if (module instanceof DropModule) {
    // drop module widget hash
    return `${ipfsHash}/drop.html`;
  }

  if (module instanceof BundleDropModule) {
    // bundle drop module widget hash
    return `${ipfsHash}/bundledrop.html`;
  }

  if (module instanceof MarketplaceModule) {
    // marketplace module widget hash
    return `${ipfsHash}/marketplace.html`;
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
}

const buildIframeSrc = (
  module?: ModuleWithRoles,
  options?: IframeSrcOptions,
): string => {
  const moduleWidgetHash = getModuleWidgetHash(module);
  if (!module || !options || !moduleWidgetHash || !options.chainId) {
    return "";
  }

  const { rpcUrl, ipfsGateway, chainId, tokenId, listingId, relayUrl } =
    options;

  let queryParams = `?contract=${module?.address}&chainId=${chainId}`;
  if (tokenId !== undefined && module instanceof BundleDropModule) {
    queryParams += `&tokenId=${tokenId}`;
  }
  if (listingId !== undefined && module instanceof MarketplaceModule) {
    queryParams += `&listingId=${listingId}`;
  }
  if (rpcUrl) {
    queryParams += `&rpcUrl=${rpcUrl}`;
  }
  if (relayUrl) {
    queryParams += `&relayUrl=${relayUrl}`;
  }

  if (
    module instanceof DropModule ||
    module instanceof MarketplaceModule ||
    module instanceof BundleDropModule
  ) {
    return `${moduleWidgetHash.replace("ipfs://", ipfsGateway)}${queryParams}`;
  }

  return "";
};

export const WidgetSetup: React.FC<WidgetSetupProps> = ({ module }) => {
  const [ipfsGateway, setIpfsGateway] = useState(
    "https://gateway.ipfscdn.io/ipfs/",
  );
  const [rpcUrl, setRpcUrl] = useState("");
  const [relayUrl, setRelayUrl] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [listingId, setListingId] = useState(0);

  const chainId = getChainIdFromNetwork(useSingleQueryParam("network"));

  const iframeSrc = buildIframeSrc(module, {
    chainId,
    ipfsGateway,
    rpcUrl,
    tokenId,
    listingId,
    relayUrl,
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
          {module instanceof MarketplaceModule ? (
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
          {module instanceof BundleDropModule ? (
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

          {module instanceof MarketplaceModule ? null : (
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
