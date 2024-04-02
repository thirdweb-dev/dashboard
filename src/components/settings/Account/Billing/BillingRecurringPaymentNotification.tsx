import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import {
  useDisclosure,
  Alert,
  Flex,
  AlertIcon,
  AlertDescription,
  IconButton,
  AlertTitle,
} from "@chakra-ui/react";
import { OnboardingBilling } from "components/onboarding/Billing";
import { OnboardingModal } from "components/onboarding/Modal";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Heading, Text, TrackedLinkButton } from "tw-components";
import { ManageBillingButton } from "./ManageButton";
import { getRecurringPaymentFailureResponse } from "lib/billing";

type BillingRecurringPaymentNotificationProps = {
  onDismiss?: () => void;
  affectedServices?: string[];
  paymentFailureCode: string;
};

export const BillingRecurringPaymentNotification: React.FC<
  BillingRecurringPaymentNotificationProps
> = ({
  onDismiss,
  affectedServices = [],
  paymentFailureCode = "bank_decline",
}) => {
  // TODO: We should find a way to move this deeper into the
  // TODO: ManageBillingButton component and set an optional field to override
  const [paymentMethodSaving, setPaymentMethodSaving] = useState(false);
  const meQuery = useAccount();
  const { data: account } = meQuery;

  const {
    onOpen: onPaymentMethodOpen,
    onClose: onPaymentMethodClose,
    isOpen: isPaymentMethodOpen,
  } = useDisclosure();

  const handlePaymentAdded = () => {
    setPaymentMethodSaving(true);
    onPaymentMethodClose();
  };

  const { title, reason, resolution } = getRecurringPaymentFailureResponse({
    paymentFailureCode,
  });

  return (
    <Alert
      status="warning"
      borderRadius="md"
      as={Flex}
      alignItems="start"
      justifyContent="space-between"
      variant="left-accent"
      bg="backgroundCardHighlight"
    >
      <>
        <OnboardingModal
          isOpen={isPaymentMethodOpen}
          onClose={onPaymentMethodClose}
        >
          <OnboardingBilling
            onSave={handlePaymentAdded}
            onCancel={onPaymentMethodClose}
          />
        </OnboardingModal>
      </>

      <Flex>
        <AlertIcon boxSize={4} mt={1} ml={1} />
        <Flex flexDir="column" pl={1}>
          <AlertTitle>
            <Heading as="span" size="subtitle.sm">
              {title}
            </Heading>
          </AlertTitle>
          <AlertDescription mb={2} as={Flex} direction="column">
            <Text>
              You have an overdue payment{" "}
              {affectedServices.length > 0 &&
                `for the following service 
                ${affectedServices.length > 1 ? "s" : ""}: ${" "}
                ${affectedServices.join(", ")}
                `}
            </Text>
            <Text>
              {reason} {resolution}
            </Text>
            <Flex>
              {account && (
                <ManageBillingButton
                  account={account}
                  loading={paymentMethodSaving}
                  loadingText="Verifying payment method"
                  buttonProps={{ colorScheme: "primary" }}
                  onClick={onPaymentMethodOpen}
                />
              )}
              <TrackedLinkButton
                ml="4"
                variant="outline"
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
