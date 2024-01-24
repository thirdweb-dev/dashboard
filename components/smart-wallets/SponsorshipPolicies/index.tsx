import {
  Box,
  Divider,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Stack,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  Heading,
  Text,
  FormLabel,
  Button,
  FormErrorMessage,
} from "tw-components";
import {
  ApiKey,
  ApiKeyService,
  ApiKeyServicePolicy,
} from "@3rdweb-sdk/react/hooks/useApi";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTxNotifications } from "hooks/useTxNotifications";
import { NetworkDropdown } from "components/contract-components/contract-publish-form/NetworkDropdown";
import { LuTrash2 } from "react-icons/lu";
import { toArrFromList } from "utils/string";
import { validStrList } from "utils/validations";
import { isAddress } from "ethers/lib/utils";
import { useEffect } from "react";

interface SponsorshipPoliciesProps {
  apiKey: ApiKey;
  trackingCategory: string;
}

export const sponsorshipPoliciesValidationSchema = z.object({
  allowedChainIds: z.array(z.number()).nullable(),
  allowedContractAddresses: z
    .string()
    .refine((str) => validStrList(str, isAddress), {
      message: "Some of the addresses are invalid",
    })
    .nullable(),
  serverVerifier: z
    .object({
      url: z.string().refine((str) => str.startsWith("https://"), {
        message: "URL must start with https://",
      }),
      headers: z
        .array(z.object({ key: z.string(), value: z.string() }))
        .nullable(),
    })
    .nullable(),
  globalLimit: z
    .object({
      maxSpendUsd: z.number().refine((n) => n > 0, {
        message: "Must be a positive number",
      }),
    })
    .nullable(),
});

