import { TrackedLinkButton } from "tw-components";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  Account,
  AccountStatus,
  useCreateBillingSession,
} from "@3rdweb-sdk/react/hooks/useApi";

interface ManageBillingButtonProps {
  account: Account;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  buttonProps?: {
    variant?: "outline" | "solid";
    colorScheme?: "primary";
  };
}

export const ManageBillingButton: React.FC<ManageBillingButtonProps> = ({
  account,
  loading,
  loadingText,
  buttonProps = { variant: "outline", color: loading ? "gray" : "blue.500" },
  onClick,
}) => {
  const [sessionUrl, setSessionUrl] = useState(account.stripePaymentActionUrl);
  const mutation = useCreateBillingSession();

  const [buttonLabel, buttonText] = useMemo(() => {
    switch (account.status) {
      case AccountStatus.InvalidPayment:
      case AccountStatus.ValidPayment: {
        return ["manage", "Manage billing"];
      }
      case AccountStatus.PaymentVerification: {
        return ["verifyPaymentMethod", "Verify your payment method →"];
      }
      case AccountStatus.InvalidPaymentMethod: {
        return ["addAnotherPayment", "Add another payment method →"];
      }
      default: {
        return ["addPayment", "Add payment method"];
      }
    }
  }, [account.status]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      e.preventDefault();
      return;
    }

    if (!["verifyPaymentMethod", "manage"].includes(buttonLabel)) {
      e.preventDefault();
      onClick?.();
    }
  };

  useEffect(() => {
    if (buttonLabel === "manage" && !sessionUrl) {
      mutation.mutate(undefined, {
        onSuccess: (data) => {
          setSessionUrl(data.url);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonLabel]);

  return (
    <TrackedLinkButton
      {...buttonProps}
      isDisabled={loading || (!onClick && !sessionUrl)}
      href={sessionUrl ?? ""}
      isLoading={loading}
      category="billingAccount"
      label={buttonLabel}
      loadingText={loadingText}
      onClick={handleClick}
      fontSize="small"
    >
      {buttonText}
    </TrackedLinkButton>
  );
};
