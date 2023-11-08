import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  Input,
  Select,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormHelperText, FormLabel } from "tw-components";
import {
  CreateCheckoutInput,
  isPaymentsSupported,
  usePaymentsCreateCheckout,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { useState } from "react";
import { SolidityInput } from "contract-ui/components/solidity-inputs";
import { useContract } from "@thirdweb-dev/react";
import { detectFeatures } from "components/contract-components/utils";

const formInputs = [
  {
    step: "info",
    fields: [
      {
        name: "title",
        label: "Collection Name",
        type: "text",
        placeholder: "My NFT Collection",
        required: true,
        helper:
          "A clear title for this checkout that is shown on the checkout UX, credit card statement, and post-purchase email.",
        sideField: false,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Checkout Description",
        required: false,
        helper: "",
        sideField: false,
      },
      {
        name: "tokenId",
        label: "Token ID",
        type: "number",
        placeholder: "",
        required: true,
        helper: "Defines the token within the ERC-1155 contract to purchase.",
        sideField: false,
      },
      {
        name: "successCallbackUrl",
        label: "Post-Purchase URL",
        type: "text",
        placeholder: "https://your-website.com/thank-you",
        required: false,
        helper:
          "A buyer will be navigated to this page after a successful purchase.",
        sideField: false,
      },
      {
        name: "cancelCallbackUrl",
        label: "Error URL",
        type: "text",
        placeholder: "https://your-website.com/something-went-wrong",
        required: false,
        helper:
          "A buyer will be navigated to this page if they are unable to make a purchase.",
        sideField: false,
      },
    ],
  },
  /*   {
    step: "non-tw",
    fields: [
      {
        name: "mintMethod",
        label: "Mint Method",
        type: "text",
        placeholder: "",
        required: true,
        helper: "",
        sideField: false,
      },
    ],
  }, */
  {
    step: "branding",
    fields: [
      {
        name: "imageUrl",
        label: "Image",
        type: "image",
        placeholder: "https:// or ipfs://",
        required: false,
        helper: "",
        sideField: false,
      },
      {
        name: "brandDarkMode",
        label: "Dark mode",
        type: "switch",
        placeholder: "",
        required: false,
        helper: "",
        sideField: true,
      },
      {
        name: "brandColorScheme",
        label: "Color",
        type: "select",
        options: [
          { label: "Gray", value: "gray" },
          { label: "Red", value: "red" },
          { label: "Orange", value: "orange" },
          { label: "Yellow", value: "yellow" },
          { label: "Green", value: "green" },
          { label: "Teal", value: "teal" },
          { label: "Blue", value: "blue" },
          { label: "Cyan", value: "cyan" },
          { label: "Purple", value: "purple" },
          { label: "Pink", value: "pink" },
        ],
        placeholder: "",
        required: false,
        helper: "",
        sideField: true,
      },
      {
        name: "brandButtonShape",
        label: "Button shape",
        type: "select",
        options: [
          { label: "Rounded", value: "rounded" },
          { label: "Pill", value: "pill" },
          { label: "Square", value: "square" },
        ],
        placeholder: "",
        required: false,
        helper: "",
        sideField: true,
      },
    ],
  },
  {
    step: "delivery",
    fields: [
      {
        name: "hidePaperWallet",
        label: "Allow purchasing to an email wallet",
        type: "switch",
        placeholder: "",
        required: false,
        helper: "Allow users to create a wallet via email or social login.",
        sideField: true,
      },
      {
        name: "hideExternalWallet",
        label: "Allow purchasing to an external wallet",
        type: "switch",
        placeholder: "",
        required: false,
        helper: "e.g. MetaMask, WalletConnect, Coinbase Wallet.",
        sideField: true,
      },
      {
        name: "hidePayWithCard",
        label: "Allow paying with card",
        type: "switch",
        placeholder: "",
        required: false,
        helper: "(Credit card, Apple Pay, Google Pay).",
        sideField: true,
      },
      {
        name: "hidePayWithCrypto",
        label: "Allow paying with ETH",
        type: "switch",
        placeholder: "",
        required: false,
        helper: "",
        sideField: true,
      },
      {
        name: "hidePayWithIdeal",
        label: "Allow paying with iDEAL",
        type: "switch",
        placeholder: "",
        required: false,
        helper:
          "Allow buyers from paying with iDEAL, a common payment method in the Netherlands.",
        sideField: true,
      },
    ],
  },
  {
    step: "advanced",
    fields: [
      {
        name: "limitPerTransaction",
        label: "Max quantity per purchase",
        type: "number",
        placeholder: "",
        required: false,
        helper: "Buyers can still make multiple purchases.",
        sideField: false,
      },
      {
        name: "redirectAfterPayment",
        label: "Immediately redirect after payment",
        type: "switch",
        placeholder: "",
        required: false,
        helper:
          "Buyers will be redirected to the Post-Purchase Redirect URL after payment.",
        sideField: true,
      },
      {
        name: "sendEmailOnTransferSucceeded",
        label: "Email buyers when their purchase is completed",
        type: "switch",
        placeholder: "",
        required: false,
        helper:
          "Buyers will be emailed when their purchase is successfully delivered to their wallet. Buyers are always emailed a receipt after a successful payment.",
        sideField: true,
      },
      {
        name: "twitterHandleOverride",
        label: "Seller Twitter username",
        type: "text",
        placeholder: "Enter a Twitter username without the @",
        required: false,
        helper:
          "Override your organization's Twitter username for this checkout.",
        sideField: false,
      },
    ],
  },
] as const;

interface CreateCheckoutButtonProps {
  contractId: string;
  contractAddress: string;
}

export const CreateCheckoutButton: React.FC<CreateCheckoutButtonProps> = ({
  contractId,
  contractAddress,
}) => {
  const { contract } = useContract(contractAddress);
  const isSupportedContract = isPaymentsSupported(contract);
  const isErc1155 = detectFeatures(contract, ["ERC1155"]);

  const [step, setStep] = useState<
    "info" | /* "non-tw" | */ "branding" | "delivery" | "advanced"
  >("info");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: createCheckout } = usePaymentsCreateCheckout(contractAddress);
  const trackEvent = useTrack();
  const form = useForm<CreateCheckoutInput>({
    defaultValues: {
      contractId,
      imageUrl: "",
      hidePaperWallet: false,
      hideExternalWallet: false,
      hidePayWithCard: false,
      hidePayWithCrypto: false,
      hidePayWithIdeal: true,
      limitPerTransaction: 5,
      redirectAfterPayment: false,
      sendEmailOnTransferSucceeded: true,
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "Checkout created successfully.",
    "Failed to create checkout.",
  );

  const handleNext = async () => {
    await form.trigger();

    if (step === "advanced") {
      trackEvent({
        category: "payments",
        action: "create-checkout",
        label: "attempt",
      });
      form.handleSubmit((data) => {
        createCheckout(
          {
            ...data,
            limitPerTransaction: parseInt(String(data.limitPerTransaction)),
          },
          {
            onSuccess: () => {
              onSuccess();
              onClose();
              setStep("info");
              form.reset();
              trackEvent({
                category: "payments",
                action: "create-checkout",
                label: "success",
              });
            },
            onError: (error) => {
              onError(error);
              trackEvent({
                category: "payments",
                action: "create-checkout",
                label: "error",
                error,
              });
            },
          },
        );
      })();
      return;
    }
    setStep((prev) => {
      /*       if (prev === "info" && !isSupportedContract) {
        return "non-tw";
      } */
      if (prev === "info" && isSupportedContract /* || prev === "non-tw" */) {
        return "branding";
      }
      if (prev === "branding") {
        return "delivery";
      }
      if (prev === "delivery") {
        return "advanced";
      }
      return prev;
    });
  };

  const handleClose = () => {
    setStep("info");
    onClose();
    form.reset();
  };

  const handleBack = () => {
    setStep((prev) => {
      /*       if (prev === "non-tw") {
        return "info";
      } */
      if (prev === "branding") {
        return "info";
      }
      if (prev === "delivery") {
        return "branding";
      }
      if (prev === "advanced") {
        return "delivery";
      }
      return prev;
    });
  };

  return (
    <FormProvider {...form}>
      <Button onClick={onOpen} colorScheme="primary">
        New Checkout Link
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form">
          <ModalHeader>Create New Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              {formInputs.map((input) => {
                if (input.step !== step) {
                  return null;
                }
                return (
                  <Flex key={input.step} flexDir="column" gap={5}>
                    {input.fields.map((field) => {
                      if (!isErc1155 && field.name === "tokenId") {
                        return null;
                      }
                      return (
                        <FormControl
                          key={field.name}
                          isRequired={field.required}
                        >
                          <Flex
                            flexDir={field.sideField ? "row" : "column"}
                            alignItems={
                              field.sideField ? "center" : "flex-start"
                            }
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
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Select>
                            ) : field.type === "switch" ? (
                              <Switch
                                onChange={(e) => {
                                  form.setValue(
                                    field.name,
                                    field.name.startsWith("hide")
                                      ? !e.target.checked
                                      : e.target.checked,
                                    {
                                      shouldDirty: true,
                                    },
                                  );
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
                      );
                    })}
                  </Flex>
                );
              })}
            </Flex>
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            {step !== "info" && (
              <Button type="button" onClick={handleBack} variant="ghost">
                Back
              </Button>
            )}

            <Button type="button" colorScheme="primary" onClick={handleNext}>
              {step === "advanced" ? "Create" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};
