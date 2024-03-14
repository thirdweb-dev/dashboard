import React from "react";
import { Flex } from "@chakra-ui/react";
import CaseStudyStatic, { CaseStudyStaticProps } from "./CaseStudyStatic";

interface LandingCaseStudyStaticSectionProps {
  studies: CaseStudyStaticProps[];
}

const LandingCaseStudyStaticSection = ({
  studies,
}: LandingCaseStudyStaticSectionProps) => {
  return (
    <Flex
      alignItems="stretch"
      gap="24px"
      overflowX="auto"
      maxW="container.page"
      w="full"
    >
      {studies.map(({ title, description, image }, idx) => (
        <CaseStudyStatic
          key={idx}
          title={title}
          description={description}
          image={image}
        />
      ))}
    </Flex>
  );
};

export default LandingCaseStudyStaticSection;
