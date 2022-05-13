import { Center, Flex, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import JavaScript from "public/assets/languages/javascript.png";
import Python from "public/assets/languages/python.png";
import React from "public/assets/languages/react.png";
import { useState } from "react";
import { Button, ButtonProps, Link } from "tw-components";

export type CodeOptions = "typescript" | "react" | "python";

interface CodeOptionButtonProps extends ButtonProps {
  logo: StaticImageData;
}
const CodeOptionButton: React.FC<CodeOptionButtonProps> = ({
  children,
  logo,
  ...rest
}) => (
  <Button
    borderRadius="md"
    border="2px solid"
    borderColor="borderColor"
    _hover={{ borderColor: "primary.600" }}
    {...rest}
  >
    <ChakraNextImage src={logo} alt="" w={6} mr={2} />
    {children}
  </Button>
);

export const CodeSelector: React.FC = () => {
  const [language, setLanguage] = useState<CodeOptions>("typescript");

  return (
    <>
      <Flex gap={3}>
        <CodeOptionButton
          onClick={() => setLanguage("typescript")}
          logo={JavaScript}
        >
          JavaScript
        </CodeOptionButton>
        <CodeOptionButton onClick={() => setLanguage("python")} logo={Python}>
          Python
        </CodeOptionButton>
        <CodeOptionButton onClick={() => setLanguage("react")} logo={React}>
          React
        </CodeOptionButton>
      </Flex>
      <Center
        maxW={{ base: "100%", lg: "800px" }}
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor="#4953AF"
      >
        <iframe
          frameBorder="0"
          width="800px"
          height="600px"
          src={`https://replit.com/@thirdweb-dev/${language}-sdk?lite=true`}
        />
      </Center>

      {/*       <Link isExternal href={`https://portal.thirdweb.com/${language}`}> */}
      <Button
        bg="white"
        color="#000"
        borderRadius="md"
        w="full"
        maxW={{ lg: "800px" }}
      >
        See documentation
      </Button>
      {/*       </Link> */}
    </>
  );
};