export const SponsorshipPolicies: React.FC<SponsorshipPoliciesProps> = ({
  apiKey,
  trackingCategory,
}) => {
  const services = apiKey.services as ApiKeyService[];
  const serviceIdx = services.findIndex((srv) => srv.name === "bundler");
  // TODO prob fetch policies from the API instead of getting it from API key
  const config = services[serviceIdx];

  const form = useForm<z.infer<typeof sponsorshipPoliciesValidationSchema>>({
    resolver: zodResolver(sponsorshipPoliciesValidationSchema),
    defaultValues: {
      // TODO default values
      allowedChainIds: null,
      allowedContractAddresses: null,
      serverVerifier: null,
      globalLimit: null,
    },
  });

  const customHeaderFields = useFieldArray({
    control: form.control,
    name: "serverVerifier.headers",
  });
  useEffect(() => {
    form.reset({
      // TODO default values
      allowedChainIds: null,
      allowedContractAddresses: null,
      serverVerifier: null,
      globalLimit: null,
    });
  }, [config, form]);

  const { onSuccess, onError } = useTxNotifications(
    "Sponsoship policies updated",
    "Failed to update sponsorship policies",
  );

  const handleSubmit = form.handleSubmit((values) => {
    const parsedValues: ApiKeyServicePolicy = {
      ...values,
      allowedContractAddresses:
        values.allowedContractAddresses !== null
          ? toArrFromList(values.allowedContractAddresses)
          : null,
    };
    console.log("submitted", parsedValues);
    onSuccess();
  });

  return (
    <Flex flexDir="column" gap={8}>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        gap={8}
        justifyContent={"space-between"}
        alignItems={"left"}
      >
        <Flex flexDir={"column"} gap={2}>
          <Heading size="title.md" as="h1">
            Sponsorship policies
          </Heading>
          <Text>
            Configure the rules and policies for your sponsored transactions.
          </Text>
        </Flex>
      </Flex>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        autoComplete="off"
      >
        <Flex flexDir="column" gap={6}>
          <FormControl
            isInvalid={
              !!form.getFieldState("allowedChainIds", form.formState).error
            }
          >
            <Flex flexDir="column" gap={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <FormLabel mt={3}>Restrict to specific chains</FormLabel>
                  <Text>
                    Only sponsor transactions on the specified chains.{" "}
                  </Text>
                </Box>

                <Switch
                  colorScheme="primary"
                  isChecked={form.watch("allowedChainIds") !== null}
                  onChange={() => {
                    form.setValue(
                      "allowedChainIds",
                      !form.watch("allowedChainIds") ? [] : null,
                      { shouldDirty: true },
                    );
                  }}
                />
              </HStack>
              {form.watch("allowedChainIds") && (
                <Flex flexDir="column">
                  <NetworkDropdown
                    onMultiChange={(networksEnabled) =>
                      form.setValue("allowedChainIds", networksEnabled)
                    }
                    value={form.watch("allowedChainIds")}
                  />
                  <FormErrorMessage>
                    {
                      form.getFieldState("allowedChainIds", form.formState)
                        .error?.message
                    }
                  </FormErrorMessage>
                </Flex>
              )}
            </Flex>
          </FormControl>
          <Divider />
          <FormControl
            isInvalid={
              !!form.getFieldState("allowedContractAddresses", form.formState)
                .error
            }
          >
            <Flex flexDir="column" gap={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <FormLabel mt={3}>
                    Restrict to specific contract addresses
                  </FormLabel>
                  <Text>
                    Only sponsor transactions for the specified contracts.
                  </Text>
                </Box>

                <Switch
                  colorScheme="primary"
                  isChecked={form.watch("allowedContractAddresses") !== null}
                  onChange={() => {
                    form.setValue(
                      "allowedContractAddresses",
                      form.watch("allowedContractAddresses") === null
                        ? ""
                        : null,
                      { shouldDirty: true },
                    );
                  }}
                />
              </HStack>
              {form.watch("allowedContractAddresses") !== null && (
                <Flex flexDir="column">
                  <Textarea
                    placeholder="Comma separated list of contract addresses. ex: 0x1234..., 0x5678..."
                    {...form.register("allowedContractAddresses")}
                  />
                  <FormErrorMessage>
                    {
                      form.getFieldState(
                        "allowedContractAddresses",
                        form.formState,
                      ).error?.message
                    }
                  </FormErrorMessage>
                </Flex>
              )}
            </Flex>
          </FormControl>
          <Divider />
          <FormControl>
            <Flex flexDir="column" gap={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <FormLabel mt={3}>Global spend limits</FormLabel>
                  <Text>
                    Maximum gas cost (in USD) that you want to sponsor. This
                    applies for the duration of the billing period (monthly).
                    Once this limit is reached, your users will have to fund
                    their own gas costs.
                  </Text>
                </Box>

                <Switch
                  colorScheme="primary"
                  isChecked={!!form.watch("globalLimit")}
                  onChange={() => {
                    form.setValue(
                      "globalLimit",
                      !form.watch("globalLimit")
                        ? {
                            maxSpendUsd: 0,
                          }
                        : null,
                      { shouldDirty: true },
                    );
                  }}
                />
              </HStack>
              {form.watch("globalLimit") && (
                <VStack>
                  <FormControl
                    isInvalid={
                      !!form.getFieldState(
                        "globalLimit.maxSpendUsd",
                        form.formState,
                      ).error
                    }
                  >
                    <FormLabel>Spend limit</FormLabel>
                    <HStack alignItems="center">
                      <Input
                        w={"xs"}
                        placeholder="Enter an amount"
                        value={form.watch("globalLimit.maxSpendUsd") ?? ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            form.setValue("globalLimit.maxSpendUsd", 0);
                          } else {
                            form.setValue("globalLimit.maxSpendUsd", value);
                          }
                        }}
                      />
                      <Text>USD per month</Text>
                    </HStack>
                    <FormErrorMessage>
                      {
                        form.getFieldState(
                          "globalLimit.maxSpendUsd",
                          form.formState,
                        ).error?.message
                      }
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              )}
            </Flex>
          </FormControl>
          <Divider />
          <FormControl>
            <Flex flexDir="column" gap={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <FormLabel mt={3}>Server verifier</FormLabel>
                  <Text>
                    Specify your own endpoint that will verify each transaction
                    and decide wether it should be sponsored or not. This gives
                    you fine grained control and lets you build your own
                    policies.
                  </Text>
                </Box>

                <Switch
                  colorScheme="primary"
                  isChecked={!!form.watch("serverVerifier")}
                  onChange={() => {
                    form.setValue(
                      "serverVerifier",
                      !form.watch("serverVerifier")
                        ? {
                            url: "",
                            headers: [],
                          }
                        : null,
                      { shouldDirty: true },
                    );
                  }}
                />
              </HStack>
              {form.watch("serverVerifier") && (
                <HStack alignItems={"start"}>
                  <FormControl
                    isInvalid={
                      !!form.getFieldState("serverVerifier.url", form.formState)
                        .error
                    }
                  >
                    <FormLabel>URL</FormLabel>
                    <Input
                      placeholder="https://example.com/your-verifier"
                      type="text"
                      {...form.register("serverVerifier.url")}
                    />
                    <FormErrorMessage>
                      {
                        form.getFieldState("serverVerifier.url", form.formState)
                          .error?.message
                      }
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel size="label.sm">Custom Headers</FormLabel>
                    <Stack gap={3} alignItems={"end"}>
                      {customHeaderFields.fields.map((_, customHeaderIdx) => {
                        return (
                          <Flex key={customHeaderIdx} gap={2} w="full">
                            <Input
                              placeholder="Key"
                              type="text"
                              {...form.register(
                                `serverVerifier.headers.${customHeaderIdx}.key`,
                              )}
                            />
                            <Input
                              placeholder="Value"
                              type="text"
                              {...form.register(
                                `serverVerifier.headers.${customHeaderIdx}.value`,
                              )}
                            />
                            <IconButton
                              aria-label="Remove header"
                              icon={<LuTrash2 />}
                              onClick={() => {
                                customHeaderFields.remove(customHeaderIdx);
                              }}
                            />
                          </Flex>
                        );
                      })}
                      <Button
                        onClick={() => {
                          customHeaderFields.append({
                            key: "",
                            value: "",
                          });
                        }}
                        w={
                          customHeaderFields.fields.length === 0
                            ? "full"
                            : "fit-content"
                        }
                      >
                        Add header
                      </Button>
                    </Stack>
                  </FormControl>
                </HStack>
              )}
            </Flex>
          </FormControl>
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
