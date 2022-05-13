import { Center, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import JavaScript from "public/assets/languages/javascript.png";
import Python from "public/assets/languages/python.png";
import React from "public/assets/languages/react.png";
import { Dispatch, SetStateAction, useState } from "react";
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
}) => (
  <Button
    borderRadius="md"
    border="2px solid"
    borderColor={language === activeLanguage ? "primary.600" : "borderColor"}
    _hover={{ borderColor: "primary.600" }}
    _active={{
      borderColor: language === activeLanguage ? "primary.600" : "borderColor",
    }}
    onClick={() => setActiveLanguage(language)}
    {...rest}
  >
    <ChakraNextImage src={logo} alt="" w={6} mr={2} />
    {children}
  </Button>
);

export const CodeSelector: React.FC = () => {
  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>("typescript");

  return (
    <>
      <Flex gap={3}>
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
          logo={Python}
          language="python"
        >
          Python
        </CodeOptionButton>
        <CodeOptionButton
          setActiveLanguage={setActiveLanguage}
          activeLanguage={activeLanguage}
          logo={React}
          language="react"
        >
          React
        </CodeOptionButton>
      </Flex>
      <Center
        maxW={{ base: "100%", lg: "1000px" }}
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor="#4953AF"
      >
        <iframe
          frameBorder="0"
          width="1000px"
          height="600px"
          src={`https://replit.com/@thirdweb-dev/${activeLanguage}-sdk?lite=true`}
        />
      </Center>

      <LinkButton
        bg="white"
        color="#000"
        borderRadius="md"
        w="full"
        maxW={{ lg: "800px" }}
        href={`https://portal.thirdweb.com/${activeLanguage}`}
        isExternal
      >
        See documentation
      </LinkButton>
    </>
  );
};
