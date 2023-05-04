/* eslint-disable react/forbid-dom-props */
// import styles from "../styles/Home.module.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/oceanicNext";
import React from "react";

interface Props {
  text: string;
}

export const DemoCodeSnippet: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <Highlight {...defaultProps} code={text} language="jsx" theme={darkTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-key
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
