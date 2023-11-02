import {
  CreateWebhookInput,
  useEngineCreateWebhook,
  useEngineWebhooksEventTypes,
} from "@3rdweb-sdk/react/hooks/useEngine";
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
  Icon,
  FormControl,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { Button, FormHelperText, FormLabel, Text } from "tw-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  CreateCheckoutInput,
  usePaymentsCreateCheckout,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { useState } from "react";

interface CreateCheckoutButtonProps {
  contractId: string;
  contractAddress: string;
}

export const CreateCheckoutButton: React.FC<CreateCheckoutButtonProps> = ({
  contractId,
  contractAddress,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: createCheckout } = usePaymentsCreateCheckout(contractAddress);
  const trackEvent = useTrack();
  const form = useForm<CreateCheckoutInput>({
    defaultValues: {
      contractId,
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "Checkout created successfully.",
    "Failed to create checkout.",
  );

  return (
    <>
      <Flex onClick={onOpen} alignItems="center" gap={2}>
        <Icon as={AiOutlinePlusCircle} boxSize={6} color="primary.500" />
        <Text color="primary.500" cursor="pointer" fontWeight="bold">
          Create Checkout
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit((data) => {
            trackEvent({
              category: "payments",
              action: "create-checkout",
              label: "attempt",
            });
            createCheckout(data, {
              onSuccess: () => {
                onSuccess();
                onClose();
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
            });
          })}
        >
          <ModalHeader>Create New Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...form.register("title", { required: true })} />
                <FormHelperText>
                  A clear title for this checkout that is shown on the checkout
                  UX, credit card statement, and post-purchase email.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...form.register("description", { required: true })}
                />
                <FormHelperText>
                  A markdown-enabled description shown in the checkout.
                </FormHelperText>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" colorScheme="primary">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
