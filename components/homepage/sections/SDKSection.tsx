import { Flex } from "@chakra-ui/react";
import {
  CodeSelector,
  CodeSelectorProps,
} from "components/product-pages/homepage/CodeSelector";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { Heading } from "tw-components";

interface SDKSectionProps {
  title?: string;
  description?: string;
  codeSelectorProps?: CodeSelectorProps;
}

export const SDKSection: React.FC<SDKSectionProps> = ({
  title = "Connect to web3 easily.",
  description = "Powerful SDKs to integrate decentralized technologies into your apps, backends, and games.",
  codeSelectorProps,
}) => {
  return (
    <HomepageSection
      id="sdks"
      bottomPattern
      middleGradient
      gradientOpacity={0.4}
      zIndex={10}
    >
      <Flex flexDir="column" align="center" as="section">
        <Heading
          as="h2"
          size="display.sm"
          textAlign="center"
          mb={4}
          bgGradient="linear(to right, #918DD8, white)"
          bgClip="text"
          fontWeight={700}
        >
          {title}
        </Heading>
        <Heading
          as="h3"
          size="subtitle.lg"
          textAlign="center"
          maxW={"container.md"}
          color="white"
          fontWeight={400}
          fontSize="20px"
          mb={8}
        >
          {description}
        </Heading>
        <CodeSelector {...codeSelectorProps} />
      </Flex>
    </HomepageSection>
  );
};
