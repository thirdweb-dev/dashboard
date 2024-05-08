import {
  Box,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Heading } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  CreateTicketInput,
  useCreateTicket,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";

const defaultDescription =
  "Please describe the issue you're encountering in detail, including steps that led to the error, any error messages, troubleshooting steps you've already taken, and the product(s), dashboard, or SDKs involved.";

type ProductOption = {
  label: string;
  problemAreas: Array<{
    label: string;
    affectedAreas: Array<{ label: string; customDescriptionPrompt?: string }>;
  }>;
};

const productOptions: ProductOption[] = [
  {
    label: "Connect",
    problemAreas: [
      {
        label: "Embedded wallet login issues",
        affectedAreas: [
          { label: "Dashboard", customDescriptionPrompt: defaultDescription },
          { label: "Application", customDescriptionPrompt: defaultDescription },
        ],
      },
      {
        label: "Embedded wallet transaction issues",
        affectedAreas: [],
      },
      {
        label: "Embedded wallet custom Auth",
        affectedAreas: [],
      },
      {
        label: "Account Abstraction",
        affectedAreas: [],
      },
      {
        label: "React SDK",
        affectedAreas: [],
      },
      {
        label: "TypeScript SDK",
        affectedAreas: [],
      },
    ],
  },
  {
    label: "Contracts",
    problemAreas: [],
  },
  {
    label: "Payments",
    problemAreas: [],
  },
  {
    label: "Infrastructure",
    problemAreas: [],
  },
  {
    label: "Account",
    problemAreas: [],
  },
  {
    label: "Billing",
    problemAreas: [],
  },
  {
    label: "Others",
    problemAreas: [],
  },
];

export default function ContactSupportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateTicketInput>();
  const selectedProductLabel = form.watch("product");
  const problemArea = form.watch("problemArea");
  const affectedArea = form.watch("affectedArea");
  const selectedProduct =
    productOptions.find((o) => o.label === selectedProductLabel) || null;
  const affectedAreas =
    selectedProduct?.problemAreas.find((o) => o.label === problemArea)
      ?.affectedAreas || [];
  const customDescription =
    affectedAreas?.find((o) => o.label === affectedArea)
      ?.customDescriptionPrompt || defaultDescription;
  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent support ticket. Our team will be in touch using your account email shortly.",
    "Failed to send ticket. Please try again.",
  );
  const { isLoggedIn } = useLoggedInUser();
  const { mutate: createTicket } = useCreateTicket();

  const DescriptionForm = ({ placeholder }: { placeholder: string }) => (
    <FormControl isRequired>
      <FormLabel>Description</FormLabel>
      <Textarea
        autoComplete="off"
        {...form.register("markdown", { required: true })}
        rows={7}
        maxLength={10000}
        placeholder={placeholder}
      />
    </FormControl>
  );
  return (
    <>
      <Box
        position={{ base: "fixed", md: "relative" }}
        bottom={{ base: 4, md: "auto" }}
        right={{ base: 4, md: "auto" }}
        zIndex={{ base: "popover", md: "auto" }}
      >
        <Button onClick={onOpen} colorScheme="primary">
          Submit a ticket
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit((data) => {
            try {
              createTicket(data);
              onClose();
              onSuccess();
              form.reset();
            } catch (err) {
              console.error(err);
              onError(err);
            }
          })}
        >
          <ModalHeader>
            <Heading size="title.md" mt={2}>
              Get in touch with us
            </Heading>
          </ModalHeader>
          <ModalBody p={6} as={Flex} gap={4} flexDir="column">
            <FormControl>
              <FormLabel>What do you need help with?</FormLabel>
              <Select {...form.register("product", { required: true })}>
                <option value="">Select a product</option>
                {productOptions?.map((product) => (
                  <option key={product.label} value={product.label}>
                    {product.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedProduct && selectedProduct.problemAreas?.length > 0 && (
              <>
                <FormControl isRequired>
                  <FormLabel>Problem area</FormLabel>
                  <Select {...form.register("problemArea", { required: true })}>
                    <option value="">Select a problem area</option>
                    {selectedProduct.problemAreas.map((problemArea) => (
                      <option key={problemArea.label} value={problemArea.label}>
                        {problemArea.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {problemArea && (
                  <>
                    {affectedAreas.length > 0 ? (
                      <>
                        <FormControl isRequired>
                          <FormLabel>Affected area</FormLabel>
                          <Select
                            {...form.register("affectedArea", {
                              required: true,
                            })}
                          >
                            <option value="">Specify the affected area</option>
                            {affectedAreas.map((affectedArea) => (
                              <option
                                key={affectedArea.label}
                                value={affectedArea.label}
                              >
                                {affectedArea.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        {affectedArea && (
                          <DescriptionForm placeholder={customDescription} />
                        )}
                      </>
                    ) : (
                      <DescriptionForm placeholder={defaultDescription} />
                    )}
                  </>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter as={Flex} gap={3}>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            {isLoggedIn ? (
              <Button
                type="submit"
                colorScheme="primary"
                isDisabled={form.watch("markdown")?.length === 0}
              >
                Submit
              </Button>
            ) : (
              <ConnectWallet />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
