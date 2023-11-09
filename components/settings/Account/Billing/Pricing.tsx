import { SimpleGrid, useColorMode } from "@chakra-ui/react";
import { Account, AccountPlan } from "@3rdweb-sdk/react/hooks/useApi";
import { PricingCard } from "components/homepage/sections/PricingCard";
import { PLANS } from "utils/pricing";
import { useMemo } from "react";

interface BillingPricingProps {
  account: Account;
  onSelect: (plan: AccountPlan) => void;
  validPayment: boolean;
  loading: boolean;
}

export const BillingPricing: React.FC<BillingPricingProps> = ({
  account,
  onSelect,
  validPayment,
  loading,
}) => {
  const { colorMode } = useColorMode();
  const isPro = [AccountPlan.Pro, AccountPlan.Enterprise].includes(
    account.plan,
  );

  const freeCtaTitle = useMemo(() => {
    if (account.plan !== AccountPlan.Free) {
      return "Downgrade";
    }
  }, [account]);

  const growthCtaTitle = useMemo(() => {
    // pro/enterprise cant change plan
    if (isPro) {
      return "Contact Sales";
    }

    if (account.plan === AccountPlan.Free) {
      // already had trial
      if (account.trialPeriodEndedAt) {
        return "Upgrade";
      } else {
        // never been on paid plan with trial
        return `Start a ${PLANS.growth.trialPeriodDays} day Free Trial`;
      }
    }
  }, [account, isPro]);

  const handleSelect = (plan: AccountPlan) => {
    if (!validPayment) {
      return;
    }
    onSelect(plan);
  };

  return (
    <SimpleGrid columns={{ base: 1, xl: 3 }} gap={{ base: 6, xl: 8 }}>
      <PricingCard
        current={account.plan === AccountPlan.Free}
        size="sm"
        name={AccountPlan.Free}
        ctaTitle={freeCtaTitle}
        ctaProps={{
          onClick: (e) => {
            e.preventDefault();
            handleSelect(AccountPlan.Free);
          },
          isLoading: loading,
          isDisabled: !validPayment,
          category: "account",
          label: "freePlan",
          href: "/",
        }}
      />

      <PricingCard
        current={account.plan === AccountPlan.Growth}
        size="sm"
        name={AccountPlan.Growth}
        ctaTitle={growthCtaTitle}
        ctaProps={{
          onClick: (e) => {
            e.preventDefault();
            handleSelect(AccountPlan.Growth);
          },
          isLoading: loading,
          isDisabled: !validPayment,
          category: "account",
          label: "growthPlan",
          href: "/",
          ...(colorMode === "dark"
            ? {
                bgColor: "white",
                color: "black",
                _hover: {
                  bgColor: "white",
                  opacity: 0.8,
                },
              }
            : {
                bgColor: "black",
                color: "white",
                _hover: {
                  bgColor: "black",
                  opacity: 0.8,
                },
              }),
        }}
      />

      <PricingCard
        current={isPro}
        size="sm"
        name={AccountPlan.Pro}
        ctaTitle={!isPro ? "Contact Sales" : undefined}
        ctaProps={{
          isExternal: true,
          category: "account",
          label: "growthPlan",
          href: "/contact-us",
        }}
      />
    </SimpleGrid>
  );
};
