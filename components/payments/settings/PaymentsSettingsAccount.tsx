import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Box, Flex, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import { format } from "date-fns";
import {
  GetSellerByThirdwebAccountIdDocument,
  useGetSellerByThirdwebAccountIdQuery,
} from "graphql/mutations/__generated__/GetSellerByThirdwebAccountId.generated";
import { useUpdateSellerByThirdwebAccountIdMutation } from "graphql/mutations/__generated__/UpdateSellerByThirdwebAccountId.generated";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Card,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import { PaymentsSettingsFileUploader } from "./PaymentsSettingsFileUploader";

const formInputs = [
  [
    {
      key: "companyLogoUrl",
      label: "Company Logo",
      type: "upload",
      placeholder: "@Handle",
      required: true,
      helper: "76px x 76px recommended",
      sideField: false,
    },
    {
      key: "",
      label: "",
      type: null,
      placeholder: "",
      required: false,
      helper: null,
      sideField: false,
    },
  ],
  [
    {
      key: "twitter",
      label: "X (Twitter) Username",
      type: "text",
      placeholder: "@Handle",
      required: true,
      helper: null,
      sideField: false,
    },
    {
      key: "discord",
      label: "Discord Username",
      type: "text",
      placeholder: "Username",
      required: false,
      helper: null,
      sideField: false,
    },
  ],
  [
    {
      key: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Your Company",
      required: true,
      helper: null,
      sideField: false,
    },
    {
      key: "supportEmail",
      label: "Company Email",
      type: "text",
      placeholder: "support@company.email",
      required: true,
      helper: null,
      sideField: false,
    },
  ],
  [
    {
      key: "launchDate",
      label: "Launch Date",
      type: "date",
      placeholder: "MM/DD/YYYY",
      required: true,
      helper: null,
      sideField: false,
    },
    {
      key: "",
      label: "",
      type: null,
      placeholder: "",
      required: false,
      helper: null,
      sideField: false,
    },
  ],
] as const;

type IPaymentsSettingsAccountState = Record<
  (typeof formInputs)[number][number]["key"] | "companyLogoUrl",
  string
>;

export const PaymentsSettingsAccount: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: account } = useAccount();
  const [updateSellerByThirdwebAccountId] =
    useUpdateSellerByThirdwebAccountIdMutation({
      refetchQueries: [GetSellerByThirdwebAccountIdDocument],
    });
  const { data: sellerData } = useGetSellerByThirdwebAccountIdQuery({
    variables: { thirdwebAccountId: account?.id ?? "" },
    skip: !account?.id,
  });

  const form = useForm<IPaymentsSettingsAccountState>({
    defaultValues: {
      twitter: "",
      discord: "",
      companyName: "",
      supportEmail: "",
      companyLogoUrl: "",
      launchDate: "",
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "Profile saved.",
    "Failed to save profile.",
  );

  useEffect(() => {
    const seller = sellerData?.seller[0];
    if (!seller) {
      return;
    }

    form.setValue("twitter", seller?.twitter_handle ?? "");
    form.setValue("discord", seller?.discord_username ?? "");
    form.setValue("companyName", seller?.company_name ?? "");
    form.setValue("companyLogoUrl", seller?.company_logo_url ?? "");
    form.setValue("supportEmail", seller?.support_email ?? "");
    form.setValue(
      "launchDate",
      seller?.estimated_launch_date
        ? format(new Date(seller?.estimated_launch_date), "yyyy-MM-dd")
        : "",
    );
  }, [sellerData, form]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    if (!account?.id) {
      return;
    }

    await form.trigger();
    form.handleSubmit((data) => {
      (async () => {
        try {
          await updateSellerByThirdwebAccountId({
            variables: {
              thirdwebAccountId: account?.id,
              sellerValue: {
                twitter_handle: data.twitter,
                discord_username: data.discord,
                company_name: data.companyName,
                company_logo_url: data.companyLogoUrl,
                support_email: data.supportEmail,
                estimated_launch_date: new Date(data.launchDate),
              },
            },
          });
          onSuccess();
        } catch (error) {
          onError(error);
        }
      })();
    })();
  };

  return (
    <Card maxW="744px">
      <Heading>Seller Information</Heading>
      <Text>These fields are shown to your buyers. </Text>

      <FormProvider {...form}>
        <Flex flexDir="column" gap={4} py="4">
          {/* Text Information Input */}
          <Flex flexDir="column" gap={4}>
            {formInputs.map((inputs) => (
              <SimpleGrid
                key={inputs[0].key}
                columns={{ sm: 1, md: inputs.length }}
                gap={4}
              >
                {inputs.map((input) => {
                  if (!input.key) {
                    return null;
                  }
                  return (
                    <Flex key={input.key} flexDir="column" gap={5}>
                      {
                        <FormControl
                          key={input.key}
                          isRequired={input.required}
                        >
                          <Flex
                            flexDir={input.sideField ? "row" : "column"}
                            alignItems={
                              input.sideField ? "center" : "flex-start"
                            }
                            justifyContent="space-between"
                          >
                            <FormLabel mb={input.sideField ? 0 : 1} pt={2}>
                              {input.label}
                            </FormLabel>
                            {input.helper && (
                              <FormHelperText pb={4}>
                                {input.helper}
                              </FormHelperText>
                            )}
                            {(() => {
                              switch (input.type) {
                                case "date":
                                case "text": {
                                  return (
                                    <Input
                                      {...form.register(
                                        input.key as keyof IPaymentsSettingsAccountState,
                                        {
                                          required: input.required,
                                        },
                                      )}
                                      type={input.type}
                                      placeholder={input.placeholder}
                                    />
                                  );
                                }
                                case "upload": {
                                  return (
                                    <Box w="32">
                                      <PaymentsSettingsFileUploader
                                        accept={{ "image/*": [] }}
                                        value={form.watch(input.key)}
                                        onUpdate={(value) =>
                                          form.setValue(input.key, value)
                                        }
                                        setIsLoading={setIsLoading}
                                      />{" "}
                                    </Box>
                                  );
                                }
                                // case "textarea": {
                                //   return (
                                //     <Textarea
                                //       {...form.register(input.key, {
                                //         required: input.required,
                                //       })}
                                //       placeholder={input.placeholder}
                                //     />
                                //   );
                                // }
                                // case "select": {
                                //   return (
                                //     <Select
                                //       borderRadius="lg"
                                //       w="inherit"
                                //       size="sm"
                                //       {...form.register(input.key, {
                                //         required: input.required,
                                //       })}
                                //       placeholder={input.placeholder}
                                //     />
                                //   );
                                // }
                                // case "switch": {
                                //   return (
                                //     <Switch
                                //       onChange={(e) => {
                                //         form.setValue(input.key, e.target.checked , {
                                //           shouldDirty: true,
                                //         });
                                //       }}
                                //       isChecked={false}
                                //     />
                                //   );
                                // }
                                // case "image": {
                                //   return (
                                //     <SolidityInput
                                //       solidityType="string"
                                //       placeholder={input.placeholder}
                                //       {...form.register(input.key)}
                                //     />
                                //   );
                                // }
                                default: {
                                  return null;
                                }
                              }
                            })()}
                          </Flex>
                        </FormControl>
                      }
                    </Flex>
                  );
                })}
              </SimpleGrid>
            ))}
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end">
          <Button
            type="button"
            colorScheme="primary"
            minW="200px"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Save
          </Button>
        </Flex>
      </FormProvider>
    </Card>
  );
};
