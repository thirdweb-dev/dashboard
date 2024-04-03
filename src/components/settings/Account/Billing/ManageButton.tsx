import { TrackedLinkButton } from "tw-components";
import { MouseEvent, useEffect, useState } from "react";
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
  const [sessionUrl, setSessionUrl] = useState<string | undefined>();
  const mutation = useCreateBillingSession();

  let [buttonLabel, buttonText]: string[] = ["", ""];
  switch (account.status) {
    case AccountStatus.InvalidPayment:
    case AccountStatus.ValidPayment: {
      buttonLabel = "manage";
      buttonText = "Manage billing";
      break;
    }
    case AccountStatus.PaymentVerification: {
      buttonLabel = "verifyPaymentMethod";
      buttonText = "Verify your payment method →";
      setSessionUrl(account.stripePaymentActionUrl ?? "");
      break;
    }
    case AccountStatus.InvalidPaymentMethod: {
      buttonLabel = "addAnotherPayment";
      buttonText = "Add another payment method →";
      break;
    }
    default: {
      buttonLabel = "addPayment";
      buttonText = "Add payment method";
      break;
    }
  }

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
    if (buttonLabel === "manage") {
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
