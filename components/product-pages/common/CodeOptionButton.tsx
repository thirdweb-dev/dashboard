import { Icon } from "@chakra-ui/react";
import { SiGo } from "@react-icons/all-files/si/SiGo";
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { SiPython } from "@react-icons/all-files/si/SiPython";
import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiUnity } from "@react-icons/all-files/si/SiUnity";
import { useTrack } from "hooks/analytics/useTrack";
import { Dispatch, SetStateAction } from "react";
import { flushSync } from "react-dom";
import { Button, ButtonProps } from "tw-components";

export const LOGO_OPTIONS = {
  javascript: {
    icon: SiJavascript,
    fill: "yellow",
  },
  react: {
    icon: SiReact,
    fill: "#61dafb",
  },
  python: {
    icon: SiPython,
    fill: "#3e7aac",
  },
  go: {
    icon: SiGo,
    fill: "#50b7e0",
  },
  unity: {
    icon: SiUnity,
    fill: "#ffffff",
  },
} as const;

export type CodeOptions = keyof typeof LOGO_OPTIONS;

interface CodeOptionButtonProps extends ButtonProps {
  language: CodeOptions;
  activeLanguage: CodeOptions;
  setActiveLanguage: Dispatch<SetStateAction<CodeOptions>>;
}
export const CodeOptionButton: React.FC<CodeOptionButtonProps> = ({
  children,
  language,
  setActiveLanguage,
  activeLanguage,
  ...rest
}) => {
  const trackEvent = useTrack();
  const logo = LOGO_OPTIONS[language];

  const isActive = language === activeLanguage;

  return (
    <Button
      leftIcon={<Icon as={logo.icon} fill={logo.fill} />}
      variant="solid"
      fontWeight="normal"
      colorScheme="blackAlpha"
      bg={isActive ? "hsl(243deg 57% 58% / 20%)" : "transparent"}
      minWidth="80px"
      border="none"
      borderRadius={{ base: "4px", md: 0 }}
      fontFamily="mono"
      fontSize={{ base: "12px", md: "14px" }}
      position="relative"
      color="white"
      height="auto"
      px={4}
      py={3}
      _hover={{
        bg: "hsl(243deg 57% 58% / 20%)",
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
      {children}
    </Button>
  );
};
