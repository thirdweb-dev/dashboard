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
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Text, FormErrorMessage } from "tw-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  CreateWebhookInput,
  usePaymentsCreateWebhook,
} from "@3rdweb-sdk/react/hooks/usePayments";

export interface PaymentsWebhooksModalProps {
  accountId: string;
  isMainnet: boolean;
  disabled: boolean;
}

const isValidUrl = (value: string) => {
  return /^https:\/\/[^\s$.?#].[^\s]*$/gm.test(value);
};

export const PaymentsWebhooksCreateButton: React.FC<
  PaymentsWebhooksModalProps
> = ({ isMainnet, accountId, disabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: createWebhook } = usePaymentsCreateWebhook(accountId);
  const trackEvent = useTrack();

  const form = useForm<CreateWebhookInput>({
    defaultValues: {
      isProduction: isMainnet,
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "Webhook created successfully.",
    "Failed to create webhook.",
  );

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        size="sm"
        leftIcon={<Icon as={AiOutlinePlusCircle} boxSize={6} />}
        colorScheme="primary"
        w="fit-content"
        disabled={disabled}
      >
        Create webhook
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit((data) => {
            trackEvent({
              category: "payments",
              action: "create-webhook",
              label: "attempt",
              accountId,
            });
            createWebhook(data, {
              onSuccess: () => {
                onSuccess();
                onClose();
                form.reset();
                trackEvent({
                  category: "payments",
                  action: "create-webhook",
                  label: "success",
                  accountId,
                });
              },
              onError: (error) => {
                onError(error);
                trackEvent({
                  category: "payments",
                  action: "create-webhook",
                  label: "error",
                  accountId,
                  error,
                });
              },
            });
          })}
        >
          <ModalHeader>Create Webhook</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <FormControl isRequired>
                <FormControl>
                  <FormLabel>Environment</FormLabel>
                  <Text>{isMainnet ? "Mainnet" : "Testnet"}</Text>
                </FormControl>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!form.getFieldState("url", form.formState).error}
              >
                <FormLabel>URL</FormLabel>
                <Input
                  type="url"
                  placeholder="Webhook URL"
                  {...form.register("url", {
                    required: "URL is required",
                    validate: {
                      validUrl: (value) =>
                        isValidUrl(value) ||
                        `Invalid URL, make sure you include https://`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {form.formState.errors?.url?.message}
                </FormErrorMessage>
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
