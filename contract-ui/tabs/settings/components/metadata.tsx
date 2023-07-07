import { SettingDetectedState } from "./detected-state";
import { AdminOnly } from "@3rdweb-sdk/react/components/roles/admin-only";
import { Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContractMetadata, useUpdateMetadata } from "@thirdweb-dev/react";
import {
  CommonContractSchema,
  ValidContractInstance,
} from "@thirdweb-dev/sdk/evm";
import { ExtensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { TransactionButton } from "components/buttons/TransactionButton";
import { FileInput } from "components/shared/FileInput";
import { useTrack } from "hooks/analytics/useTrack";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Card,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import { z } from "zod";

const DashboardCommonContractSchema = CommonContractSchema.extend({
  dashboard_social_urls: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
});

function extractDomain(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    // Remove www. from hostname
    const hostnameWithoutWww = hostname.replace(/^www\./, "");
    const segments = hostnameWithoutWww.split(".");
    const domain =
      segments.length > 2 ? segments[segments.length - 2] : segments[0];
    return domain;
  } catch (error) {
    console.error(`Invalid URL: ${url}`);
    return url;
  }
}

export const SettingsMetadata = <
  TContract extends ValidContractInstance | undefined,
>({
  contract,
  detectedState,
}: {
  contract: TContract;
  detectedState: ExtensionDetectedState;
}) => {
  const trackEvent = useTrack();
  const metadata = useContractMetadata(contract);
  const metadataMutation = useUpdateMetadata(contract);

  const transformedQueryData = useMemo(() => {
    return {
      ...metadata.data,
      dashboard_social_urls: Object.entries(
        metadata.data.social_urls || { twitter: "", discord: "", website: "" },
      ).map(([key, value]) => ({ key, value })),
    };
  }, [metadata.data]);

  const {
    control,
    setValue,
    register,
    watch,
    handleSubmit,
    formState,
    getFieldState,
  } = useForm<z.input<typeof DashboardCommonContractSchema>>({
    resolver: zodResolver(DashboardCommonContractSchema),
    defaultValues: transformedQueryData,
    values: transformedQueryData,
    resetOptions: {
      keepDirty: true,
      keepDirtyValues: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dashboard_social_urls",
  });

  console.log({ fields });

  const { onSuccess, onError } = useTxNotifications(
    "Successfully updated metadata",
    "Error updating metadata",
  );

  return (
    <Card p={0} position="relative">
      <SettingDetectedState type="metadata" detectedState={detectedState} />
      <Flex
        as="form"
        onSubmit={handleSubmit((d) => {
          const socialUrlsArray =
            Object.keys(d?.dashboard_social_urls || {}).length > 0
              ? (d?.dashboard_social_urls as unknown as {
                  key: string;
                  value: string;
                }[])
              : [];

          const socialUrlsObj = socialUrlsArray.reduce<Record<string, string>>(
            (obj, item) => {
              const domain = extractDomain(item.value);
              if (domain && item.value.trim() !== "") {
                obj[domain] = item.value;
              }
              return obj;
            },
            {},
          );
          console.log({ d, socialUrlsObj, socialUrlsArray });

          /* trackEvent({
            category: "settings",
            action: "set-metadata",
            label: "attempt",
          });
          metadataMutation.mutate(
            {
              name: d.name,
              description: d.description,
              image: d.image,
              app_uri: d.app_uri,
              external_link: d.external_link,
              social_urls: socialUrlsObj,
            },
            {
              onSuccess: () => {
                trackEvent({
                  category: "settings",
                  action: "set-metadata",
                  label: "success",
                });
                onSuccess();
              },
              onError: (error) => {
                trackEvent({
                  category: "settings",
                  action: "set-metadata",
                  label: "error",
                  error,
                });
                onError(error);
              },
            },
          );*/
        })}
        direction="column"
      >
        <Flex p={{ base: 6, md: 10 }} as="section" direction="column" gap={4}>
          <Flex direction="column">
            <Heading size="title.md">Metadata</Heading>
            <Text size="body.md" fontStyle="italic">
              Settings to organize and distinguish between your different
              contracts.
            </Text>
          </Flex>
          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <Flex
              flexShrink={0}
              flexGrow={1}
              maxW={{ base: "100%", md: "160px" }}
            >
              <FormControl
                display="flex"
                flexDirection="column"
                isDisabled={metadata.isLoading || metadataMutation.isLoading}
                isInvalid={!!getFieldState("image", formState).error}
              >
                <FormLabel>Image</FormLabel>
                <FileInput
                  isDisabled={metadata.isLoading || metadataMutation.isLoading}
                  accept={{ "image/*": [] }}
                  value={useImageFileOrUrl(watch("image"))}
                  setValue={(file) =>
                    setValue("image", file, {
                      shouldTouch: true,
                      shouldDirty: true,
                    })
                  }
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  transition="all 200ms ease"
                />
                <FormErrorMessage>
                  {getFieldState("image", formState).error?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex
              direction="column"
              gap={4}
              flexGrow={1}
              justify="space-between"
            >
              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                <FormControl
                  isDisabled={metadata.isLoading || metadataMutation.isLoading}
                  isInvalid={!!getFieldState("name", formState).error}
                >
                  <FormLabel>Name</FormLabel>
                  <Input variant="filled" {...register("name")} />
                  <FormErrorMessage>
                    {getFieldState("name", formState).error?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl
                isDisabled={metadata.isLoading || metadataMutation.isLoading}
                isInvalid={!!getFieldState("description", formState).error}
              >
                <FormLabel>Description</FormLabel>
                <Textarea variant="filled" {...register("description")} />
                <FormErrorMessage>
                  {getFieldState("description", formState).error?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
          <Flex direction="column" gap={4}>
            {fields.map((item, index) => (
              <Flex key={item.id}>
                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {item.key || "New URL"}
                  </FormLabel>
                  <Input
                    {...register(`dashboard_social_urls.${index}.value`)}
                    type="url"
                    placeholder="https://..."
                  />
                </FormControl>
                <button onClick={() => remove(index)}>Remove</button>
              </Flex>
            ))}
            <button onClick={() => append({ key: "", value: "" })}>
              Add More
            </button>
          </Flex>
        </Flex>

        <AdminOnly contract={contract as ValidContractInstance}>
          <TransactionButton
            colorScheme="primary"
            transactionCount={1}
            isDisabled={metadata.isLoading || !formState.isDirty}
            type="submit"
            isLoading={metadataMutation.isLoading}
            loadingText="Saving..."
            size="md"
            borderRadius="xl"
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
          >
            Update Metadata
          </TransactionButton>
        </AdminOnly>
      </Flex>
    </Card>
  );
};
