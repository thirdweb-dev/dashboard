import {
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { CreateConversationRequest } from "pages/api/create-ticket";
import { useForm } from "react-hook-form";
import { Button, FormLabel } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { useAddress } from "@thirdweb-dev/react";

const productOptions = [
  "Wallets",
  "Contracts",
  "Payments",
  "Infrastructure",
  "Account",
  "Billing",
  "Other",
];

export const CreateTicketModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateConversationRequest>();
  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent ticket. Our team will be in touch shortly.",
    "Failed to send ticket. Please try again.",
  );
  const { data: account } = useAccount();
  const address = useAddress();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="primary"
        position="fixed"
        bottom={4}
        right={4}
        zIndex="popover"
      >
        Create ticket
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit(async (data) => {
            try {
              await fetch("/api/create-ticket", {
                method: "POST",
                body: JSON.stringify({
                  markdown: data.markdown,
                  status: "open",
                  plan: account && account.plan,
                  email: account && account.email,
                  product: data.product,
                  address,
                }),
              });
              onClose();
              onSuccess();
            } catch (err) {
              console.error(err);
              onError(err);
            }
          })}
        >
          <ModalBody p={6} as={Flex} gap={4} flexDir="column">
            <FormControl>
              <FormLabel>What do you need help with?</FormLabel>
              <Select {...form.register("product", { required: true })}>
                {productOptions?.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                autoComplete="off"
                {...form.register("markdown", { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter as={Flex} gap={3}>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" colorScheme="primary">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
