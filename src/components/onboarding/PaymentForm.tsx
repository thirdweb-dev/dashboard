import { useCreatePaymentMethod } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentVerificationFailureAlert } from "components/settings/Account/Billing/alerts/PaymentVerificationFailureAlert";
import message from "components/settings/ApiKeys/message";
import { useErrorHandler } from "contexts/error-handler";
import { useTrack } from "hooks/analytics/useTrack";
import { FormEvent, useState } from "react";
import { Button, Text } from "tw-components";

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
  const [paymentFailureCode, setPaymentFailureCode] = useState("");

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
      if (submitError.code) {
        return setPaymentFailureCode(submitError.code);
      } else {
        return onError(submitError);
      }
    }

    const { error: createError, paymentMethod } =
      await stripe.createPaymentMethod({
        elements,
      });

    if (createError) {
      setSaving(false);
      return onError(createError);
    }

    trackEvent({
      category: "account",
      action: "addPaymentMethod",
      label: "attempt",
    });

    mutation.mutate(paymentMethod.id, {
      onSuccess: () => {
        onSave();
        setPaymentFailureCode("");
        setSaving(false);

        trackEvent({
          category: "account",
          action: "addPaymentMethod",
          label: "success",
        });
      },
      onError: (error: any) => {
        const failureCode = error?.message;
        setPaymentFailureCode(failureCode || "generic_decline");
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
          options={{ terms: { card: "never" } }}
        />

        {loading ? (
          <Center pb={16}>
            <Spinner size="sm" />
          </Center>
        ) : (
          <Flex flexDir="column" gap={4}>
            {paymentFailureCode ? (
              <PaymentVerificationFailureAlert
                paymentFailureCode={paymentFailureCode}
              />
            ) : (
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
                      A temporary $5 hold will be placed and immediately
                      released on your payment method.
                    </AlertDescription>
                  </Flex>
                </Flex>
              </Alert>
            )}

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
