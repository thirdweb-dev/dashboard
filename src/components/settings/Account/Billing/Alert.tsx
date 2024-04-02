import {
  AccountStatus,
  useAccount,
  useAccountUsage,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  useDisclosure,
  Alert,
  Flex,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
} from "@chakra-ui/react";
import { OnboardingBilling } from "components/onboarding/Billing";
import { OnboardingModal } from "components/onboarding/Modal";
import { FiX } from "react-icons/fi";
import { Text, Heading, TrackedLinkButton } from "tw-components";
import { ManageBillingButton } from "./ManageButton";

type AlertConditionType = {
  shouldShowAlert: boolean;
  key: string;
  title: string;
  description: string;
  status: "error" | "warning";
};

export const BillingAlerts = () => {
  const { isLoggedIn } = useLoggedInUser();
  const usageQuery = useAccountUsage();
  const meQuery = useAccount({ refetchInterval: 1000 });
  const router = useRouter();
  const trackEvent = useTrack();

  const [dismissedAlerts, setDismissedAlerts] = useLocalStorage<{
    [key in string]: number;
  }>("dismissed-billing-alerts", {});

  const handleDismiss = useCallback(
    (key: string) => {
      const currentDismissedAlerts = dismissedAlerts || {};

      const updatedAlerts = {
        ...currentDismissedAlerts,
        [key]: Date.now(),
      };

      setDismissedAlerts(updatedAlerts);

      trackEvent({
        category: "billing",
        action: "dismiss_alert",
        label: key,
      });
    },
    [dismissedAlerts, setDismissedAlerts, trackEvent],
  );

  // Alert shouldShowAlerts based on the possible states of the account
  const alertConditions = useMemo<AlertConditionType[]>(() => {
    const hasUsageData = !!usageQuery.data;
    const { usage, limits, rateLimitedAt } = usageQuery.data || {};

    // Directly compute usage and rate limit shouldShowAlerts within useMemo
    const exceededUsage_50 =
      hasUsageData &&
      usage &&
      limits &&
      (usage.embeddedWallets.countWalletAddresses >=
        limits.embeddedWallets / 2 ||
        usage.storage.sumFileSizeBytes >= limits.storage / 2);

    const exceededUsage_100 =
      hasUsageData &&
      usage &&
      limits &&
      (usage.embeddedWallets.countWalletAddresses >= limits.embeddedWallets ||
        usage.storage.sumFileSizeBytes >= limits.storage);

    // Define alert shouldShowAlerts including the directly computed ones
    return [
      {
        shouldShowAlert:
          meQuery.data?.status === AccountStatus.PaymentVerification,
        key: "verifyPaymentAlert",
        title: "Your payment method requires verification",
        description:
          "Please verify your payment method to continue using our services without interruption.",
        status: "warning",
      },
      {
        shouldShowAlert:
          meQuery.data?.status === AccountStatus.InvalidPaymentMethod,
        key: "invalidPaymentMethodAlert",
        title: "Your payment method is invalid",
        description:
          "Your current payment method is invalid. Please update your payment method to continue using our services.",
        status: "error",
      },
      {
        shouldShowAlert: meQuery.data?.status === AccountStatus.InvalidPayment,
        key: "invalidPaymentAlert",
        title: "Your payment method was declined",
        description:
          "You have an overdue invoice. To continue using our services, please update your payment method.",
        status: "error",
      },
      // Usage and rate limit shouldShowAlerts
      {
        shouldShowAlert: !!(exceededUsage_50 && !exceededUsage_100),
        key: "usage_50_alert",
        title: "You are approaching your free monthly credits",
        description:
          "You are approaching your free monthly credits. Consider monitoring your usage to avoid service interruptions.",
        status: "warning",
      },
      {
        shouldShowAlert: !!exceededUsage_100,
        key: "usage_100_alert",
        title: "You have used all of your free monthly credits",
        description:
          "You have exceeded your free monthly credits limit. Please upgrade your plan to continue using services without interruption.",
        status: "error",
      },
      {
        shouldShowAlert: hasUsageData && !!rateLimitedAt?.rpc,
        key: "rate_rpc_alert",
        title: "You have exceeded your RPC rate limit",
        description:
          "You have exceeded your RPC rate limit. Please consider upgrading your plan to avoid service interruptions.",
        status: "warning",
      },
      {
        shouldShowAlert: hasUsageData && !!rateLimitedAt?.storage,
        key: "rate_storage_alert",
        title: "You have exceeded your Storage Gateway rate limit",
        description:
          "You have exceeded your Storage Gateway rate limit. Please consider upgrading your plan to avoid service interruptions.",
        status: "warning",
      },
    ] satisfies AlertConditionType[];
  }, [meQuery.data, usageQuery.data]);

  if (
    !isLoggedIn ||
    meQuery.isLoading ||
    !meQuery.data ||
    usageQuery.isLoading ||
    !usageQuery.data ||
    router.pathname.includes("/support") ||
    alertConditions.length === 0
  ) {
    return null;
  }

  return (
    <>
      {alertConditions.map((alert, index) => {
        const shouldShowAlert = alert.shouldShowAlert;
        const isDismissed = alert.key in dismissedAlerts;
        const isDismissedMoreThanAWeekAgo =
          (dismissedAlerts?.[alert.key] ?? 0) <
          Date.now() - 1000 * 60 * 60 * 24 * 7;
        if (shouldShowAlert && (!isDismissed || isDismissedMoreThanAWeekAgo)) {
          return (
            <Alert key={index} status={alert.status} mb={4} position="relative">
              <AlertIcon />
              <Flex direction="column">
                <AlertTitle>
                  <Heading as="span" size="subtitle.sm">
                    {alert.title}
                  </Heading>
                </AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Flex>
              <IconButton
                aria-label="Close"
                icon={<FiX />}
                onClick={() => handleDismiss(alert.key)}
                size="sm"
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          );
        }
        return <Fragment key={index} />;
      })}
    </>
  );
};

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
