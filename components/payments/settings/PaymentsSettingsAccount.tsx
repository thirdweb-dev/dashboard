import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Box, Flex, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import { useUpdateSellerByThirdwebAccountIdMutation } from "graphql/mutations/__generated__/UpdateSellerByThirdwebAccountId.generated";
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
] as const satisfies {
  key: string;
  label: string;
  type: "text" | "date" | null;
  placeholder: string;
  required: boolean;
  helper: string | null;
  sideField: boolean;
}[][];

type IPaymentsSettingsAccountState = Record<
  (typeof formInputs)[number][number]["key"] | "companyLogoUrl",
  string
>;

export const PaymentsSettingsAccount: React.FC = () => {
  const { data: account } = useAccount();
  const [updateSellerByThirdwebAccountId] =
    useUpdateSellerByThirdwebAccountIdMutation();
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

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    if (!account?.id) {
      return;
    }

    await form.trigger();
    form.handleSubmit((data) => {
      updateSellerByThirdwebAccountId({
        variables: {
          thirdwebAccountId: account?.id,
          sellerValue: {
            twitter_handle: data.twitter,
            discord_username: data.discord,
            company_name: data.companyName,
            company_logo_url: data.companyLogoUrl,
            support_email: data.supportEmail,
            estimated_launch_date: data.launchDate,
          },
        },
      });
    })();
  };

  return (
    <Card maxW="744px">
      <Heading>Seller Information</Heading>
      <Text>These fields are shown to your buyers. </Text>

      <FormProvider {...form}>
        <Flex flexDir="column" gap={4} py="4">
          {/* Company Logo Input */}
          <FormControl>
            <FormLabel pt={2}>Company Logo</FormLabel>
            <FormHelperText pb={4}>76px x 76px recommended</FormHelperText>

            <Box w="32">
              <PaymentsSettingsFileUploader
                accept={{ "image/*": [] }}
                value={form.watch("companyLogoUrl")}
                onUpdate={(value) => form.setValue("companyLogoUrl", value)}
              />
            </Box>
          </FormControl>

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
          <Button type="button" colorScheme="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Flex>
      </FormProvider>
    </Card>
  );
};
