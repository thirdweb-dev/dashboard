import {
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { CreateConversationRequest } from "pages/api/create-ticket";
import { useForm } from "react-hook-form";
import { Button, FormLabel } from "tw-components";

export const CreateTicketModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateConversationRequest>();

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
            console.log({ data });
            try {
              await fetch("/api/create-ticket", {
                method: "POST",
                body: JSON.stringify({
                  markdown: data.markdown,
                  status: "open",
                }),
              });
            } catch (err) {
              console.error(err);
            }
          })}
        >
          <ModalBody p={6} as={Flex} gap={4} flexDir="column">
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
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
