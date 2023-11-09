import { AccountPlan, useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { TrackedLinkButton } from "tw-components";

export const UpgradeButton = () => {
  const { isLoggedIn } = useLoggedInUser();
  const meQuery = useAccount();

  if (!isLoggedIn || meQuery.isLoading || !meQuery.data) {
    return null;
  }

  const { plan } = meQuery.data;

  return [AccountPlan.Pro, AccountPlan.Enterprise].includes(plan) ? null : (
    <TrackedLinkButton
      category="header"
      label="upgrade"
      href="/dashboard/settings/billing"
      variant="outline"
      colorScheme="blue"
      size="sm"
    >
      Upgrade
    </TrackedLinkButton>
  );
};
