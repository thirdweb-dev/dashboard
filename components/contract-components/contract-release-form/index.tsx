import {
  useConstructorParamsFromABI,
  useContractFullPublishMetadata,
  useContractPrePublishMetadata,
  useContractPublishMetadataFromURI,
  useEns,
  useFunctionParamsFromABI,
  usePublishMutation,
} from "../hooks";
import { MarkdownRenderer } from "../released-contract/markdown-renderer";
import { ContractId } from "../types";
import { ContractParamsSubform } from "./contract-params-subform";
import { FactorySubform } from "./factory-subform";
import { ProxySubform } from "./proxy-subform";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import {
  CONTRACT_ADDRESSES,
  ExtraPublishMetadata,
  SUPPORTED_CHAIN_IDS,
} from "@thirdweb-dev/sdk/evm";
import { FileInput } from "components/shared/FileInput";
import { SelectOption } from "core-ui/batch-upload/lazy-mint-form/select-option";
import { useTrack } from "hooks/analytics/useTrack";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useTxNotifications } from "hooks/useTxNotifications";
import { replaceIpfsUrl } from "lib/sdk";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsCode, BsEye } from "react-icons/bs";
import { FiTrash, FiUpload } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import {
  Button,
  Card,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Link,
  LinkButton,
  Text,
} from "tw-components";

interface ContractReleaseFormProps {
  contractId: ContractId;
}

