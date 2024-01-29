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
import { CreateConversationRequest } from "pages/api/create-ticket";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Heading } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const productOptions = [
  "Wallets",
  "Contracts",
  "Payments",
  "Infrastructure",
  "Account",
  "Billing",
  "Other",
];

export const ContactSupportModal = () => {
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
          <ModalHeader>
            <Heading size="title.md" mt={2}>
              Get in touch with us
            </Heading>
          </ModalHeader>
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
                rows={7}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter as={Flex} gap={3}>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            {account?.id ? (
              <Button type="submit" colorScheme="primary">
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
};
