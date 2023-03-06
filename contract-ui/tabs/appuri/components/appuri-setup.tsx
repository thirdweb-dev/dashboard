import { useDashboardEVMChainId } from "@3rdweb-sdk/react";
import {
  Container,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import { useSetAppURI, useStorageUpload } from "@thirdweb-dev/react";
import { Abi, getAllDetectedFeatureNames } from "@thirdweb-dev/sdk";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { ChakraNextImage } from "components/Image";
import { TransactionButton } from "components/buttons/TransactionButton";
import { BaseContract } from "ethers";
import { useChainSlug } from "hooks/chains/chainSlug";
import { replaceIpfsUrl } from "lib/sdk";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import {
  Card,
  CodeBlock,
  FormLabel,
  Heading,
  LinkButton,
  Text,
  TrackedCopyButton,
  TrackedIconButton,
  TrackedLink,
} from "tw-components";

interface AppURISetupProps {
  appURI?: string;
  contract: SmartContract<BaseContract> | undefined;
}

const TRACKING_CATEGORY = "app-uri";

const ERC721_DROP_TEMPLATE = {
  name: "ERC721 Drop",
  description:
    "Have users connect their wallet and claim the NFTs on your drop.",
  uri: "ipfs://QmbvreDBRTsMK4kpJL8mx7nWZAdGz44gpg4XgGcVaxaZWf",
  image: require("/public/assets/app/erc721-drop.png"),
};

type App = {
  name: string;
  description: string;
  uri: string;
  image: any;
};

const URI_FOR_EXTENSION: Record<string, App | undefined> = {
  ERC20ClaimConditionsV1: undefined,
  ERC20ClaimConditionsV2: undefined,
  ERC20ClaimPhasesV1: undefined,
  ERC20ClaimPhasesV2: undefined,
  ERC20Burnable: undefined,
  ERC20Revealable: undefined,
  ERC20TieredDrop: undefined,
  ERC20ClaimCustom: undefined,
  ERC20LazyMintable: undefined,
  ERC20BatchMintable: undefined,
  ERC20Mintable: undefined,
  ERC20: undefined,
  ERC721Burnable: undefined,
  ERC721Revealable: undefined,
  ERC721TieredDrop: undefined,
  ERC721ClaimConditionsV1: ERC721_DROP_TEMPLATE,
  ERC721ClaimConditionsV2: ERC721_DROP_TEMPLATE,
  ERC721ClaimPhasesV1: ERC721_DROP_TEMPLATE,
  ERC721ClaimPhasesV2: ERC721_DROP_TEMPLATE,
  ERC721ClaimCustom: undefined,
  ERC721LazyMintable: undefined,
  ERC721BatchMintable: undefined,
  ERC721Mintable: undefined,
  ERC721SignatureMintV2: undefined,
  ERC721SignatureMintV1: undefined,
  ERC721Enumerable: undefined,
  ERC721Supply: undefined,
  ERC721: undefined,
  ERC1155Burnable: undefined,
  ERC1155ClaimConditionsV1: undefined,
  ERC1155ClaimConditionsV2: undefined,
  ERC1155ClaimPhasesV2: undefined,
  ERC1155ClaimPhasesV1: undefined,
  ERC1155ClaimCustom: undefined,
  ERC1155Revealable: undefined,
  ERC1155LazyMintableV2: undefined,
  ERC1155LazyMintableV1: undefined,
  ERC1155SignatureMintable: undefined,
  ERC1155BatchMintable: undefined,
  ERC1155Mintable: undefined,
  ERC1155Enumerable: undefined,
  ERC1155: undefined,
  Royalty: undefined,
  PrimarySale: undefined,
  PlatformFee: undefined,
  PermissionsEnumerable: undefined,
  Permissions: undefined,
  ContractMetadata: undefined,
  AppURI: undefined,
  Ownable: undefined,
};
export const AppURISetup: React.FC<AppURISetupProps> = ({
  appURI,
  contract,
}) => {
  const chainId = useDashboardEVMChainId();
  const chainSlug = useChainSlug(chainId?.toString() || "0");
  const form = useForm<{
    appURI: string;
  }>({
    defaultValues: {
      appURI: appURI || "",
    },
    reValidateMode: "onChange",
  });
  const storageUpload = useStorageUpload();
  const { mutate: setAppURI, isLoading } = useSetAppURI(contract);

  const watchAppUri = form.watch("appURI") || "";

  const detectedExtensions = useMemo(
    () =>
      contract?.abi ? getAllDetectedFeatureNames(contract.abi as Abi) : [],
    [contract?.abi],
  );

  const getURIsForExtensions = (extensions: string[]) => {
    return extensions
      .filter((ext) => URI_FOR_EXTENSION[ext])
      .map((ext) => URI_FOR_EXTENSION[ext]);
  };

  const appsDetected: App[] = getURIsForExtensions(detectedExtensions) as App[];

  const embedCode = `<iframe
  src="https://${contract?.getAddress()}-${chainSlug}.third.app"
  width="600px"
  height="600px"
  style="max-width:100%;"
  frameborder="0"
></iframe>`;

  return (
    <Flex gap={8} direction="column">
      <Flex
        gap={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxW="100%" h="full">
          <Flex flexDir="column" gap={6}>
            <Flex flexDir="column" gap={2}>
              <Heading size="title.lg" as="h1">
                App
              </Heading>

              <Text>The official App landing page for your smart contract</Text>
            </Flex>
            {appURI ? (
              <Card
                as={Flex}
                flexDir="column"
                gap={6}
                p={6}
                _groupHover={{ borderColor: "blue.500" }}
                position="relative"
              >
                <Flex justifyContent="space-between">
                  <Flex gap={2} flexDir="column">
                    <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                      Hosted Website
                    </Heading>
                    <Text>
                      Your app lives at this URL, feel free to share it. If you
                      want to CNAME it contact us on Discord.
                    </Text>
                  </Flex>
                </Flex>
                <HStack>
                  <InputGroup>
                    <Input
                      readOnly
                      value={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                      pr="75px"
                      variant={"outline"}
                      _hover={{ cursor: "default" }}
                    />
                    <InputRightElement as={Flex}>
                      <Tooltip
                        p={0}
                        bg="backgroundBody"
                        boxShadow="none"
                        label={
                          <Card py={2} px={4}>
                            <Text size="label.sm">Copy URL</Text>
                          </Card>
                        }
                        borderRadius="lg"
                        shouldWrapChildren
                        placement="right"
                      >
                        <TrackedCopyButton
                          category={TRACKING_CATEGORY}
                          label="copy-rpc-url"
                          aria-label="Copy RPC url"
                          size="sm"
                          colorScheme={undefined}
                          value={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                        />
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <Tooltip
                    p={0}
                    bg="backgroundBody"
                    boxShadow="none"
                    label={
                      <Card py={2} px={4}>
                        <Text size="label.sm">Open URL</Text>
                      </Card>
                    }
                    borderRadius="lg"
                    shouldWrapChildren
                    placement="right"
                  >
                    <TrackedIconButton
                      as={TrackedLink}
                      href={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                      category={TRACKING_CATEGORY}
                      label="open-url"
                      aria-label="Open URL"
                      icon={<Icon as={FiExternalLink} />}
                      variant="solid"
                      isExternal
                      size="sm"
                    >
                      Open Url
                    </TrackedIconButton>
                  </Tooltip>
                </HStack>
              </Card>
            ) : null}

            <Card
              as={Flex}
              flexDir="column"
              gap={4}
              h="full"
              justifyContent="space-between"
            >
              <FormControl as={Flex} flexDir="column">
                <FormLabel>App URI</FormLabel>
                <Text>
                  Set the URI for your application, this should be where your
                  main HTML is. Use {"'npx thirdweb deploy --app'"} in any web
                  project to deploy your app to IPFS and get the URI.
                </Text>
                <InputGroup display="flex" mt={4}>
                  <Input
                    placeholder="ipfs://Qm..."
                    isDisabled={storageUpload.isLoading}
                    {...form.register("appURI")}
                  />
                </InputGroup>
              </FormControl>
              <Flex gap={2} justifyContent="flex-end">
                <TransactionButton
                  alignSelf="flex-end"
                  disabled={form.getFieldState("appURI").isDirty}
                  onClick={() => setAppURI({ uri: watchAppUri })}
                  colorScheme="blue"
                  isLoading={isLoading}
                  transactionCount={1}
                >
                  Update
                </TransactionButton>
              </Flex>
            </Card>
            {watchAppUri ? (
              <Card as={Flex} flexDir="column" gap={2}>
                <Heading size="label.md">Embed Code</Heading>
                <Text>
                  Add this code snippet to your website to embed the App UI
                </Text>
                <CodeBlock
                  canCopy={true}
                  whiteSpace="pre"
                  overflowX="auto"
                  code={embedCode}
                  language="markup"
                />
              </Card>
            ) : null}

            {appsDetected.length > 0 ? (
              <Flex flexDir="column" gap={4}>
                <Heading>
                  <Heading size="title.md">Suggested compatible Apps</Heading>
                </Heading>
                <Text>
                  The following Apps are compatible with your contract based on
                  your contract&apos;s Extensions.
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }}>
                  {appsDetected.map((app) => (
                    <Card
                      key={app.name}
                      as={Flex}
                      flexDir="column"
                      p={0}
                      overflow="hidden"
                    >
                      <ChakraNextImage src={app.image} alt="" />
                      <Flex p={4} flexDir="column" gap={2}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text size="label.lg">{app.name}</Text>
                          <LinkButton
                            href={`${replaceIpfsUrl(
                              app.uri,
                            )}?contractAddress=${contract?.getAddress()}&network=${chainSlug}`}
                            isExternal
                            colorScheme="blue"
                            variant="ghost"
                          >
                            Preview
                          </LinkButton>
                        </Flex>
                        <Text size="body.sm">{app?.description}</Text>
                        <TransactionButton
                          alignSelf="flex-end"
                          onClick={() => setAppURI({ uri: app.uri })}
                          colorScheme="blue"
                          isLoading={isLoading}
                          transactionCount={1}
                        >
                          Set App
                        </TransactionButton>
                      </Flex>
                    </Card>
                  ))}
                </SimpleGrid>
              </Flex>
            ) : null}
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};
