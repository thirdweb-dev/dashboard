import { useCreatePaymentMethod } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Flex,
  Heading,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ManageBillingButton } from "components/settings/Account/Billing/ManageButton";
import { useErrorHandler } from "contexts/error-handler";
import { useTrack } from "hooks/analytics/useTrack";
import { title } from "process";
import { FormEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { Button, Text, TrackedLinkButton } from "tw-components";

interface OnboardingPaymentForm {
  onSave: () => void;
  onCancel: () => void;
}

export const OnboardingPaymentForm: React.FC<OnboardingPaymentForm> = ({
  onSave,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const trackEvent = useTrack();
  const { onError } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const mutation = useCreatePaymentMethod();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setSaving(false);
      return onError(submitError);
    }

    const { error: createError, paymentMethod } =
      await stripe.createPaymentMethod({
        elements,
      });

    if (createError) {
      setSaving(false);
      return onError(submitError);
    }

    trackEvent({
      category: "account",
      action: "addPaymentMethod",
      label: "attempt",
    });

    mutation.mutate(paymentMethod.id, {
      onSuccess: () => {
        onSave();
        setSaving(false);

        trackEvent({
          category: "account",
          action: "addPaymentMethod",
          label: "success",
        });
      },
      onError: (error: any) => {
        const message =
          "message" in error
            ? error.message
            : "Couldn't add a payment method. Try later!";
        onError(message);
        setSaving(false);

        trackEvent({
          category: "account",
          action: "addPaymentMethod",
          label: "error",
          error: message,
        });
      },
    });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Flex flexDir="column" gap={8}>
        <PaymentElement
          onLoaderStart={() => setLoading(false)}
          options={{
            terms: {
              card: "never",
            },
          }}
        />

        {loading ? (
          <Center pb={16}>
            <Spinner size="sm" />
          </Center>
        ) : (
          <Flex flexDir="column" gap={3}>
            <Alert
              status={"info"}
              borderRadius="md"
              as={Flex}
              alignItems="start"
              justifyContent="space-between"
              variant="left-accent"
              bg="inputBg"
            >
              <Flex>
                <AlertIcon boxSize={4} mt={1} ml={1} />
                <Flex flexDir="column" gap={1} pl={1}>
                  <AlertDescription as={Text} fontSize="body.md">
                    A temporary $5 hold will be placed and immediately released
                    on your payment method.
                  </AlertDescription>
                </Flex>
              </Flex>
            </Alert>

            <Button
              w="full"
              size="lg"
              fontSize="md"
              colorScheme="blue"
              type="submit"
              isDisabled={!stripe}
              isLoading={saving}
            >
              Add payment
            </Button>
            <Text size="body.md" variant="subtle" mb="4">
              By giving your card details, thirdweb can charge your card for
              future payments according to their terms.
            </Text>
            <Button
              size="lg"
              fontSize="sm"
              variant="link"
              onClick={onCancel}
              isDisabled={saving}
              colorScheme="blue"
            >
              <Text color="blue.500">I&apos;ll do this later</Text>
            </Button>
          </Flex>
        )}
      </Flex>
    </form>
  );
};
