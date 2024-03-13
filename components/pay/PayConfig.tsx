import {
  Divider,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Button,
  Card,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
} from "tw-components";

import { ApiKey, useUpdateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ApiKeyPayConfigValidationSchema,
  PERCENTAGE_TO_BPS,
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
      developerFeeBPS:
        typeof payService?.developerFeeBPS === "number"
          ? (payService?.developerFeeBPS ?? 0.0) / PERCENTAGE_TO_BPS
          : undefined,
      payoutAddress: payService?.payoutAddress,
    },
  });

  useEffect(() => {
    // Clear out any existing values
    form.reset();
    // Set the form values
    form.reset({
      developerFeeBPS:
        typeof payService?.developerFeeBPS === "number"
          ? (payService?.developerFeeBPS ?? 0) / PERCENTAGE_TO_BPS
          : undefined,
      payoutAddress: payService?.payoutAddress,
    });
  }, [form, payService]);

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
    <Card>
      <Flex flexDir="column" gap={7}>
        <Heading size="title.md" as="h2">
          Fee Settings
        </Heading>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          autoComplete="off"
        >
          <Flex flexDir={"column"} gap={7} alignItems={"end"}>
            <Flex flexDir={{ base: "column", lg: "row" }} gap={6} w="full">
              <FormControl
                isInvalid={
                  !!form.getFieldState(`payoutAddress`, form.formState).error
                }
                as={Flex}
                flexDir="column"
                gap={1}
              >
                <FormLabel size="label.md">Recipient address</FormLabel>

                <Input
                  placeholder="0x..."
                  type="text"
                  {...form.register(`payoutAddress`)}
                />
                {form.getFieldState(`payoutAddress`, form.formState).error ? (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`payoutAddress`, form.formState).error
                        ?.message
                    }
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Collected fees will be sent to this address.
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  !!form.getFieldState(`developerFeeBPS`, form.formState).error
                }
                as={Flex}
                flexDir="column"
                gap={1}
              >
                <FormLabel size="label.md">Swap Fee</FormLabel>

                <InputGroup>
                  <Input
                    placeholder="0.01"
                    type="text"
                    {...form.register(`developerFeeBPS`)}
                  />
                  <InputRightElement>%</InputRightElement>
                </InputGroup>
                {form.getFieldState(`developerFeeBPS`, form.formState).error ? (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`developerFeeBPS`, form.formState)
                        .error?.message
                    }
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>Set your fee percentage </FormHelperText>
                )}
              </FormControl>
            </Flex>

            <Divider />

            <Button type="submit" colorScheme="primary">
              Save changes
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
};