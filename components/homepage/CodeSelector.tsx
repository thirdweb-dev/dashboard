import { Center, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import { StaticImageData } from "next/image";
import JavaScript from "public/assets/languages/javascript.png";
import Python from "public/assets/languages/python.png";
import React from "public/assets/languages/react.png";
import { Dispatch, SetStateAction, useState } from "react";
import { flushSync } from "react-dom";
import { Button, ButtonProps, LinkButton } from "tw-components";

export type CodeOptions = "typescript" | "react" | "python";

interface CodeOptionButtonProps extends ButtonProps {
  logo: StaticImageData;
  language: CodeOptions;
  activeLanguage: CodeOptions;
  setActiveLanguage: Dispatch<SetStateAction<CodeOptions>>;
}
const CodeOptionButton: React.FC<CodeOptionButtonProps> = ({
  children,
  logo,
  language,
  setActiveLanguage,
  activeLanguage,
  ...rest
}) => {
  const { trackEvent } = useTrack();
  return (
    <Button
      borderRadius="md"
      border="2px solid"
      borderColor={language === activeLanguage ? "primary.600" : "borderColor"}
      _hover={{ borderColor: "primary.600" }}
      _active={{
        borderColor:
          language === activeLanguage ? "primary.600" : "borderColor",
      }}
      onClick={() => {
        trackEvent({
          category: "code-selector",
          action: "switch-language",
          label: language,
        });
        flushSync(() => {
          setActiveLanguage(language);
        });
      }}
      {...rest}
    >
      <ChakraNextImage src={logo} alt="" w={6} mr={2} />
      {children}
    </Button>
  );
};

export const CodeSelector: React.FC = () => {
  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>("typescript");
  const { trackEvent } = useTrack();

  return (
    <>
      <Flex gap={3} flexDirection={{ base: "column", md: "row" }}>
        <CodeOptionButton
          setActiveLanguage={setActiveLanguage}
          activeLanguage={activeLanguage}
          language="typescript"
          logo={JavaScript}
        >
          JavaScript
        </CodeOptionButton>
        <CodeOptionButton
          setActiveLanguage={setActiveLanguage}
          activeLanguage={activeLanguage}
          language="python"
          logo={Python}
        >
          Python
        </CodeOptionButton>
        <CodeOptionButton
          setActiveLanguage={setActiveLanguage}
          activeLanguage={activeLanguage}
          language="react"
          logo={React}
        >
          React
        </CodeOptionButton>
      </Flex>
      <Center
        maxW="100%"
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor="#4953AF"
      >
        <iframe
          frameBorder="0"
          width="1200px"
          height="800px"
          sandbox="allow-scripts allow-same-origin"
          src={`https://replit.com/@thirdweb-dev/${activeLanguage}-sdk?lite=true`}
        />
      </Center>

      <LinkButton
        bg="white"
        color="#000"
        borderRadius="md"
        maxW={{ lg: "1000px" }}
        href={`https://portal.thirdweb.com/${activeLanguage}`}
        isExternal
        onClick={() =>
          trackEvent({
            category: "code-selector",
            action: "click-documentation",
            label: activeLanguage,
          })
        }
      >
        See documentation
      </LinkButton>
    </>
  );
};
