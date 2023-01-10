import {
  useConstructorParamsFromABI,
  useContractFullPublishMetadata,
  useContractPrePublishMetadata,
  useContractPublishMetadataFromURI,
  useEns,
  useFunctionParamsFromABI,
  usePublishMutation,
} from "../hooks";
import { ContractId } from "../types";
import { ContractParamsFieldset } from "./contract-params-fieldset";
import { FactoryFieldset } from "./factory-fieldset";
import { LandingFieldset } from "./landing-fieldset";
import { ProxyFieldset } from "./proxy-fieldset";
import { Box, Divider, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import {
  CONTRACT_ADDRESSES,
  ExtraPublishMetadata,
  SUPPORTED_CHAIN_IDS,
} from "@thirdweb-dev/sdk/evm";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { Button, Link, Text } from "tw-components";

interface ContractReleaseFormProps {
  contractId: ContractId;
}

export const ContractReleaseForm: React.FC<ContractReleaseFormProps> = ({
  contractId,
}) => {
  const [contractSelection, setContractSelection] = useState<
    "unselected" | "standard" | "proxy" | "factory"
  >("unselected");
  const [inputGroupToShow, setInputGroupToShow] = useState<
    "landing" | "proxy" | "factory" | "contractParams"
  >("landing");
  const trackEvent = useTrack();
  const form = useForm<ExtraPublishMetadata>();

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
  }, [inputGroupToShow]);

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
          {inputGroupToShow !== "landing" && (
            <Box>
              <IconButton
                w="inherit"
                variant="ghost"
                onClick={() =>
                  inputGroupToShow === "contractParams" &&
                  contractSelection === "proxy"
                    ? setInputGroupToShow("proxy")
                    : inputGroupToShow === "contractParams" &&
                      contractSelection === "factory"
                    ? setInputGroupToShow("factory")
                    : setInputGroupToShow("landing")
                }
                aria-label="Back"
                icon={<Icon as={IoChevronBack} boxSize={6} />}
              >
                Back
              </IconButton>
            </Box>
          )}
          {inputGroupToShow === "landing" && (
            <LandingFieldset
              contractSelection={contractSelection}
              setContractSelection={setContractSelection}
              latestVersion={latestVersion}
              placeholderVersion={placeholderVersion}
            />
          )}
          {inputGroupToShow === "contractParams" && (
            <ContractParamsFieldset deployParams={deployParams} />
          )}
          {inputGroupToShow === "proxy" && (
            <ProxyFieldset
              setIsDrawerOpen={setIsDrawerOpen}
              contractId={contractId}
            />
          )}
          {inputGroupToShow === "factory" && <FactoryFieldset />}
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
                <Link
                  href="https://portal.thirdweb.com/release"
                  isExternal
                  color="primary.600"
                >
                  Learn more
                </Link>
                .
              </Text>
              {inputGroupToShow === "landing" &&
              contractSelection === "proxy" ? (
                <Button
                  onClick={() => setInputGroupToShow("proxy")}
                  colorScheme="primary"
                  isDisabled={!form.watch("version")}
                >
                  Next
                </Button>
              ) : inputGroupToShow === "landing" &&
                contractSelection === "factory" ? (
                <Button
                  onClick={() => setInputGroupToShow("factory")}
                  colorScheme="primary"
                  isDisabled={!form.watch("version")}
                >
                  Next
                </Button>
              ) : inputGroupToShow !== "contractParams" &&
                deployParams?.length > 0 ? (
                <Button
                  disabled={
                    inputGroupToShow === "landing" &&
                    contractSelection === "unselected"
                  }
                  onClick={() => setInputGroupToShow("contractParams")}
                  colorScheme="primary"
                >
                  Next
                </Button>
              ) : (
                <Button
                  borderRadius="md"
                  position="relative"
                  role="group"
                  colorScheme={address ? "purple" : "blue"}
                  isLoading={isLoading}
                  form="contract-release-form"
                  loadingText={
                    publishMutation.isSuccess
                      ? "Preparing page"
                      : "Publishing contract"
                  }
                  type="submit"
                  isDisabled={!address}
                >
                  Publish Contract
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  );
};
