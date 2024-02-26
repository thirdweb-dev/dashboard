import {
  Box,
  Flex,
  FormControl,
  Icon,
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
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Card, FormLabel, Heading, Text } from "tw-components";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  CreateTicketInput,
  useCreateTicket,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { FileInput } from "components/shared/FileInput";
import { FiX } from "react-icons/fi";

const productOptions = [
  "Connect",
  "Contracts",
  "Payments",
  "Infrastructure",
  "Account",
  "Billing",
  "Other",
];

export const ContactSupportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<CreateTicketInput>();

  const { fields, append, remove } = useFieldArray({
    name: "files",
    control: form.control,
  });

  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent ticket. Our team will be in touch shortly.",
    "Failed to send ticket. Please try again.",
  );
  const { isLoggedIn } = useLoggedInUser();
  const { mutate: createTicket } = useCreateTicket();

  const { onError: onExceedFileSize } = useTxNotifications(
    "",
    "File size should not exceed 20MB",
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
              createTicket({
                product: data.product,
                markdown: data.markdown,
                ...(data.files && {
                  attachments: data.files?.map((attachment) => attachment.file),
                }),
              });
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
                maxLength={10000}
              />
            </FormControl>
            <FormControl>
              <Flex flexDir="column" gap={2}>
                <FormLabel>Attachments</FormLabel>
                <FileInput
                  setValue={(file) => {
                    if (file.size > 20 * 1024 * 1024) {
                      onExceedFileSize("Please try again with a smaller file.");
                    } else {
                      append({ id: `${file.name}-${Date.now()}`, file });
                    }
                  }}
                  transition="all 200ms ease"
                  _hover={{ shadow: "sm" }}
                  helperText="Attachment"
                  selectOrUpload="Upload"
                  showUploadButton
                  showPreview={false}
                  isDisabled={form.watch("files")?.length === 5}
                />
                <Flex flexDir="column" gap={2}>
                  {(form.watch("files") || []).length > 0 &&
                    fields.map((field, idx) => (
                      <Card
                        key={idx}
                        py={1}
                        borderRadius="md"
                        as={Flex}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text>{field.file.name}</Text>
                        <Icon
                          boxSize={5}
                          cursor="pointer"
                          as={FiX}
                          onClick={() => {
                            remove(idx);
                          }}
                          _hover={{
                            opacity: 0.5,
                          }}
                        />
                      </Card>
                    ))}
                </Flex>
              </Flex>
            </FormControl>
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
};
