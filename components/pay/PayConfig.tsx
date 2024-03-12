import {
  Box,
  Divider,
  Flex,
  FormControl,
  Input,
  Spacer,
} from "@chakra-ui/react";
import {
  Button,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "tw-components";

import { ApiKey, useUpdateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ApiKeyPayConfigValidationSchema,
  apiKeyPayConfigValidationSchema,
} from "components/settings/ApiKeys/validations";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PayConfigProps {
  apiKey: ApiKey;
}

const TRACKING_CATEGORY = "pay";
export const PayConfig: React.FC<PayConfigProps> = ({ apiKey }) => {
  const payService = apiKey.services?.find((service) => service.name === "pay");

  const form = useForm<ApiKeyPayConfigValidationSchema>({
    resolver: zodResolver(apiKeyPayConfigValidationSchema),
    defaultValues: {
      developerFeeBPS: payService?.developerFeeBPS ?? 100,
      payoutAddress:
        payService?.payoutAddress ??
        "0x0000000000000000000000000000000000000000",
    },
  });

  useEffect(() => {
    form.reset({
      developerFeeBPS: payService?.developerFeeBPS ?? 100,
      payoutAddress:
        payService?.payoutAddress ??
        "0x0000000000000000000000000000000000000000",
    });
  }, [form, payService?.developerFeeBPS, payService?.payoutAddress]);

  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "Pay API Key configuration updated",
    "Failed to update API Key settings for Pay",
  );

  const mutation = useUpdateApiKey();

  const handleSubmit = form.handleSubmit((values) => {
    const services = apiKey.services;
    if (!services) {
      throw new Error("Bad state: Missing services");
    }

    const { developerFeeBPS, payoutAddress } = values;

    const newServices = services.map((service) => {
      if (service.name !== "pay") {
        return service;
      }

      return {
        ...service,
        developerFeeBPS,
        payoutAddress,
      };
    });

    const formattedValues = {
      ...apiKey,
      services: newServices,
    };

    mutation.mutate(formattedValues, {
      onSuccess: () => {
        onSuccess();
        trackEvent({
          category: TRACKING_CATEGORY,
          action: "configuration-update",
          label: "success",
          data: {
            developerFeeBPS,
            payoutAddress,
          },
        });
      },
      onError: (err) => {
        onError(err);
        trackEvent({
          category: TRACKING_CATEGORY,
          action: "configuration-update",
          label: "error",
          error: err,
        });
      },
    });
  });

  return (
    <Flex flexDir="column">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        autoComplete="off"
      >
        <Flex flexDir="column" gap={4}>
          <Flex flexDir="column" gap={8}>
            <Flex flexDir="column" gap={6}>
              <FormControl
                isInvalid={
                  !!form.getFieldState(`payoutAddress`, form.formState).error
                }
              >
                <FormLabel size="label.sm">Recipient address</FormLabel>
                <Input
                  placeholder="0x0000000000000000000000000000000000000000"
                  type="text"
                  {...form.register(`payoutAddress`)}
                />
                {!form.getFieldState(`payoutAddress`, form.formState).error ? (
                  <FormHelperText>
                    Collected fees will be sent to this address
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`payoutAddress`, form.formState).error
                        ?.message
                    }
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  !!form.getFieldState(`developerFeeBPS`, form.formState).error
                }
              >
                <FormLabel size="label.sm">Fee (BPS)</FormLabel>
                <Input
                  placeholder="https://"
                  type="text"
                  {...form.register(`developerFeeBPS`)}
                />
                {!form.getFieldState(`developerFeeBPS`, form.formState)
                  .error ? (
                  <FormHelperText>
                    Set your fee percentage (in basis points).
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`developerFeeBPS`, form.formState)
                        .error?.message
                    }
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>
          </Flex>
          <Spacer />
          <Divider />

          <Box alignSelf="flex-end">
            <Button type="submit" colorScheme="primary">
              Save changes
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
