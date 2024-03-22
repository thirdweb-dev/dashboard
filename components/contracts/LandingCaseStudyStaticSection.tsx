import React from "react";
import { Flex } from "@chakra-ui/react";
import CaseStudyStatic, { CaseStudyStaticProps } from "./CaseStudyStatic";

interface LandingCaseStudyStaticSectionProps {
  studies: Omit<CaseStudyStaticProps, "TRACKING_CATEGORY">[];
  TRACKING_CATEGORY: string;
}

const LandingCaseStudyStaticSection = ({
  studies,
  TRACKING_CATEGORY,
}: LandingCaseStudyStaticSectionProps) => {
  return (
    <Flex
      alignItems="stretch"
      gap="24px"
      overflowX="auto"
      overflowY="hidden"
      maxW="container.page"
      py={2}
      w="full"
    >
      {studies.map(({ title, description, image, href, label }, idx) => (
        <CaseStudyStatic
          key={idx}
          title={title}
          description={description}
          image={image}
          label={label}
          href={href}
          TRACKING_CATEGORY={TRACKING_CATEGORY}
        />
      ))}
    </Flex>
  );
};

export default LandingCaseStudyStaticSection;
