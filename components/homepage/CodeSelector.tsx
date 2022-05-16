import {
  AspectRatio,
  AspectRatioProps,
  ButtonGroup,
  Center,
  PropsOf,
  Spinner,
  chakra,
} from "@chakra-ui/react";
import useIntersectionObserver from "@react-hook/intersection-observer";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import { StaticImageData } from "next/image";
import JavaScript from "public/assets/languages/javascript.png";
import Python from "public/assets/languages/python.png";
import React from "public/assets/languages/react.png";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button, ButtonProps, LinkButton, Text } from "tw-components";

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
      leftIcon={<ChakraNextImage src={logo} alt="" boxSize={5} />}
      borderRadius="md"
      variant="solid"
      bgColor="white"
      p={6}
      outlineColor={language === activeLanguage ? "primary.600" : undefined}
      _hover={{ outlineColor: "primary.600" }}
      _active={{
        outlineColor: language === activeLanguage ? "primary.600" : undefined,
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
      <Text size="label.lg" color="black">
        {children}
      </Text>
    </Button>
  );
};

export const CodeSelector: React.FC = () => {
  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>("typescript");
  const { trackEvent } = useTrack();
  return (
    <>
      <ButtonGroup
        gap={3}
        size="sm"
        w="100%"
        justifyContent={{ base: "space-between", md: "center" }}
      >
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
      </ButtonGroup>
      <LazyLoadedIframe
        aspectRatioProps={{
          ratio: { base: 9 / 16, md: 16 / 9 },
          w: "full",
          borderRadius: "md",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "#4953AF",
          bg: "#1C2333",
        }}
        frameBorder="0"
        width="1200px"
        height="800px"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        src={`https://replit.com/@thirdweb-dev/${activeLanguage}-sdk?lite=true`}
      />
      <LinkButton
        bg="white"
        color="#000"
        variant="solid"
        borderRadius="md"
        _hover={{
          bg: "whiteAlpha.800",
        }}
        w="full"
        maxW="300px"
        href={`https://portal.thirdweb.com/${activeLanguage}`}
        isExternal
        p={6}
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

const ChakraIframe = chakra("iframe");

type LazyLoadedIframeProps = PropsOf<typeof ChakraIframe> & {
  aspectRatioProps?: AspectRatioProps;
};

export const LazyLoadedIframe: React.FC<LazyLoadedIframeProps> = ({
  aspectRatioProps,
  ...iframeProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const { isIntersecting } = useIntersectionObserver(containerRef);
  if (isIntersecting) {
    lockRef.current = true;
  }
  return (
    <AspectRatio {...aspectRatioProps} ref={containerRef}>
      {lockRef.current ? (
        <ChakraIframe {...iframeProps} />
      ) : (
        <Center>
          <Spinner color="heading" />
        </Center>
      )}
    </AspectRatio>
  );
};
