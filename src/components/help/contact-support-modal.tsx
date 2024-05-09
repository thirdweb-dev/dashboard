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
  useDisclosure,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormLabel, Heading } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  CreateTicketInput,
  useCreateTicket,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import dynamic from "next/dynamic";

const ConnectSupportForm = dynamic(() => import("./contact-forms/connect"), {
  ssr: false,
});
const EngineSupportForm = dynamic(() => import("./contact-forms/engine"), {
  ssr: false,
});

const productOptions: string[] = ["Connect", "Engine"];

export const ContactSupportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateTicketInput>();
  const productLabel = form.watch("product");
  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent support ticket. Our team will be in touch using your account email shortly.",
    "Failed to send ticket. Please try again.",
  );
  const { isLoggedIn } = useLoggedInUser();
  const { mutate: createTicket } = useCreateTicket();

  const FormComponent = () => {
    if (!productLabel) {
      return <></>;
    }
    switch (productLabel) {
      case "Connect":
        return <ConnectSupportForm />;
      case "Engine":
        return <EngineSupportForm />;
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
              <FormControl isRequired>
                <FormLabel>What do you need help with?</FormLabel>
                <Select {...form.register("product", { required: true })}>
                  <option value="">Select a product</option>
                  {productOptions?.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {productLabel && <FormComponent />}
            </ModalBody>
            <ModalFooter as={Flex} gap={3}>
              <Button onClick={onClose} variant="ghost">
                Cancel
              </Button>
              {isLoggedIn ? (
                <Button
                  type="submit"
                  colorScheme="primary"
                  isDisabled={!productLabel}
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
};
