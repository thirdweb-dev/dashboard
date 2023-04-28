import {
  Box,
  Code,
  CodeProps,
  Flex,
  HStack,
  Icon,
  IconButton,
  useClipboard,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark";
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from "prism-react-renderer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Prism from "prism-react-renderer/prism";
import darkThemeDefault from "prism-react-renderer/themes/vsDark";
import lightThemeDefault from "prism-react-renderer/themes/vsLight";
import { useEffect, useRef, useState } from "react";
import { BsLightning } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { InView } from "react-intersection-observer";
import { Text } from "tw-components";

// add solidity lang support for code
((typeof global !== "undefined" ? global : window) as any).Prism = Prism;
require("prismjs/components/prism-solidity");
// end add solidity support

export interface CodeBlockProps extends Omit<CodeProps, "size"> {
  code: string;
  language: Language | "solidity";
  canCopy?: boolean;
  wrap?: boolean;
  prefix?: string;
  darkTheme?: PrismTheme;
  lightTheme?: PrismTheme;
  autoType?: boolean;
  typingSpeed?: number;
  title?: string;
  containerHeight?: any;
}
export const HomePageCodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  px = 4,
  py = 2,
  w = "full",
  borderRadius = "md",
  borderColor = "borderColor",
  borderWidth = "1px",
  fontFamily = "mono",
  backgroundColor,
  prefix,
  canCopy = true,
  wrap = true,
  darkTheme,
  lightTheme,
  autoType = false,
  typingSpeed = 100,
  title,
  containerHeight,
  ...restCodeProps
}) => {
  const theme = useColorModeValue(
    lightTheme || lightThemeDefault,
    darkTheme || darkThemeDefault,
  );
  const { onCopy, hasCopied, setValue } = useClipboard(code);
  const [, setSpeedUpEnabled] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [currentTypingSpeed, setCurrentTypingSpeed] = useState(typingSpeed);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const chakraTheme = useTheme();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const interval = setInterval(() => {
      if (currentCodeIndex < code.length) {
        setCurrentCodeIndex((prev) => prev + 1);
      }
    }, currentTypingSpeed);

    return () => clearInterval(interval);
  }, [currentCodeIndex, currentTypingSpeed, code, isInView]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentCodeIndex]);

  useEffect(() => {
    if (code) {
      setValue(code);
    }
  }, [code, setValue]);

  return (
    <Flex
      direction="column"
      w="full"
      h={containerHeight}
      border="1px solid #FFFFFF20"
      borderRadius="lg"
    >
      <Flex
        justifyContent={title ? "space-between" : "flex-end"}
        alignItems="center"
        px={2}
        py={2}
        bg="#161b22"
        roundedTop="lg"
      >
        {title && (
          <Text
            fontSize="large"
            position="static"
            bg="black"
            px={4}
            py={1}
            roundedTop="md"
            borderX="1px solid #FFFFFF20"
            borderTop="1px solid #FFFFFF20"
            h="120%"
            mb={-2}
          >
            {title}
          </Text>
        )}
        <HStack>
          {canCopy && code && autoType && (
            <IconButton
              onClick={() => {
                setSpeedUpEnabled((prev) => {
                  setCurrentTypingSpeed(prev ? typingSpeed : 1);
                  return !prev;
                });
              }}
              aria-label="Copy"
              borderRadius="md"
              variant="ghost"
              colorScheme="gray"
              size="sm"
              icon={<Icon as={BsLightning} />}
            />
          )}
          {canCopy && code && (
            <IconButton
              onClick={onCopy}
              aria-label="Copy"
              borderRadius="md"
              variant="ghost"
              colorScheme="gray"
              size="sm"
              icon={
                <Icon
                  as={hasCopied ? IoMdCheckmark : FiCopy}
                  fill={hasCopied ? "green.500" : undefined}
                />
              }
            />
          )}
        </HStack>
      </Flex>
      <InView
        threshold={0.1}
        triggerOnce
        onChange={(inView) => setIsInView(inView)}
      >
        {({ inView, ref }) => (
          <>
            {inView && (
              <Highlight
                {...defaultProps}
                code={
                  prefix
                    ? `${prefix} ${code}`
                    : autoType
                    ? code.slice(0, currentCodeIndex)
                    : code
                }
                language={language as Language}
                theme={{
                  ...theme,
                  plain: {
                    backgroundColor:
                      (backgroundColor as string) ||
                      "var(--chakra-colors-backgroundHighlight)",
                  },
                }}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <Box
                    ref={containerRef}
                    borderRadius={borderRadius}
                    py={py}
                    px={px}
                    w={w}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                    position="relative"
                    className={className}
                    style={style}
                    fontFamily={fontFamily}
                    whiteSpace={wrap ? "pre-wrap" : "pre"}
                    overflowY="auto"
                    {...restCodeProps}
                    as={Code}
                  >
                    <Text>
                      <Box as="span" display="block" my={1} color="heading">
                        {tokens.map((line, i) => (
                          // eslint-disable-next-line react/jsx-key
                          <Box {...getLineProps({ line, key: i })}>
                            <LineNumbers
                              lineNumber={i + 1}
                              lineHeight={chakraTheme.sizes["5"]}
                            />
                            {line.map((token, key) => (
                              // eslint-disable-next-line react/jsx-key
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </Box>
                        ))}
                      </Box>
                    </Text>
                  </Box>
                )}
              </Highlight>
            )}
            <div ref={ref} />
          </>
        )}
      </InView>
    </Flex>
  );
};

interface LineNumbersProps {
  lineNumber: number;
  lineHeight: string | number;
}

const LineNumbers: React.FC<LineNumbersProps> = ({
  lineNumber,
  lineHeight,
}) => (
  <Box
    as="span"
    display="inline-block"
    textAlign="right"
    paddingRight="1em"
    userSelect="none"
    opacity={0.3}
    lineHeight={lineHeight}
    minWidth="1em"
  >
    {lineNumber}
  </Box>
);
