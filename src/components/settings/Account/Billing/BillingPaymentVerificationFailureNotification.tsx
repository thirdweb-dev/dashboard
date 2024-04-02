import {
  Alert,
  Flex,
  AlertIcon,
  AlertDescription,
  IconButton,
  AlertTitle,
} from "@chakra-ui/react";
import { getBillingPaymentMethodVerificationFailureResponse } from "lib/billing";
import { FiX } from "react-icons/fi";
import { Heading, Text, TrackedLinkButton } from "tw-components";

type BillingPaymentVerificationFailureNotificationProps = {
  onDismiss?: () => void;
  paymentFailureCode: string;
};

export const BillingPaymentVerificationFailureNotification: React.FC<
  BillingPaymentVerificationFailureNotificationProps
> = ({ onDismiss, paymentFailureCode = "generic_decline" }) => {
  const { title, reason, resolution } =
    getBillingPaymentMethodVerificationFailureResponse({ paymentFailureCode });

  return (
    <Alert
      status="error"
      borderRadius="md"
      as={Flex}
      alignItems="start"
      justifyContent="space-between"
      variant="left-accent"
      bg="inputBg"
    >
      <Flex>
        <AlertIcon boxSize={4} mt={1} ml={1} />
        <Flex flexDir="column" pl={1}>
          <AlertTitle>
            <Heading as="span" size="subtitle.sm">
              ERROR: {title}
            </Heading>
          </AlertTitle>
          <AlertDescription mb={2} as={Flex} direction="column">
            <Text>
              {reason}. {resolution}.
            </Text>
            <Flex mt="4">
              <TrackedLinkButton
                variant="link"
                href="/support"
                category="billing"
                label="support"
                color="blue.500"
                fontSize="small"
                isExternal
              >
                Contact Support
              </TrackedLinkButton>
            </Flex>
          </AlertDescription>
        </Flex>
      </Flex>

      {onDismiss && (
        <IconButton
          size="xs"
          aria-label="Close announcement"
          icon={<FiX />}
          color="bgBlack"
          variant="ghost"
          opacity={0.6}
          _hover={{ opacity: 1 }}
          onClick={onDismiss}
        />
      )}
    </Alert>
  );
};
