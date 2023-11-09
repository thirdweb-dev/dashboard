import { SimpleGrid, useColorMode } from "@chakra-ui/react";
import { OnboardingTitle } from "./Title";
import { PricingCard } from "components/homepage/sections/PricingCard";
import { useTrack } from "hooks/analytics/useTrack";
import { AccountPlan, useUpdateAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { PLANS } from "utils/pricing";

interface OnboardingChoosePlanProps {
  onSave: (plan: AccountPlan) => void;
}

export const OnboardingChoosePlan: React.FC<OnboardingChoosePlanProps> = ({
  onSave,
}) => {
  const trackEvent = useTrack();
  const mutation = useUpdateAccount();
  const { colorMode } = useColorMode();

  const handleSave = (plan: AccountPlan) => {
    trackEvent({
      category: "account",
      action: "choosePlan",
      label: "attempt",
    });

    // free is default, so no need to update account
    if (plan === AccountPlan.Free) {
      trackEvent({
        category: "account",
        action: "choosePlan",
        label: "success",
        data: {
          plan,
        },
      });

      onSave(plan);
      return;
    }

    mutation.mutate(
      {
        plan,
      },
      {
        onSuccess: () => {
          onSave(plan);

          trackEvent({
            category: "account",
            action: "choosePlan",
            label: "success",
            data: {
              plan,
            },
          });
        },
        onError: (error) => {
          trackEvent({
            category: "account",
            action: "choosePlan",
            label: "error",
            error,
          });
        },
      },
    );
  };

  return (
    <>
      <OnboardingTitle
        heading="Choose your plan"
        description="Get started for free with our Starter plan or subscribe to Growth plan to unlock higher rate limits and advanced features."
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        <PricingCard
          size="sm"
          name={AccountPlan.Free}
          ctaTitle="Get Started"
          ctaProps={{
            category: "account",
            onClick: (e) => {
              e.preventDefault();
              handleSave(AccountPlan.Free);
            },
            label: "freePlan",
            href: "/",
          }}
        />

        <PricingCard
          size="sm"
          name={AccountPlan.Growth}
          ctaTitle={`Start ${PLANS.growth.trialPeriodDays} day Free Trial`}
          ctaProps={{
            category: "account",
            label: "growthPlan",
            onClick: (e) => {
              e.preventDefault();
              handleSave(AccountPlan.Growth);
            },
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
      </SimpleGrid>
    </>
  );
};