export const ContractReleaseForm: React.FC<ContractReleaseFormProps> = ({
  contractId,
}) => {
  const [contractSelection, setContractSelection] = useState<
    "unselected" | "standard" | "proxy" | "factory"
  >("unselected");
  const [pageToShow, setPageToShow] = useState<
    "landing" | "proxy" | "factory" | "contractParams"
  >("landing");
  const trackEvent = useTrack();
  const form = useForm<ExtraPublishMetadata>();
  const logoUrl = useImageFileOrUrl(form.watch("logo"));

  const router = useRouter();
  const { onSuccess, onError } = useTxNotifications(
    "Successfully released contract",
    "Failed to release contract",
  );
  const address = useAddress();
  const publishMutation = usePublishMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const publishMetadata = useContractPublishMetadataFromURI(contractId);
  const prePublishMetadata = useContractPrePublishMetadata(contractId, address);

  const hasTrackedImpression = useRef<boolean>(false);
  useEffect(() => {
    if (publishMetadata.data && !hasTrackedImpression.current) {
      hasTrackedImpression.current = true;
      trackEvent({
        action: "impression",
        category: "publish",
        analytics: publishMetadata.data.analytics,
      });
    }
  }, [publishMetadata.data, trackEvent]);

  const latestVersion =
    prePublishMetadata.data?.latestPublishedContractMetadata?.publishedMetadata
      .version;

  const placeholderVersion = useMemo(() => {
    if (latestVersion) {
      const versplit = latestVersion.split(".");
      return `${versplit[0]}.${versplit[1]}.${Number(versplit[2]) + 1}`;
    }
    return "1.0.0";
  }, [latestVersion]);

  useEffect(() => {
    if (!form.formState.isDirty && address) {
      form.reset({
        ...prePublishMetadata.data?.latestPublishedContractMetadata
          ?.publishedMetadata,
        changelog: "",
        version: placeholderVersion,
        displayName:
          prePublishMetadata.data?.latestPublishedContractMetadata
            ?.publishedMetadata.displayName ||
          prePublishMetadata.data?.preDeployMetadata.info.title ||
          "",
        description:
          prePublishMetadata.data?.latestPublishedContractMetadata
            ?.publishedMetadata.description ||
          prePublishMetadata.data?.preDeployMetadata.info.notice ||
          "",
        factoryDeploymentData: prePublishMetadata.data
          ?.latestPublishedContractMetadata?.publishedMetadata
          ?.factoryDeploymentData || {
          factoryAddresses: Object.fromEntries(
            SUPPORTED_CHAIN_IDS.map((id) => [
              id,
              CONTRACT_ADDRESSES[id].twFactory,
            ]),
          ),
          implementationAddresses: Object.fromEntries(
            SUPPORTED_CHAIN_IDS.map((id) => [id, ""]),
          ),
          implementationInitializerFunction: "initialize",
        },
        constructorParams:
          prePublishMetadata.data?.latestPublishedContractMetadata
            ?.publishedMetadata?.constructorParams || {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    prePublishMetadata.data,
    address,
    placeholderVersion,
    form.formState.isDirty,
  ]);

  const ensQuery = useEns(address);

  const ensNameOrAddress = useMemo(() => {
    return ensQuery?.data?.ensName || ensQuery.data?.address;
  }, [ensQuery.data]);

  const successRedirectUrl = useMemo(() => {
    if (!ensNameOrAddress || !publishMetadata.data?.name) {
      return undefined;
    }
    return `/${ensNameOrAddress}/${publishMetadata.data.name}`;
  }, [ensNameOrAddress, publishMetadata.data?.name]);

  const isDisabled = !successRedirectUrl || !address;

  const fullReleaseMetadata = useContractFullPublishMetadata(contractId);
  const constructorParams = useConstructorParamsFromABI(
    publishMetadata.data?.abi,
  );
  const initializerParams = useFunctionParamsFromABI(
    publishMetadata.data?.abi,
    fullReleaseMetadata.data?.factoryDeploymentData
      ?.implementationInitializerFunction || "initialize",
  );

  const deployParams =
    contractSelection === "proxy" ? initializerParams : constructorParams;

  // during loading and after success we should stay in loading state
  const isLoading = publishMutation.isLoading || publishMutation.isSuccess;

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageToShow]);

  return (
    <FormProvider {...form}>
      <Box w="100%">
        <Flex
          as="form"
          id="contract-release-form"
          onSubmit={form.handleSubmit((data) => {
            // the drawer has another form inside it which triggers this one on submit
            // hacky solution to avoid double submission
            if (isDrawerOpen) {
              return;
            }
            trackEvent({
              category: "publish",
              action: "click",
              label: "attempt",
              uris: contractId,
              release_id: `${ensNameOrAddress}/${publishMetadata.data?.name}`,
            });
            publishMutation.mutate(
              {
                predeployUri: contractId,
                extraMetadata: data,
                contractName: publishMetadata.data?.name,
              },
              {
                onSuccess: () => {
                  onSuccess();
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "success",
                    uris: contractId,
                    release_id: `${ensNameOrAddress}/${publishMetadata.data?.name}`,
                    version: data.version,
                    is_proxy: data.isDeployableViaProxy,
                    is_factory: data.isDeployableViaFactory,
                  });
                  if (successRedirectUrl) {
                    router.push(
                      successRedirectUrl,
                      undefined,
                      // reset scroll after redirect
                      // shallow render (aka do not wait for SSR)
                      { scroll: true, shallow: true },
                    );
                  }
                },
                onError: (err) => {
                  onError(err);
                  trackEvent({
                    category: "publish",
                    action: "click",
                    label: "error",
                    uris: contractId,
                    release_id: `${ensNameOrAddress}/${publishMetadata.data?.name}`,
                    is_proxy: data.isDeployableViaProxy,
                    is_factory: data.isDeployableViaFactory,
                  });
                },
              },
            );
          })}
          direction="column"
          gap={6}
        >
          {pageToShow !== "landing" && (
            <Box>
              <IconButton
                w="inherit"
                variant="ghost"
                onClick={() =>
                  pageToShow === "contractParams" &&
                  contractSelection === "proxy"
                    ? setPageToShow("proxy")
                    : pageToShow === "contractParams" &&
                      contractSelection === "factory"
                    ? setPageToShow("factory")
                    : setPageToShow("landing")
                }
                aria-label="Back"
                icon={<Icon as={IoChevronBack} boxSize={6} />}
              >
                Back
              </IconButton>
            </Box>
          )}
          {pageToShow === "landing" && (
            <Flex gap={16} direction="column">
              <Flex gap={2} direction="column">
                <Heading size="title.lg">Publish your contract</Heading>
                <Text fontStyle="normal">
                  Publishing your contract makes it shareable, discoverable, and
                  deployable in a single click.{" "}
                  <Link
                    color="blue.500"
                    isExternal
                    href="https://portal.thirdweb.com/release"
                  >
                    Learn more
                  </Link>
                </Text>
              </Flex>
              {/*           <Flex gap={4} alignItems="center">
            <Flex direction="column">
              <Skeleton
                isLoaded={
                  publishMetadata.isSuccess && !!publishMetadata.data.name
                }
              >
                <Heading minW="60px" size="title.md" fontWeight="bold">
                  {publishMetadata.data?.name || "Placeholder"}
                </Heading>
              </Skeleton>
              {address ? (
                <Text size="body.md" py={1}>
                  Releasing as{" "}
                  <strong>
                    {shortenIfAddress(ensQuery.data?.ensName || address)}
                  </strong>
                </Text>
              ) : (
                <Text size="body.md" py={1}>
                  Connect your wallet to create a release for this contract
                </Text>
              )}
            </Flex>
          </Flex> */}
              <Flex gap={6} w="full">
                <FormControl isInvalid={!!form.formState.errors.logo} w="auto">
                  <FormLabel>Contract Logo</FormLabel>
                  <Box width={{ base: "auto", md: "141px" }}>
                    <FileInput
                      accept={{ "image/*": [] }}
                      value={logoUrl}
                      setValue={(file) => form.setValue("logo", file)}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      transition="all 200ms ease"
                      _hover={{ shadow: "sm" }}
                      renderPreview={(fileUrl) => (
                        <Image
                          alt=""
                          w="100%"
                          h="100%"
                          src={replaceIpfsUrl(fileUrl)}
                          borderRadius="full"
                        />
                      )}
                      helperText="logo"
                      isDisabled={isDisabled}
                    />
                  </Box>
                  <FormErrorMessage>
                    {form.formState.errors?.logo?.message as unknown as string}
                  </FormErrorMessage>
                </FormControl>
                <Flex flexDir="column" gap={4} w="full">
                  <FormControl isInvalid={!!form.formState.errors.displayName}>
                    <FormLabel>Release Name</FormLabel>
                    <Input
                      {...form.register("displayName")}
                      disabled={isDisabled}
                    />
                    <FormErrorMessage>
                      {form.formState.errors?.displayName?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!form.formState.errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...form.register("description")}
                      disabled={isDisabled}
                      rows={2}
                    />

                    <FormErrorMessage>
                      {form.formState.errors?.description?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>

              <Box>
                <Heading size="title.md" mb={2}>
                  Readme
                </Heading>
                <Text size="body.sm" mb={4}>
                  Describe what your contract does and how it should be used.
                  Markdown formatting is supported.
                </Text>
                <FormControl isInvalid={!!form.formState.errors.readme}>
                  <Tabs isLazy lazyBehavior="keepMounted" colorScheme="purple">
                    <TabList
                      px={0}
                      borderBottomColor="borderColor"
                      borderBottomWidth="1px"
                    >
                      <Tab gap={2}>
                        <Icon as={BsCode} my={2} />
                        <Heading size="label.lg">About</Heading>
                      </Tab>
                      <Tab gap={2}>
                        <Icon as={BsEye} my={2} />
                        <Heading size="label.lg">Preview</Heading>
                      </Tab>
                    </TabList>
                    <TabPanels pt={2}>
                      <TabPanel px={0} pb={0}>
                        <Textarea
                          {...form.register("readme")}
                          disabled={isDisabled}
                          rows={12}
                        />
                        <FormErrorMessage>
                          {form.formState.errors?.readme?.message}
                        </FormErrorMessage>
                      </TabPanel>
                      <TabPanel px={0} pb={0}>
                        <Card>
                          <MarkdownRenderer
                            markdownText={form.watch("readme") || ""}
                          />
                        </Card>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </FormControl>
              </Box>
              <Box>
                <Heading size="title.md" mb={2}>
                  Version information
                </Heading>
                <Text size="body.sm" mb={4}>
                  Set your contract version number, add release notes, and link
                  to your contract&apos;s audit report.
                </Text>
                <Flex flexDir="column" gap={6}>
                  <FormControl
                    isRequired
                    isInvalid={!!form.formState.errors.version}
                  >
                    <Flex alignItems="center" mb={1}>
                      <FormLabel flex="1" mb={0}>
                        Version
                      </FormLabel>
                      {latestVersion && (
                        <Text size="body.md">
                          latest release: {latestVersion}
                        </Text>
                      )}
                    </Flex>
                    <Input
                      {...form.register("version")}
                      placeholder={placeholderVersion}
                      disabled={isDisabled}
                    />
                    <FormErrorMessage>
                      {form.formState.errors?.version?.message}
                    </FormErrorMessage>
                  </FormControl>
                  {latestVersion && (
                    <FormControl isInvalid={!!form.formState.errors.changelog}>
                      <Tabs
                        isLazy
                        lazyBehavior="keepMounted"
                        colorScheme="purple"
                      >
                        <TabList
                          px={0}
                          borderBottomColor="borderColor"
                          borderBottomWidth="1px"
                        >
                          <Tab gap={2}>
                            <Icon as={BsCode} my={2} />
                            <Heading size="label.lg">Release notes</Heading>
                          </Tab>
                          <Tab gap={2}>
                            <Icon as={BsEye} my={2} />
                            <Heading size="label.lg">Preview</Heading>
                          </Tab>
                        </TabList>
                        <TabPanels pt={2}>
                          <TabPanel px={0} pb={0}>
                            <Textarea
                              {...form.register("changelog")}
                              disabled={isDisabled}
                            />
                            <FormErrorMessage>
                              {form.formState.errors?.changelog?.message}
                            </FormErrorMessage>
                          </TabPanel>
                          <TabPanel px={0} pb={0}>
                            <Card>
                              <MarkdownRenderer
                                markdownText={form.watch("changelog") || ""}
                              />
                            </Card>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </FormControl>
                  )}
                  <FormControl isInvalid={!!form.formState.errors.audit}>
                    <FormLabel>Audit report</FormLabel>
                    {form.watch("audit") instanceof File ? (
                      <InputGroup>
                        <Input isDisabled value={form.watch("audit")?.name} />
                        <InputRightElement>
                          <Icon
                            as={FiTrash}
                            cursor="pointer"
                            color="red.300"
                            _hover={{ color: "red.200" }}
                            onClick={() => form.setValue("audit", "")}
                          />
                        </InputRightElement>
                      </InputGroup>
                    ) : (
                      <InputGroup>
                        <Input
                          {...form.register("audit")}
                          placeholder="ipfs://..."
                          isDisabled={isDisabled}
                        />
                        <InputRightElement
                          pointerEvents={isDisabled ? "none" : "auto"}
                        >
                          <Tooltip label="Upload file" shouldWrapChildren>
                            <FileInput
                              setValue={(file) => {
                                form.setValue("audit", file);
                              }}
                              isDisabled={isDisabled}
                            >
                              <Icon
                                as={FiUpload}
                                color="gray.600"
                                _hover={{ color: "gray.500" }}
                              />
                            </FileInput>
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                    )}
                    <FormHelperText>
                      <Text size="body.sm">
                        You can add a IPFS hash or URL pointing to an audit
                        report, or add a file and we&apos;ll upload it to IPFS.
                      </Text>
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Box>
              <Box>
                <Heading size="title.md" mb={2}>
                  Choose your contract type
                </Heading>
                <Text size="body.sm" mb={4}>
                  Choose the type of contract you want to deploy.
                </Text>
                <Flex flexDir="column" gap={2} width="full">
                  <SelectOption
                    name="Standard contract"
                    onClick={() => setContractSelection("standard")}
                    isActive={contractSelection === "standard"}
                    width="full"
                  />
                  <SelectOption
                    name="Proxy contract"
                    onClick={() => setContractSelection("proxy")}
                    isActive={contractSelection === "proxy"}
                    width="full"
                  />
                  <SelectOption
                    name="Factory contract"
                    onClick={() => setContractSelection("factory")}
                    isActive={contractSelection === "factory"}
                    width="full"
                  />
                </Flex>
              </Box>
            </Flex>
          )}
          {pageToShow === "contractParams" && (
            <ContractParamsSubform deployParams={deployParams} />
          )}
          {pageToShow === "proxy" && (
            <ProxySubform
              setIsDrawerOpen={setIsDrawerOpen}
              contractId={contractId}
            />
          )}
          {pageToShow === "factory" && <FactorySubform />}
          <Flex flexDir="column" gap={6}>
            <Divider />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexDir={{ base: "column", md: "row" }}
              gap={4}
            >
              <Text>
                Our contract registry lives on-chain (Polygon), releasing is
                free (gasless).{" "}
                <LinkButton
                  size="sm"
                  variant="outline"
                  href="https://portal.thirdweb.com/release"
                  isExternal
                >
                  Learn more
                </LinkButton>
              </Text>
              {pageToShow === "landing" && contractSelection === "proxy" ? (
                <Button onClick={() => setPageToShow("proxy")}>Next</Button>
              ) : pageToShow === "landing" &&
                contractSelection === "factory" ? (
                <Button onClick={() => setPageToShow("factory")}>Next</Button>
              ) : pageToShow !== "contractParams" &&
                deployParams?.length > 0 ? (
                <Button
                  disabled={
                    pageToShow === "landing" &&
                    contractSelection === "unselected"
                  }
                  onClick={() => setPageToShow("contractParams")}
                >
                  Next
                </Button>
              ) : (
                <Button
                  borderRadius="md"
                  position="relative"
                  role="group"
                  colorScheme={address ? "purple" : "blue"}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  form="contract-release-form"
                  loadingText={
                    publishMutation.isSuccess
                      ? "Preparing page"
                      : "Releasing contract"
                  }
                  type="submit"
                >
                  Create Release
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  );
};
