import {
  AccountStatus,
  useAccount,
  useAccountCredits,
  useApiKeys,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Button, Card, Heading, Link, LinkButton, Text } from "tw-components";

enum Step {
  Keys = "keys",
  Docs = "docs",
  OptimismCredits = "optimismCredits",
  Payment = "payment",
}

type StepData = {
  key: Step;
  title: string;
  description: string | JSX.Element;
  cta: string;
  learnMore?: string;
  href?: string;
};

const STEPS: StepData[] = [
  {
    key: Step.Keys,
    title: "Create an API Key",
    description:
      "An API key is required to use thirdweb's services through the SDK and CLI.",
    cta: "Create key",
    href: "/dashboard/settings/api-keys",
  },
  {
    key: Step.Payment,
    title: "Add Payment Method",
    description:
      "Add your payment method to ensure no disruption to thirdweb services when you exceed free monthly limits.",
    cta: "Add payment",
    href: "/dashboard/settings/billing",
  },
  {
    key: Step.OptimismCredits,
    title: "You're eligible for free Optimism Superchain credits.",
    description: (
      <Flex flexDir="column" gap={4}>
        <Text>
          These credits are valid for use across any OP superchain network and
          can be used to cover gas for any on-chain activity such as:
        </Text>
        <Flex flexDir="column" gap={2}>
          <Text color="bgBlack">Deploying Contracts</Text>
          <Text color="bgBlack">Using paymaster to build gasless apps</Text>
        </Flex>
      </Flex>
    ),
    cta: "Claim Credits",
    learnMore: "https://portal.thirdweb.com",
  },
  {
    key: Step.Docs,
    title: "Explore Docs",
    description:
      "Read our documentation to learn what you can build with contracts, payments, wallets, and infrastructure.",
    cta: "Read docs",
    href: "https://portal.thirdweb.com",
  },
];

export const OnboardingSteps: React.FC = () => {
  const { isLoggedIn } = useLoggedInUser();
  const meQuery = useAccount();
  const apiKeysQuery = useApiKeys();
  const router = useRouter();
  const trackEvent = useTrack();

  const { data: credits } = useAccountCredits();

  const [onboardingKeys, setOnboardingKeys] = useLocalStorage(
    `onboardingKeys-${meQuery?.data?.id}`,
    false,
  );

  const [onboardingDocs, setOnboardingDocs] = useLocalStorage(
    `onboardingDocs-${meQuery?.data?.id}`,
    false,
  );

  const hasValidPayment = useMemo(() => {
    return meQuery?.data?.status === AccountStatus.ValidPayment;
  }, [meQuery?.data?.status]);

  const hasApiKeys = useMemo(() => {
    return apiKeysQuery?.data && apiKeysQuery?.data?.length > 0;
  }, [apiKeysQuery?.data]);

  const hasOptimismCredits = useMemo(() => {
    return credits?.some((credit) => credit.name === "optimismCredits");
  }, [credits]);

  console.log({ hasValidPayment, hasApiKeys, hasOptimismCredits });

  const currentStep = useMemo(() => {
    if (!isLoggedIn) {
      return null;
    }
    if (!onboardingKeys && !hasApiKeys) {
      return Step.Keys;
    } else if (!hasValidPayment) {
      return Step.Payment;
    } else if (!hasOptimismCredits) {
      return Step.OptimismCredits;
    } else if (!onboardingDocs) {
      return Step.Docs;
    } else {
      return null;
    }
  }, [
    isLoggedIn,
    hasApiKeys,
    hasValidPayment,
    hasOptimismCredits,
    onboardingDocs,
    onboardingKeys,
  ]);

  const handleStep = ({
    isSkip,
    step,
    href,
    onClick,
  }: {
    isSkip?: true;
    step: Step;
    href?: string;
    onClick?: () => void;
  }) => {
    if (!step) {
      return;
    }

    if (!isSkip && href) {
      if (!href.startsWith("http")) {
        router.push(href);
      } else {
        window.open(href, "_blank");
      }
    }

    if (!isSkip && onClick) {
      onClick();
    }

    if (step === Step.Keys) {
      setOnboardingKeys(true);
    }

    if (step === Step.Docs) {
      setOnboardingDocs(true);
    }

    trackEvent({
      category: "onboardingChecklist",
      action: isSkip ? "skipped" : "completed",
      data: { step, href },
    });
  };

  if (!currentStep) {
    return null;
  }

  const { title, description, cta, href, learnMore } = STEPS.find(
    (s) => s.key === currentStep,
  ) as StepData;

  return (
    <Card w="full" p={6}>
      <VStack gap={2} alignItems="flex-start">
        <Heading size="title.sm">{title}</Heading>
        <Flex>{description}</Flex>
        <HStack mt={4} alignItems="center">
          <Button
            size="sm"
            colorScheme="primary"
            onClick={() => handleStep({ step: currentStep, href })}
          >
            {cta}
          </Button>
          {learnMore && (
            <LinkButton isExternal href={learnMore} size="sm" variant="outline">
              Learn more
            </LinkButton>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStep({ isSkip: true, step: currentStep })}
          >
            Skip
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};
