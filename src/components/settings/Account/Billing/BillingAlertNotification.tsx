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

type BillingAlertNotificationProps = {
  status: "error" | "warning";
  onDismiss?: () => void;
  title: string;
  description?: string;
  showCTAs?: boolean;
  ctaText?: string;
  ctaHref?: string;
  label?: string;
};

export const BillingAlertNotification: React.FC<
  BillingAlertNotificationProps
> = ({
  status,
  onDismiss,
  title,
  description = "To ensure there are no future interruptions to your services, please add your payment method.",
  ctaText = "Add a payment method",
  ctaHref = "/dashboard/settings/billing",
  label = "addPaymentAlert",
  showCTAs = true,
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

  const isBilling = ctaHref === "/dashboard/settings/billing";

  return (
    <Alert
      status={status}
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
            <Text mb={showCTAs ? "4" : "0"}>{description}</Text>
            {showCTAs && (
              <Flex>
                {isBilling && account ? (
                  <ManageBillingButton
                    account={account}
                    loading={paymentMethodSaving}
                    loadingText="Verifying payment method"
                    buttonProps={{ colorScheme: "primary" }}
                    onClick={onPaymentMethodOpen}
                  />
                ) : (
                  <TrackedLinkButton
                    href={ctaHref}
                    category="billing"
                    label={label}
                    fontWeight="medium"
                    colorScheme="blue"
                    size="sm"
                  >
                    {ctaText}
                  </TrackedLinkButton>
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
            )}
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
