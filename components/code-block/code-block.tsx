import { Code, CodeProps } from "@chakra-ui/react";
import Highlight, { Language, defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

interface CodeBlockProps extends CodeProps {
  code: string;
  language?: Language;
}

export const CodeBlock: React.VFC<CodeBlockProps> = ({
  code,
  language = "javascript",
  ...restCodeProps
}) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        // eslint-disable-next-line react/forbid-dom-props
        <Code {...restCodeProps} className={className} style={style}>
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
