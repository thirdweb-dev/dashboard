import React, { Fragment } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useTrack } from "hooks/analytics/useTrack";
import Link from "next/link";
import { Heading, Text } from "tw-components";
import { LandingFAQ } from "components/landing-pages/faq";

const FAQ = ({ TRACKING_CATEGORY }: { TRACKING_CATEGORY: string }) => {
  return (
    <Container maxW={"container.page"} as={Flex} justifyContent="center">
      <LandingFAQ
        hideMarginTop
        TRACKING_CATEGORY={TRACKING_CATEGORY}
        title={"123"}
        faqs={[{ title: "123", description: "123" }]}
      />
    </Container>
  );
};

export default FAQ;
