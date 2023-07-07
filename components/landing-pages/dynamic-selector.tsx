import { LandingSectionHeading } from "./section-heading";
import { LandingSectionHeadingProps } from "./types";
import { Flex } from "@chakra-ui/react";

interface LandingDynamicSelectorProps extends LandingSectionHeadingProps {}

export const LandingDynamicSelector: React.FC<LandingDynamicSelectorProps> = ({
  title,
  blackToWhiteTitle,
}) => {
  return (
    <Flex>
      <LandingSectionHeading
        title={title}
        blackToWhiteTitle={blackToWhiteTitle}
      />
    </Flex>
  );
};
