import {
  AccountStatus,
  useAccount,
  useAccountUsage,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { BillingAlertNotification } from "./BillingAlertNotification";

enum DismissedStorageType {
  Usage_50 = "usage_50",
  Usage_100 = "usage_100",
  RateRpc = "rate_rpc",
  RateStorage = "rate_storage",
}

type DismissedStorage = {
  [T in DismissedStorageType]?: number;
};
export const BillingAlert = () => {
  const { isLoggedIn } = useLoggedInUser();
  const usageQuery = useAccountUsage();
  const meQuery = useAccount({
    refetchInterval: (account) =>
      [
        AccountStatus.InvalidPayment,
        AccountStatus.InvalidPaymentMethod,
        AccountStatus.PaymentVerification,
      ].includes(account?.status as AccountStatus)
        ? 1000
        : false,
  });
  const router = useRouter();

  const [dismissedAlert, setDismissedAlert] = useLocalStorage<
    DismissedStorage | undefined
  >(`dismissed-billing-alert-${meQuery?.data?.id}`, undefined, {
    [DismissedStorageType.Usage_50]: 0,
    [DismissedStorageType.Usage_100]: 0,
    [DismissedStorageType.RateRpc]: 0,
    [DismissedStorageType.RateStorage]: 0,
  });

  const trackEvent = useTrack();

  const exceededUsage_50 = useMemo(() => {
    if (!usageQuery?.data) {
      return false;
    }

    const { usage, limits } = usageQuery.data;
    return (
      usage.embeddedWallets.countWalletAddresses >=
        limits.embeddedWallets / 2 ||
      usage.storage.sumFileSizeBytes >= limits.storage / 2
    );
  }, [usageQuery?.data]);

  const exceededUsage_100 = useMemo(() => {
    if (!usageQuery?.data) {
      return false;
    }

    const { usage, limits } = usageQuery.data;
    return (
      usage.embeddedWallets.countWalletAddresses >= limits.embeddedWallets ||
      usage.storage.sumFileSizeBytes >= limits.storage
    );
  }, [usageQuery?.data]);

  const exceededRateRpc = useMemo(() => {
    if (!usageQuery?.data) {
      return false;
    }

    return !!usageQuery.data.rateLimitedAt?.rpc;
  }, [usageQuery?.data]);

  const exceededRateStorage = useMemo(() => {
    if (!usageQuery?.data) {
      return false;
    }

    return !!usageQuery.data.rateLimitedAt?.storage;
  }, [usageQuery?.data]);

  const dismissedForThePeriod = useCallback(
    (type: DismissedStorageType) => {
      if (!meQuery?.data) {
        return true;
      }

      if (!dismissedAlert) {
        return false;
      }

      const startDate = new Date(meQuery.data.currentBillingPeriodStartsAt);

      // backwards compatibility when dismissedAlert stored a single number value
      if (typeof dismissedAlert === "number") {
        return dismissedAlert > Math.floor(startDate.getTime());
      }

      return (dismissedAlert?.[type] || 0) > Math.floor(startDate.getTime());
    },
    [meQuery?.data, dismissedAlert],
  );

  const handleDismiss = (type: DismissedStorageType) => {
    setDismissedAlert({
      ...dismissedAlert,
      [type]: Math.floor(Date.now()),
    });

    trackEvent({
      category: "billing",
      action: "dismiss_limit_alert",
      type,
    });
  };

  if (
    !isLoggedIn ||
    meQuery.isLoading ||
    !meQuery.data ||
    usageQuery.isLoading ||
    !usageQuery.data ||
    router.pathname.includes("support")
  ) {
    return null;
  }

  const { status, stripePaymentActionUrl } = meQuery.data;

  if (status === "paymentVerification") {
    const message = stripePaymentActionUrl?.startsWith(
      "https://payments.stripe.com/microdeposit",
    )
      ? "To verify your bank account, we've deposited $0.01 and it should arrive within 1-2 working days."
      : "Your card requires further verification.";

    return (
      <BillingAlertNotification
        title="Your payment method is not verified"
        description={message}
        status="warning"
        label="verifyPaymentAlert"
        ctaHref={stripePaymentActionUrl}
        ctaText="Verify your payment method"
      />
    );
  }

  if (status === AccountStatus.InvalidPayment) {
    return (
      <BillingAlertNotification
        title="Your payment method was declined"
        description="You have an overdue invoice. To continue using thirdweb services without interruption, please add your payment method."
        status="error"
      />
    );
  }

  if (status === AccountStatus.InvalidPaymentMethod) {
    // Todo: add reason for failure here.
    return (
      <BillingAlertNotification
        title="Your payment method is invalid"
        description="To use thirdweb services without interruption, please add your payment method."
        status="error"
      />
    );
  }

  if (
    status !== AccountStatus.ValidPayment &&
    exceededUsage_50 &&
    !exceededUsage_100 &&
    !dismissedForThePeriod(DismissedStorageType.Usage_50)
  ) {
    return (
      <BillingAlertNotification
        title="You are approaching your free monthly credits"
        status="warning"
        onDismiss={() => handleDismiss(DismissedStorageType.Usage_50)}
      />
    );
  }

  if (
    status !== AccountStatus.ValidPayment &&
    exceededUsage_100 &&
    !dismissedForThePeriod(DismissedStorageType.Usage_100)
  ) {
    return (
      <BillingAlertNotification
        title="You have used all of your free monthly credits"
        status="error"
        onDismiss={() => handleDismiss(DismissedStorageType.Usage_100)}
      />
    );
  }

  if (exceededRateRpc && !dismissedForThePeriod(DismissedStorageType.RateRpc)) {
    return (
      <BillingAlertNotification
        title="You have exceeded your RPC rate limit"
        description={`You have exceeded your RPC rate limit (${usageQuery.data.rateLimits.rpc} requests per second). Please add your payment method and upgrade your plan to continue using thirdweb services without interruption. You can upgrade to thirdweb Growth by visiting your Billing settings.`}
        ctaText="Go to Billing"
        status="warning"
        label="exceededRpcLimitAlert"
        onDismiss={() => handleDismiss(DismissedStorageType.RateRpc)}
      />
    );
  }

  if (
    exceededRateStorage &&
    !dismissedForThePeriod(DismissedStorageType.RateStorage)
  ) {
    return (
      <BillingAlertNotification
        title="You have exceeded your Storage Gateway rate limit"
        description={`You have exceeded your Storage Gateway rate limit (${usageQuery.data.rateLimits.storage} requests per second). Please add your payment method and upgrade your plan to continue using thirdweb services without interruption. You can upgrade to thirdweb Growth by visiting your Billing settings.`}
        ctaText="Go to Billing"
        status="warning"
        label="exceededGatewayLimitAlert"
        onDismiss={() => handleDismiss(DismissedStorageType.RateStorage)}
      />
    );
  }

  return null;
};
