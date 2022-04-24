import { Code, CodeProps, useColorModeValue } from "@chakra-ui/react";
import Highlight, { Language, defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/oceanicNext";
import lightTheme from "prism-react-renderer/themes/vsLight";

interface CodeBlockProps extends CodeProps {
  code: string;
  language?: Language;
}

export const CodeBlock: React.VFC<CodeBlockProps> = ({
  code,
  language = "javascript",
  px = 4,
  py = 2,
  w = "full",
  borderRadius = "md",
  ...restCodeProps
}) => {
  const theme = useColorModeValue(lightTheme, darkTheme);
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        // eslint-disable-next-line react/forbid-dom-props
        <Code
          borderRadius={borderRadius}
          py={py}
          px={px}
          w={w}
          {...restCodeProps}
          className={className}
          style={style}
          borderWidth="1px"
          borderColor="borderColor"
        >
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Code>
      )}
    </Highlight>
  );
};
