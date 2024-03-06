import {
  AccountPlan,
  AccountStatus,
  useAccount,
  useAccountCredits,
  useApiKeys,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import {
  Flex,
  HStack,
  Icon,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Button, Card, Heading, LinkButton, Text } from "tw-components";
import { ClaimCreditsModal } from "./ClaimCreditsModal";
import { BiGasPump, BiRocket } from "react-icons/bi";
import { StaticImageData } from "next/image";
import { ChakraNextImage } from "components/Image";

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
  onClick?: () => void;
  href?: string;
  canSkip?: true;
  rightImage?: StaticImageData;
};

interface OnboardingStepsProps {
  onlyOptimism?: boolean;
}

export const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  onlyOptimism,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isLoggedIn } = useLoggedInUser();
  const meQuery = useAccount();
  const apiKeysQuery = useApiKeys();
  const router = useRouter();
  const trackEvent = useTrack();
  const { data: credits } = useAccountCredits();
  const {
    isOpen: isClaimCreditsOpen,
    onOpen: onClaimCreditsOpen,
    onClose: onClaimCreditsClose,
  } = useDisclosure();
  const [onboardingPaymentMethod, setOnboardingPaymentMethod] = useLocalStorage(
    `onboardingPaymentMethod-${meQuery?.data?.id}`,
    false,
  );
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


  const canClaimOptimismCredits = useMemo(() => {
    const plan = meQuery?.data?.plan;

    // Condition 1: No credits contain "OP "
    const noOPCredits = credits?.every(
      (credit) => !credit.name.includes("OP "),
    );

    // Condition 2: Plan is Growth and there's no credit containing "OP Growth"
    const isGrowthWithoutOPGrowth =
      plan === AccountPlan.Growth &&
      credits?.some((credit) => !credit.name.includes("OP Growth"));

    // Condition 3: Plan is Pro and there's no credit containing "OP Pro"
    const isProWithoutOPPro =
      plan === AccountPlan.Pro &&
      credits?.some((credit) => !credit.name.includes("OP Pro"));

    return noOPCredits || isGrowthWithoutOPGrowth || isProWithoutOPPro;
  }, [credits, meQuery?.data?.plan]);

  const currentStep = useMemo(() => {
    if (!isLoggedIn) {
      return null;
    }

    if (onlyOptimism) {
      if (!canClaimOptimismCredits) {
        return null;
      }
      return Step.OptimismCredits;
    }
    if (canClaimOptimismCredits) {
      return Step.OptimismCredits;
    } else if (!onboardingKeys && !hasApiKeys) {
      return Step.Keys;
    } else if (!hasValidPayment && !onboardingPaymentMethod) {
      return Step.Payment;
    } else if (!onboardingDocs) {
      return Step.Docs;
    } else {
      return null;
    }
  }, [
    isLoggedIn,
    hasApiKeys,
    hasValidPayment,
    onboardingDocs,
    onboardingKeys,
    onboardingPaymentMethod,
    canClaimOptimismCredits,
    onlyOptimism,
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

    if (step === Step.Payment) {
      setOnboardingPaymentMethod(true);
    }

    trackEvent({
      category: "onboardingChecklist",
      action: isSkip ? "skipped" : "completed",
      data: { step, href },
    });
  };

  const STEPS: StepData[] = useMemo(
    () => [
      {
        key: Step.Keys,
        title: "Create an API Key",
        description:
          "An API key is required to use thirdweb's services through the SDK and CLI.",
        cta: "Create key",
        href: "/dashboard/settings/api-keys",
        canSkip: true,
      },
      {
        key: Step.Payment,
        title: "Add Payment Method",
        description:
          "Add your payment method to ensure no disruption to thirdweb services when you exceed free monthly limits.",
        cta: "Add payment",
        href: "/dashboard/settings/billing",
        canSkip: true,
      },
      {
        key: Step.OptimismCredits,
        title: "You're eligible for free Optimism Superchain credits",
        description: (
          <Flex flexDir="column" gap={4}>
            <Text>
              These credits are valid for use across any OP superchain network
              and can be used to cover gas for any on-chain activity such as:
            </Text>
            <Flex flexDir="column" gap={2}>
              <Flex gap={2} alignItems="center">
                <Icon as={BiRocket} />
                <Text color="bgBlack">Deploying Contracts</Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Icon as={BiGasPump} />
                <Text color="bgBlack">
                  Using paymaster to build gasless apps
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ),
        cta: "Claim Credits",
        onClick: () => {
          onClaimCreditsOpen();
          trackEvent({
            category: "onboardingChecklist",
            action: "clicked",
            data: { step: Step.OptimismCredits },
          });
        },
        learnMore: "https://portal.thirdweb.com",
        rightImage: require("public/assets/dashboard/optimism-credits.png"),
      },
      {
        key: Step.Docs,
        title: "Explore Docs",
        description:
          "Read our documentation to learn what you can build with contracts, payments, wallets, and infrastructure.",
        cta: "Read docs",
        href: "https://portal.thirdweb.com",
        canSkip: true,
      },
    ],
    [onClaimCreditsOpen, trackEvent],
  );

  if (!currentStep) {
    return null;
  }

  const {
    title,
    description,
    cta,
    href,
    learnMore,
    onClick,
    canSkip,
    rightImage,
  } = STEPS.find((s) => s.key === currentStep) as StepData;

  return (
    <Card w="full" as={Flex} p={0} gap={8}>
      <VStack
        gap={2}
        alignItems="flex-start"
        p={6}
        w={rightImage && !isMobile ? "70%" : "100%"}
      >
        <Heading size="title.sm">{title}</Heading>
        <Flex>{description}</Flex>
        <HStack mt={4} alignItems="center">
          <Button
            size="sm"
            colorScheme="primary"
            onClick={() => handleStep({ step: currentStep, href, onClick })}
          >
            {cta}
          </Button>
          {learnMore && (
            <LinkButton isExternal href={learnMore} size="sm" variant="outline">
              Learn more
            </LinkButton>
          )}
          {canSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStep({ isSkip: true, step: currentStep })}
            >
              Skip
            </Button>
          )}
        </HStack>
      </VStack>
      {rightImage && !isMobile && <ChakraNextImage src={rightImage} alt={""} />}
      <ClaimCreditsModal
        isOpen={isClaimCreditsOpen}
        onClose={onClaimCreditsClose}
      />
    </Card>
  );
};
