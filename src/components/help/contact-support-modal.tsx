import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Heading } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  CreateTicketInput,
  useCreateTicket,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import dynamic from "next/dynamic";
import { useState } from "react";

const ConnectSupportForm = dynamic(
  () => import("./contact-forms/ConnectSupportForm"),
  { ssr: false },
);

type ProductOption = {
  label: string;
  problemAreas: string[];
};

const productOptions: ProductOption[] = [
  {
    label: "Connect",
    problemAreas: ["Embedded wallet login issues"],
  },
];

export default function ContactSupportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateTicketInput>();
  const [productLabel, setProductLabel] = useState<string>("");
  const [targetProblemArea, setProblemArea] = useState<string>("");
  const selectedProduct =
    productOptions.find((o) => o.label === productLabel) || null;
  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent support ticket. Our team will be in touch using your account email shortly.",
    "Failed to send ticket. Please try again.",
  );
  const { isLoggedIn } = useLoggedInUser();
  const { mutate: createTicket } = useCreateTicket();

  const FormComponent = () => {
    if (!productLabel || !targetProblemArea) {
      return <></>;
    }
    switch (productLabel) {
      case "Connect":
        return <ConnectSupportForm />;
      default:
        return <></>;
    }
  };
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
        <FormProvider {...form}>
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
              <div>What do you need help with?</div>
              <Select
                onChange={(e) => {
                  const _label = e.target.value;
                  setProductLabel(_label);
                  form.setValue("product", _label);
                }}
              >
                <option value="">Select a product</option>
                {productOptions?.map((product) => (
                  <option key={product.label} value={product.label}>
                    {product.label}
                  </option>
                ))}
              </Select>
              {selectedProduct && selectedProduct.problemAreas?.length > 0 && (
                <>
                  <div>Problem area</div>
                  <Select
                    onChange={(e) => {
                      const _area = e.target.value;
                      setProblemArea(_area);
                      form.setValue("extraInfo.Problem_Area", _area);
                    }}
                  >
                    <option value="">Select a problem area</option>
                    {selectedProduct.problemAreas.map((problemArea) => (
                      <option key={problemArea} value={problemArea}>
                        {problemArea}
                      </option>
                    ))}
                  </Select>
                  {targetProblemArea && <FormComponent />}
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
                  isDisabled={!targetProblemArea || !productLabel}
                >
                  Submit
                </Button>
              ) : (
                <ConnectWallet />
              )}
            </ModalFooter>
          </ModalContent>
        </FormProvider>
      </Modal>
    </>
  );
}
