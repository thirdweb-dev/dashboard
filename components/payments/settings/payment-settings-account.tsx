import { Flex, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import {
  SellerValueInput,
  usePaymentsSellerByAccountId,
  usePaymentsUpdateSellerByAccountId,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { toDateTimeLocal } from "utils/date-utils";
import { useTrack } from "hooks/analytics/useTrack";
import { PaymentsSettingsFileUploader } from "./payment-setting-file-uploader";

interface PaymentsSettingsAccountProps {
  accountId: string;
}

export const PaymentsSettingsAccount: React.FC<
  PaymentsSettingsAccountProps
> = ({ accountId }) => {
  const { mutate: updateSellerByAccountId } =
    usePaymentsUpdateSellerByAccountId(accountId);
  const { data: sellerData } = usePaymentsSellerByAccountId(accountId);
  const trackEvent = useTrack();

  const values: SellerValueInput = {
    ...sellerData,
    estimated_launch_date: sellerData?.estimated_launch_date
      ? new Date(sellerData?.estimated_launch_date)
      : new Date(),
    company_logo_url: sellerData?.company_logo_url || "",
    company_name: sellerData?.company_name || "",
    support_email: sellerData?.support_email || "",
    discord_username: sellerData?.discord_username || "",
    twitter_handle: sellerData?.twitter_handle || "",
  };

  const form = useForm<SellerValueInput>({
    defaultValues: values,
    values,
    resetOptions: {
      keepDirty: true,
      keepDirtyValues: true,
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "Profile saved succesfully.",
    "Failed to save profile",
  );

  return (
    <Card
      p={8}
      as={Flex}
      flexDir="column"
      gap={8}
      maxW={{ base: "full", lg: "70%" }}
    >
      <Flex flexDir="column" gap={2}>
        <Heading>Seller Information</Heading>
        <Text>These fields are shown to your buyers. </Text>
      </Flex>

      <Flex
        as="form"
        gap={4}
        flexDir="column"
        onSubmit={form.handleSubmit((data) => {
          trackEvent({
            category: "payments",
            action: "update-settings",
            label: "attempt",
          });
          updateSellerByAccountId(
            {
              thirdwebAccountId: accountId,
              sellerValue: {
                ...data,
              },
            },
            {
              onSuccess: () => {
                trackEvent({
                  category: "payments",
                  action: "update-settings",
                  label: "success",
                });
                onSuccess();
              },
              onError: (error) => {
                trackEvent({
                  category: "payments",
                  action: "update-settings",
                  label: "error",
                  error,
                });
                onError(error);
              },
            },
          );
        })}
      >
        <Flex flexDir="column" gap={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <FormControl
              isInvalid={!!form.formState.errors.twitter_handle}
              isRequired
            >
              <FormLabel>X (Twitter) Username</FormLabel>
              <Input
                placeholder="@handle"
                {...form.register("twitter_handle", { required: true })}
              />
              <FormErrorMessage>
                {form.formState.errors?.twitter_handle?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.discord_username}>
              <FormLabel>Discord Username</FormLabel>
              <Input
                placeholder="username#0000"
                {...form.register("discord_username")}
              />
              <FormErrorMessage>
                {form.formState.errors?.discord_username?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!form.formState.errors.discord_username}
              isRequired
            >
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Your Company"
                {...form.register("company_name", { required: true })}
              />
              <FormErrorMessage>
                {form.formState.errors?.company_name?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!form.formState.errors.support_email}
              isRequired
            >
              <FormLabel>Company Email</FormLabel>
              <Input
                placeholder="your@company.com"
                type="email"
                {...form.register("support_email", { required: true })}
              />
              <FormErrorMessage>
                {form.formState.errors?.support_email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!form.formState.errors.estimated_launch_date}
              isRequired
            >
              <FormLabel>Estimated Launch Date</FormLabel>
              <Input
                type="datetime-local"
                value={toDateTimeLocal(form.getValues().estimated_launch_date)}
                onChange={(e) => {
                  form.setValue(
                    `estimated_launch_date`,
                    new Date(e.target.value),
                  );
                  if (new Date(e.target.value) < new Date()) {
                    form.setError("estimated_launch_date", {
                      type: "validate",
                      message: "Estimated launch date must be in the future.",
                    });
                    return;
                  } else {
                    form.clearErrors("estimated_launch_date");
                  }
                }}
              />
              <FormErrorMessage>
                {form.formState.errors?.estimated_launch_date?.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          {/*           <Flex w={{ base: "50%", md: "full" }}>
            <PaymentsSettingsFileUploader
              value={form.watch("company_logo_url")}
              onUpdate={(value) => form.setValue("company_logo_url", value)}
            />
          </Flex> */}
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          colorScheme="primary"
          px={12}
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </Flex>
    </Card>
  );
};
