import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { SolidityInput } from "contract-ui/components/solidity-inputs";
import { useForm } from "react-hook-form";
import { Card, Heading } from "tw-components";

const formInputs = [
  [
    {
      key: "twitter",
      label: "X (Twitter) Username",
      type: "text",
      placeholder: "@Handle",
      required: true,
      helper:
        "A clear title for this checkout that is shown on the checkout UX, credit card statement, and post-purchase email.",
      sideField: false,
    },
    {
      key: "discord",
      label: "Discord Username",
      type: "text",
      placeholder: "Username",
      required: false,
      helper: "",
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
      helper: "Defines the token within the ERC-1155 contract to purchase.",
      sideField: false,
    },
    {
      key: "companyEmail",
      label: "Company Email",
      type: "text",
      placeholder: "support@company.email",
      required: true,
      helper:
        "A buyer will be navigated to this page after a successful purchase.",
      sideField: false,
    },
  ],
  [
    {
      key: "companyLogoUrl",
      label: "Company Logo",
      type: "text",
      placeholder: "https://your-website.com/...",
      required: true,
      helper:
        "A buyer will be navigated to this page if they are unable to make a purchase.",
      sideField: false,
    },
  ],
  [
    {
      key: "launchDate",
      label: "Launch Date",
      type: "text",
      placeholder: "08-24-2022",
      required: true,
      helper:
        "A buyer will be navigated to this page if they are unable to make a purchase.",
      sideField: false,
    },
  ],
] as const satisfies {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "switch" | "image";
  placeholder: string;
  required: boolean;
  helper: string;
  sideField: boolean;
}[][];

type IPaymentsSettingsAccountState = Record<
  (typeof formInputs)[number][number]["key"],
  string
>;

export const PaymentsSettingsAccount: React.FC = () => {
  const form = useForm<IPaymentsSettingsAccountState>({
    defaultValues: {
      twitter: "",
      discord: "",
      companyName: "",
      companyEmail: "",
      companyLogoUrl: "",
      launchDate: "",
    },
  });

  return (
    <Card>
      <Heading>Seller Information</Heading>

      <Flex flexDir="column" gap={4}>
        {formInputs.map((inputs) => (
          <Flex flexDir="row" gap={5}>
            {inputs.map((input) => (
              <Flex key={input.key} flexDir="column" gap={5}>
                {
                  <FormControl key={field.name} isRequired={field.required}>
                    <Flex
                      flexDir={field.sideField ? "row" : "column"}
                      alignItems={field.sideField ? "center" : "flex-start"}
                      justifyContent="space-between"
                    >
                      <FormLabel mb={field.sideField ? 0 : 1} py={2}>
                        {field.label}
                      </FormLabel>
                      {field.type === "textarea" ? (
                        <Textarea
                          {...form.register(field.name, {
                            required: field.required,
                          })}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          borderRadius="lg"
                          w="inherit"
                          size="sm"
                          {...form.register(field.name, {
                            required: field.required,
                          })}
                          placeholder={field.placeholder}
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      ) : field.type === "switch" ? (
                        <Switch
                          onChange={(e) => {
                            form.setValue(field.name, e.target.checked, {
                              shouldDirty: true,
                            });
                          }}
                          isChecked={
                            field.name.startsWith("hide")
                              ? !form.watch(field.name)
                              : form.watch(field.name)
                          }
                        />
                      ) : field.type === "image" ? (
                        <SolidityInput
                          solidityType="string"
                          placeholder={field.placeholder}
                          {...form.register(field.name)}
                        />
                      ) : (
                        <Input
                          {...form.register(field.name, {
                            required: field.required,
                          })}
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                      )}
                    </Flex>
                    {field.helper && (
                      <FormHelperText mt={field.sideField ? 0 : 2}>
                        {field.helper}
                      </FormHelperText>
                    )}
                  </FormControl>
                }
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
