import {
  Flex,
  FormControl,
  Input,
  Link,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ExtraPublishMetadata } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { TransactionButton } from "components/buttons/TransactionButton";
import {
  useContractPrePublishMetadata,
  useContractPublishMetadataFromURI,
  usePublishMutation,
} from "components/contract-components/hooks";
import { UrlMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Badge,
  Card,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
} from "tw-components";

const ContractsPublishPageWrapped: React.FC = () => {
  const { Track, trackEvent } = useTrack({
    page: "publish",
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ExtraPublishMetadata>();

  const router = useRouter();
  const address = useAddress();

  const ipfsHashes = useMemo(() => {
    const uri = router.query.uri;
    const ipfs = router.query.ipfs;
    let array: string[] = [];
    // handle both ipfs and uri
    if (ipfs) {
      array = Array.isArray(ipfs) ? ipfs : [ipfs];
    } else if (uri) {
      array = (Array.isArray(uri) ? uri : [uri]).map((hash) =>
        hash.replace("ipfs://", ""),
      );
    }
    return array;
  }, [router.query]);

  const { onSuccess, onError } = useTxNotifications(
    "Successfully published contract",
    "Failed to publish contracts",
  );
  const publishMutation = usePublishMutation();

  const publishableContractId = useMemo(() => {
    return ipfsHashes.find((id) => !(id in UrlMap));
  }, [ipfsHashes]);

  const uri = useMemo(
    () =>
      publishableContractId?.startsWith("ipfs://")
        ? publishableContractId
        : `ipfs://${publishableContractId}`,
    [publishableContractId],
  );

  const publishMetadata = useContractPublishMetadataFromURI(uri);
  const prePublishMetadata = useContractPrePublishMetadata(uri, address);

  useEffect(() => {
    if (!isDirty && address) {
      reset({
        ...prePublishMetadata.data?.latestPublishedContractMetadata
          ?.publishedMetadata,
        changelog: "",
        version: "",
        description:
          prePublishMetadata.data?.latestPublishedContractMetadata
            ?.publishedMetadata.description ||
          prePublishMetadata.data?.preDeployMetadata.info.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prePublishMetadata.data, address]);

  const latestVersion =
    prePublishMetadata.data?.latestPublishedContractMetadata?.publishedMetadata
      .version;

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">
            Publish Contracts{" "}
            <Badge variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Heading>
          <Text fontStyle="italic" maxW="container.md">
            Publishing contracts lets you make your contracts available to be
            deployed later, across multiple chains. You can even share your
            published contracts with others, letting them deploy instances of
            your contracts.
            <br />
            <Link
              color="primary.500"
              isExternal
              href="https://portal.thirdweb.com/thirdweb-deploy"
            >
              Learn more about publishing contracts
            </Link>
          </Text>
        </Flex>
        <Card w="100%" p={6}>
          <Flex
            as="form"
            onSubmit={handleSubmit((data) => {
              trackEvent({
                category: "publish",
                action: "click",
                label: "attempt",
                uris: uri,
              });
              publishMutation.mutate(
                { predeployUri: uri, extraMetadata: data },
                {
                  onSuccess: () => {
                    onSuccess();
                    trackEvent({
                      category: "publish",
                      action: "click",
                      label: "success",
                      uris: uri,
                    });
                    router.push(`/contracts`);
                  },
                  onError: (err) => {
                    onError(err);
                    trackEvent({
                      category: "publish",
                      action: "click",
                      label: "error",
                      uris: uri,
                    });
                  },
                },
              );
            })}
            direction="column"
            gap={6}
          >
            <Flex gap={4} align="center">
              <Flex direction="column">
                <Skeleton isLoaded={publishMetadata.isSuccess}>
                  <Flex gap={2}>
                    <Heading minW="60px" size="subtitle.lg">
                      {publishMetadata.data?.name}
                    </Heading>
                  </Flex>
                </Skeleton>
              </Flex>
            </Flex>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Description</FormLabel>
              <Input {...register("description")} disabled={!address} />
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>
                Version {latestVersion && `(latest: ${latestVersion})`}
              </FormLabel>
              <Input
                {...register("version")}
                placeholder={latestVersion || "1.0.0"}
                disabled={!address}
              />
              <FormErrorMessage>{errors?.version?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>What&apos;s new?</FormLabel>
              <Textarea {...register("changelog")} disabled={!address} />
              <FormErrorMessage>{errors?.changelog?.message}</FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>
                Contracts are published for free (gasless) on the Polygon
                network.
              </Text>
              <TransactionButton
                colorScheme="purple"
                transactionCount={1}
                isLoading={publishMutation.isLoading}
                type="submit"
              >
                Publish contract
              </TransactionButton>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Track>
  );
};

export default function ContractsPublishPage() {
  return (
    <PublisherSDKContext>
      <ContractsPublishPageWrapped />
    </PublisherSDKContext>
  );
}

ContractsPublishPage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
