import { Flex } from "@chakra-ui/react";
import { LandingFAQ } from "components/landing-pages/faq";
import React from "react";
import { Heading, Text } from "tw-components";

interface HowSectionProps {
  TRACKING_CATEGORY: string;
}

const faqs = [
  {
    title: "How do I get started?",
    description: (
      <Text>
        thirdweb Starter plan is open and completely self-serve. We&apos;ve made
        it easy for you to get started — simply connect your wallet to start
        using thirdweb platform. You only need to create an account with your
        email address and add payment method when you&apos;re approaching your
        monthly free usage limits (so that we can send you billing updates if
        you go over).
      </Text>
    ),
  },
  {
    title: "How do I sign up for thirdweb pro plan?",
    description: (
      <Text>
        To sign for a thirdweb pro plan, team to learn about thirdweb pro
        features and get a quote for monthly subscription fee.
      </Text>
    ),
  },
  {
    title: "How do I update my payment method?",
    description: <Text>Go to thirdweb Settings &gt; Billing in </Text>,
  },
  {
    title: "Where can I see my usage history?",
    description: <Text>Go to thirdweb Settings &gt; Billing in </Text>,
  },
];

const HowSection = ({ TRACKING_CATEGORY }: HowSectionProps) => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Heading textAlign="center" size="title.2xl">
        But how?
      </Heading>
      <Text mt={6} maxW="490px" textAlign="center">
        Web3 enables developers to build internet products with public backends.
        This unlocks some powerful new digital experiences:
      </Text>

      <LandingFAQ
        hideMarginTop
        TRACKING_CATEGORY={TRACKING_CATEGORY}
        title=""
        faqs={faqs}
        titleSize="title.2xl"
      />
    </Flex>
  );
};

export default HowSection;
