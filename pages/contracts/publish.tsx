import {
  Flex,
  FormControl,
  IconButton,
  Input,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { ExtraPublishMetadata } from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { AppLayout } from "components/app-layouts/app";
import { TransactionButton } from "components/buttons/TransactionButton";
import { ContractIdImage } from "components/contract-components/contract-table/cells/image";
import {
  useContractPublishMetadataFromURI,
  usePublishMutation,
} from "components/contract-components/hooks";
import { UrlMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtraPublishMetadata>();

  const router = useRouter();

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

        <Flex gap={4} align="center">
          <Flex direction="column">
            <Skeleton isLoaded={publishMetadata.isSuccess}>
              <Flex gap={2}>
                <Heading minW="60px" size="subtitle.lg">
                  {publishMetadata.data?.name}
                </Heading>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={publishMetadata.isSuccess}>
              <Text maxW="xs" fontStyle="italic" noOfLines={2}>
                {publishMetadata.data?.description || "No description"}
              </Text>
            </Skeleton>
          </Flex>
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
            gap={4}
          >
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Version</FormLabel>
              <Input {...register("version")} placeholder="1.0.1" />
              <FormErrorMessage>{errors?.version?.message}</FormErrorMessage>
            </FormControl>
            <TransactionButton
              colorScheme="primary"
              transactionCount={1}
              isLoading={publishMutation.isLoading}
              type="submit"
            >
              Publish contract
            </TransactionButton>
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
